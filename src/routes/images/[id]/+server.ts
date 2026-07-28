import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db, schema } from '$lib/server/db/index.js';
import { downloadFromDrive } from '$lib/server/drive/index.js';
import { cached, lruGetOrLoad } from '$lib/server/cache.js';

/** Metadata gambar bersifat immutable (driveFileId tetap) → aman di-cache. */
const META_TTL_MS = 60_000;
/** Batas jumlah buffer gambar yang ditahan di memori (eviksi LRU). */
const IMAGE_BUFFER_MAX_ENTRIES = 50;

/** Proxy gambar privat dari Google Drive (tanpa auth publik, server yang mengambil). */
export const GET = async ({ params }) => {
	const id = Number(params.id);
	if (!Number.isFinite(id)) throw error(404, 'Not found');

	// Cache lookup metadata DB agar request berulang tidak memukul DB.
	const img = await cached(`img:meta:${id}`, META_TTL_MS, async () => {
		const rows = await db.select().from(schema.images).where(eq(schema.images.id, id)).limit(1);
		return rows[0] ?? null;
	});
	if (!img) throw error(404, 'Not found');

	try {
		// LRU buffer: unduh dari Drive sekali, sajikan dari memori untuk hit berikutnya.
		const buffer = await lruGetOrLoad(`img:buf:${img.driveFileId}`, IMAGE_BUFFER_MAX_ENTRIES, () =>
			downloadFromDrive(img.driveFileId)
		);
		return new Response(new Uint8Array(buffer), {
			headers: {
				'Content-Type': img.contentType || 'application/octet-stream',
				'Cache-Control': 'public, max-age=31536000, immutable',
				ETag: `"${img.driveFileId}"`
			}
		});
	} catch {
		throw error(502, 'Gagal mengambil gambar dari Drive');
	}
};
