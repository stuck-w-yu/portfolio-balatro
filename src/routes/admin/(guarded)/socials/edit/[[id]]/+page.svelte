<script lang="ts">
	import SocialForm from '$lib/components/admin/forms/SocialForm.svelte';

	let { data, form } = $props();
	let values = $derived(form?.values ?? data.values);
	let isEdit = $derived(data.id != null);
</script>

<svelte:head>
	<title>{isEdit ? 'Edit' : 'Baru'} Social — Admin CMS</title>
</svelte:head>

<h1 class="adm-title outline-text">{isEdit ? 'EDIT SOCIAL' : 'SOCIAL BARU'}</h1>
<p class="adm-subtitle">
	<a href="/admin/socials" style="color:var(--accent-2);">← Kembali ke daftar</a>
</p>

{#if form?.error}
	<div class="adm-flash adm-flash-err">{form.error}</div>
{/if}

<div class="adm-panel">
	<form method="POST" action="?/save">
		<SocialForm {values} />
		<div class="adm-actions" style="margin-top:var(--sp-4);">
			<button class="adm-btn adm-btn-primary" type="submit">Simpan</button>
			<a class="adm-btn" href="/admin/socials">Batal</a>
		</div>
	</form>
</div>

{#if isEdit}
	<div class="adm-panel">
		<span class="adm-label">Zona berbahaya</span>
		<form method="POST" action="?/delete" onsubmit={(e) => { if (!confirm('Hapus social ini?')) e.preventDefault(); }}>
			<button class="adm-btn adm-btn-danger" type="submit" style="margin-top:var(--sp-2);">Hapus</button>
		</form>
	</div>
{/if}
