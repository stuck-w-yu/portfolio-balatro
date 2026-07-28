<script lang="ts">
	import ImagePicker from '$lib/components/admin/ImagePicker.svelte';

	let { values }: { values: Record<string, any> } = $props();

	const rarities = ['common', 'rare', 'legendary'];
	const editions = ['none', 'foil', 'holo', 'poly', 'negative'];
</script>

<div class="adm-grid-2">
	<div class="adm-field">
		<label class="adm-label" for="p-title">Judul</label>
		<input id="p-title" class="adm-input" name="title" value={values.title} required />
	</div>
	<div class="adm-field">
		<label class="adm-label" for="p-sort">Urutan tampil</label>
		<input id="p-sort" class="adm-input" name="sort" type="number" value={values.sort} />
	</div>
</div>

<ImagePicker name="art" value={values.art} label="Art (gambar kartu)" />

<div class="adm-grid-2">
	<div class="adm-field">
		<label class="adm-label" for="p-rarity">Rarity</label>
		<select id="p-rarity" class="adm-select" name="rarity">
			{#each rarities as r}
				<option value={r} selected={values.rarity === r}>{r}</option>
			{/each}
		</select>
	</div>
	<div class="adm-field">
		<label class="adm-label" for="p-edition">Edition</label>
		<select id="p-edition" class="adm-select" name="edition">
			{#each editions as e}
				<option value={e} selected={values.edition === e}>{e}</option>
			{/each}
		</select>
	</div>
</div>

<div class="adm-field">
	<label class="adm-label" for="p-summary">Summary (efek ala Joker, 1 baris)</label>
	<input id="p-summary" class="adm-input" name="summary" value={values.summary} />
</div>

<div class="adm-field">
	<label class="adm-label" for="p-desc">Deskripsi (tampil di modal)</label>
	<textarea id="p-desc" class="adm-textarea" name="description">{values.description}</textarea>
</div>

<div class="adm-field">
	<label class="adm-label" for="p-tags">Tags (pisahkan dengan koma)</label>
	<input id="p-tags" class="adm-input" name="tags" value={values.tagsText} placeholder="SvelteKit, TypeScript, PostgreSQL" />
</div>

<div class="adm-field">
	<label class="adm-label" for="p-links">Links (satu per baris, format: Label | URL)</label>
	<textarea id="p-links" class="adm-textarea" name="links" placeholder="Repo | https://github.com/...&#10;Live Demo | https://...">{values.linksText}</textarea>
</div>

<div class="adm-grid-2">
	<div class="adm-field">
		<label class="adm-label" for="p-chips">Impact Chips</label>
		<input id="p-chips" class="adm-input" name="impactChips" type="number" value={values.impactChips} />
	</div>
	<div class="adm-field">
		<label class="adm-label" for="p-mult">Impact Mult</label>
		<input id="p-mult" class="adm-input" name="impactMult" type="number" value={values.impactMult} />
	</div>
</div>
