<script lang="ts">
	import { page } from '$app/state';
	import ImagePicker from '$lib/components/admin/ImagePicker.svelte';

	let { data, form } = $props();

	let values = $derived(form?.values ?? data.values);
	let saved = $derived(page.url.searchParams.get('saved') === '1');

	// Beberapa baris kosong untuk menambah stat baru (tanpa JS).
	const blank = [{ label: '', value: '' }, { label: '', value: '' }, { label: '', value: '' }];
	let statRows = $derived([...data.stats, ...blank]);
</script>

<svelte:head>
	<title>Profile — Admin CMS</title>
</svelte:head>

<h1 class="adm-title outline-text">PROFILE</h1>
<p class="adm-subtitle">Identitas & statistik "run".</p>

{#if saved}
	<div class="adm-flash adm-flash-ok">Profile berhasil disimpan.</div>
{/if}
{#if form?.error}
	<div class="adm-flash adm-flash-err">{form.error}</div>
{/if}

<div class="adm-panel">
	<form method="POST">
		<div class="adm-grid-2">
			<div class="adm-field">
				<label class="adm-label" for="pr-name">Nama tampil</label>
				<input id="pr-name" class="adm-input" name="name" value={values.name} required />
			</div>
			<div class="adm-field">
				<label class="adm-label" for="pr-alias">Alias / gelar</label>
				<input id="pr-alias" class="adm-input" name="alias" value={values.alias} placeholder="Card Slinger" />
			</div>
		</div>

		<div class="adm-grid-2">
			<div class="adm-field">
				<label class="adm-label" for="pr-role">Peran profesional</label>
				<input id="pr-role" class="adm-input" name="role" value={values.role} />
			</div>
			<div class="adm-field">
				<label class="adm-label" for="pr-loc">Lokasi</label>
				<input id="pr-loc" class="adm-input" name="location" value={values.location} />
			</div>
		</div>

		<div class="adm-field">
			<label class="adm-label" for="pr-bio">Bio</label>
			<textarea id="pr-bio" class="adm-textarea" name="bio">{values.bio}</textarea>
		</div>

		<ImagePicker name="avatar" value={values.avatar} label="Avatar" />

		<span class="adm-label" style="margin-top:var(--sp-3);">Statistik Run</span>
		<p class="adm-hint" style="margin-bottom:var(--sp-2);">
			Kosongkan label untuk menghapus baris. Baris kosong di bawah untuk menambah stat baru.
		</p>
		<div style="display:flex;flex-direction:column;gap:var(--sp-2);">
			{#each statRows as stat}
				<div class="adm-grid-2">
					<input class="adm-input" name="stat_label" value={stat.label} placeholder="Label (mis. Rounds)" />
					<input class="adm-input" name="stat_value" value={stat.value} placeholder="Nilai (mis. 12)" />
				</div>
			{/each}
		</div>

		<div class="adm-actions" style="margin-top:var(--sp-4);">
			<button class="adm-btn adm-btn-primary" type="submit">Simpan Profile</button>
		</div>
	</form>
</div>
