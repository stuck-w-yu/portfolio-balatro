<script lang="ts">
	/**
	 * Widget pilih/upload gambar. Meng-upload ke /admin/upload (Google Drive)
	 * lalu menyimpan URL proxy (/images/<id>) ke input bernama `name`.
	 * Juga bisa menempel URL eksternal manual.
	 */
	let {
		name = 'art',
		value = '',
		label = 'Gambar'
	}: { name?: string; value?: string; label?: string } = $props();

	let preview = $state(value);
	let uploading = $state(false);
	let errorMsg = $state('');

	// Kompres & resize gambar di browser sebelum upload agar file menjadi kecil
	// (menghindari batas ukuran body Vercel ~4.5MB dan mempercepat upload).
	async function compressImage(file: File, maxDim = 1600, quality = 0.85): Promise<File> {
		try {
			const bitmap = await createImageBitmap(file);
			const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
			const w = Math.max(1, Math.round(bitmap.width * scale));
			const h = Math.max(1, Math.round(bitmap.height * scale));
			const canvas = document.createElement('canvas');
			canvas.width = w;
			canvas.height = h;
			const ctx = canvas.getContext('2d');
			if (!ctx) return file;
			ctx.drawImage(bitmap, 0, 0, w, h);
			const blob = await new Promise<Blob | null>((resolve) =>
				canvas.toBlob((b) => resolve(b), 'image/jpeg', quality)
			);
			if (!blob) return file;
			const baseName = (file.name || 'gambar').replace(/\.[^.]+$/, '');
			return new File([blob], `${baseName}.jpg`, { type: 'image/jpeg' });
		} catch {
			return file; // gagal kompresi → pakai file asli
		}
	}

	async function onFile(e: Event) {
		const input = e.target as HTMLInputElement;
		const original = input.files?.[0];
		if (!original) return;
		uploading = true;
		errorMsg = '';
		try {
			const file = await compressImage(original);
			const fd = new FormData();
			fd.append('file', file);
			const res = await fetch('/admin/upload', { method: 'POST', body: fd });
			if (!res.ok) {
				let msg = 'Upload gagal';
				try {
					const d = await res.json();
					msg = d?.error ?? d?.message ?? msg;
				} catch { /* ignore */ }
				throw new Error(msg);
			}
			const data = await res.json();
			preview = data.url;
		} catch (err) {
			errorMsg = (err as Error).message;
		} finally {
			uploading = false;
			input.value = '';
		}
	}
</script>

<div class="adm-field">
	<label class="adm-label" for="img-{name}">{label}</label>
	<div class="imgpicker">
		{#if preview}
			<img class="imgpicker-preview" src={preview} alt="preview" />
		{:else}
			<div class="imgpicker-empty">Belum ada gambar</div>
		{/if}
		<div class="imgpicker-controls">
			<input id="img-{name}" type="file" accept="image/*" class="adm-file" onchange={onFile} />
			{#if uploading}<span class="adm-hint">Sedang mengupload ke Drive...</span>{/if}
			{#if errorMsg}<span class="adm-error">{errorMsg}</span>{/if}
			<input type="text" class="adm-input" {name} bind:value={preview} placeholder="atau tempel URL gambar" />
			<span class="adm-hint">Upload menyimpan gambar ke Google Drive (privat, disajikan via proxy).</span>
		</div>
	</div>
</div>
