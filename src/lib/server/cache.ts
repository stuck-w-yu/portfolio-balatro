/**
 * Cache in-memory sederhana untuk sisi server.
 *
 * Strategi:
 * - `cached(key, ttlMs, loader)`: kembalikan nilai bila masih fresh; bila TTL habis,
 *   jalankan `loader` sekali (single-flight) lalu simpan. Single-flight mencegah
 *   "thundering herd" — saat TTL expiry dan banyak request bersamaan, hanya satu
 *   yang benar-benar memukul DB, sisanya menunggu promise yang sama.
 * - `lruGetOrLoad(key, maxEntries, loader)`: LRU berbatas jumlah entri, cocok untuk
 *   buffer besar (mis. gambar) agar memori tidak jebol. Juga single-flight.
 *
 * Catatan serverless (Vercel): cache ini PER-INSTANCE. Cold start = kosong, dan
 * invalidasi hanya berdampak pada instance yang menanganinya. TTL menjadi jaring
 * pengaman konsistensi antar-instance.
 */

interface Entry<T> {
	value: T;
	/** Timestamp (ms) kapan entri dianggap basi. */
	exp: number;
}

const store = new Map<string, Entry<unknown>>();
const inflight = new Map<string, Promise<unknown>>();

/** Ambil dari cache atau hitung via `loader` (single-flight, TTL). */
export async function cached<T>(key: string, ttlMs: number, loader: () => Promise<T>): Promise<T> {
	const hit = store.get(key);
	if (hit && hit.exp > Date.now()) return hit.value as T;

	const pending = inflight.get(key);
	if (pending) return pending as Promise<T>;

	const p = loader()
		.then((value) => {
			store.set(key, { value, exp: Date.now() + ttlMs });
			return value;
		})
		.finally(() => {
			inflight.delete(key);
		});

	inflight.set(key, p);
	return p;
}

/** Hapus satu entri cache. */
export function invalidate(key: string): void {
	store.delete(key);
}

/** Hapus semua entri yang key-nya diawali `prefix`. */
export function invalidatePrefix(prefix: string): void {
	for (const key of store.keys()) {
		if (key.startsWith(prefix)) store.delete(key);
	}
}

/** Kosongkan seluruh cache (utama untuk testing / darurat). */
export function invalidateAll(): void {
	store.clear();
}

/* ----------------------------- LRU (buffer) ----------------------------- */

const lru = new Map<string, unknown>();
const lruInflight = new Map<string, Promise<unknown>>();

/**
 * Ambil dari LRU atau hitung via `loader` (single-flight).
 * Entri paling jarang dipakai dibuang saat melebihi `maxEntries`.
 */
export async function lruGetOrLoad<T>(
	key: string,
	maxEntries: number,
	loader: () => Promise<T>
): Promise<T> {
	if (lru.has(key)) {
		const value = lru.get(key) as T;
		// Pindahkan ke posisi terbaru (paling akhir) agar jadi "recently used".
		lru.delete(key);
		lru.set(key, value);
		return value;
	}

	const pending = lruInflight.get(key);
	if (pending) return pending as Promise<T>;

	const p = loader()
		.then((value) => {
			lru.set(key, value);
			// Eviksi entri tertua (paling awal) bila melewati batas.
			while (lru.size > maxEntries) {
				const oldest = lru.keys().next().value;
				if (oldest === undefined) break;
				lru.delete(oldest);
			}
			return value;
		})
		.finally(() => {
			lruInflight.delete(key);
		});

	lruInflight.set(key, p);
	return p;
}
