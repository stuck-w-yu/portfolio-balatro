<script lang="ts">
	let { values }: { values: Record<string, any> } = $props();
	const kinds = ['chip', 'mult', 'money', 'neutral'];
</script>

<div class="adm-grid-2">
	<div class="adm-field">
		<label class="adm-label" for="s-label">Nama skill</label>
		<input id="s-label" class="adm-input" name="label" value={values.label} required />
	</div>
	<div class="adm-field">
		<label class="adm-label" for="s-sort">Urutan tampil</label>
		<input id="s-sort" class="adm-input" name="sort" type="number" value={values.sort} />
	</div>
</div>

<div class="adm-grid-2">
	<div class="adm-field">
		<label class="adm-label" for="s-kind">Jenis badge</label>
		<select id="s-kind" class="adm-select" name="kind">
			{#each kinds as k}
				<option value={k} selected={values.kind === k}>{k}</option>
			{/each}
		</select>
	</div>
	<div class="adm-field">
		<label class="adm-label" for="s-level">Level (0–5)</label>
		<input id="s-level" class="adm-input" name="level" type="number" min="0" max="5" value={values.level} />
	</div>
</div>

<div class="adm-field">
	<label class="adm-label" for="s-note">Catatan (tooltip)</label>
	<input id="s-note" class="adm-input" name="note" value={values.note} />
</div>
