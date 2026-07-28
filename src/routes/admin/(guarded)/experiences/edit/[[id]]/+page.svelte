<script lang="ts">
	import ExperienceForm from '$lib/components/admin/forms/ExperienceForm.svelte';

	let { data, form } = $props();
	let values = $derived(form?.values ?? data.values);
	let isEdit = $derived(data.id != null);
</script>

<svelte:head>
	<title>{isEdit ? 'Edit' : 'Baru'} Experience — Admin CMS</title>
</svelte:head>

<h1 class="adm-title outline-text">{isEdit ? 'EDIT EXPERIENCE' : 'EXPERIENCE BARU'}</h1>
<p class="adm-subtitle">
	<a href="/admin/experiences" style="color:var(--accent-2);">← Kembali ke daftar</a>
</p>

{#if form?.error}
	<div class="adm-flash adm-flash-err">{form.error}</div>
{/if}

<div class="adm-panel">
	<form method="POST" action="?/save">
		<ExperienceForm {values} />
		<div class="adm-actions" style="margin-top:var(--sp-4);">
			<button class="adm-btn adm-btn-primary" type="submit">Simpan</button>
			<a class="adm-btn" href="/admin/experiences">Batal</a>
		</div>
	</form>
</div>

{#if isEdit}
	<div class="adm-panel">
		<span class="adm-label">Zona berbahaya</span>
		<form method="POST" action="?/delete" onsubmit={(e) => { if (!confirm('Hapus experience ini?')) e.preventDefault(); }}>
			<button class="adm-btn adm-btn-danger" type="submit" style="margin-top:var(--sp-2);">Hapus</button>
		</form>
	</div>
{/if}
