<script lang="ts">
	let { values }: { values: Record<string, any> } = $props();
</script>

<div class="adm-grid-2">
	<div class="adm-field">
		<label class="adm-label" for="so-label">Nama platform</label>
		<input id="so-label" class="adm-input" name="label" value={values.label} required />
	</div>
	<div class="adm-field">
		<label class="adm-label" for="so-sort">Urutan tampil</label>
		<input id="so-sort" class="adm-input" name="sort" type="number" value={values.sort} />
	</div>
</div>

<div class="adm-field">
	<label class="adm-label" for="so-url">URL</label>
	<input id="so-url" class="adm-input" name="url" value={values.url} placeholder="https://github.com/..." />
</div>

<div class="adm-grid-2">
	<div class="adm-field">
		<label class="adm-label" for="so-icon">Ikon (emoji/karakter)</label>
		<input id="so-icon" class="adm-input" name="icon" value={values.icon} placeholder="⌂" />
	</div>
	<div class="adm-field">
		<label class="adm-label" for="so-price">Harga dekoratif</label>
		<input id="so-price" class="adm-input" name="price" value={values.price} placeholder="$0" />
	</div>
</div>
