<script lang="ts">
	import ProjectForm from '$lib/components/admin/forms/ProjectForm.svelte';

	let { data, form } = $props();

	let values = $derived(form?.values ?? data.values);
	let isEdit = $derived(data.id != null);
</script>

<svelte:head>
	<title>{isEdit ? 'Edit' : 'Baru'} Project — Admin CMS</title>
</svelte:head>

<h1 class="adm-title outline-text">{isEdit ? 'EDIT PROJECT' : 'PROJECT BARU'}</h1>
<p class="adm-subtitle">
	<a href="/admin/projects" style="color:var(--accent-2);">← Kembali ke daftar</a>
</p>

{#if form?.error}
	<div class="adm-flash adm-flash-err">{form.error}</div>
{/if}

<div class="adm-panel">
	<form method="POST" action="?/save">
		<ProjectForm {values} />
		<div class="adm-actions" style="margin-top:var(--sp-4);">
			<button class="adm-btn adm-btn-primary" type="submit">Simpan</button>
			<a class="adm-btn" href="/admin/projects">Batal</a>
		</div>
	</form>
</div>

{#if isEdit}
	<div class="adm-panel">
		<span class="adm-label">Zona berbahaya</span>
		<form method="POST" action="?/delete" onsubmit={(e) => { if (!confirm('Hapus project ini?')) e.preventDefault(); }}>
			<button class="adm-btn adm-btn-danger" type="submit" style="margin-top:var(--sp-2);">
				Hapus Project
			</button>
		</form>
	</div>
{/if}
