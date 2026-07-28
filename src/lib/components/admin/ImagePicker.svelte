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

	async function onFile(e: Event) {
		const input = e.target as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;
		uploading = true;
		errorMsg = '';
		const fd = new FormData();
		fd.append('file', file);
		try {
			const res = await fetch('/admin/upload', { method: 'POST', body: fd });
			if (!res.ok) {
				let msg = 'Upload gagal';
				try { msg = (await res.json())?.message ?? msg; } catch { /* ignore */ }
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
