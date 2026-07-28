<script lang="ts">
	let { values }: { values: Record<string, any> } = $props();
	const types = ['small', 'big', 'boss'];
</script>

<div class="adm-grid-2">
	<div class="adm-field">
		<label class="adm-label" for="e-role">Peran / jabatan</label>
		<input id="e-role" class="adm-input" name="role" value={values.role} required />
	</div>
	<div class="adm-field">
		<label class="adm-label" for="e-company">Perusahaan</label>
		<input id="e-company" class="adm-input" name="company" value={values.company} />
	</div>
</div>

<div class="adm-grid-2">
	<div class="adm-field">
		<label class="adm-label" for="e-type">Jenis Blind</label>
		<select id="e-type" class="adm-select" name="type">
			{#each types as t}
				<option value={t} selected={values.type === t}>{t}</option>
			{/each}
		</select>
	</div>
	<div class="adm-field">
		<label class="adm-label" for="e-period">Periode</label>
		<input id="e-period" class="adm-input" name="period" value={values.period} placeholder="2023 — Now" />
	</div>
</div>

<div class="adm-grid-2">
	<div class="adm-field">
		<label class="adm-label" for="e-reward">Reward (mis. $8)</label>
		<input id="e-reward" class="adm-input" name="reward" value={values.reward} />
	</div>
	<div class="adm-field">
		<label class="adm-label" for="e-icon">Ikon (emoji/karakter)</label>
		<input id="e-icon" class="adm-input" name="icon" value={values.icon} placeholder="☠" />
	</div>
</div>

<div class="adm-field">
	<label class="adm-label" for="e-details">Detail (tampil di modal)</label>
	<textarea id="e-details" class="adm-textarea" name="details">{values.details}</textarea>
</div>

<div class="adm-field">
	<label class="adm-label" for="e-sort">Urutan tampil</label>
	<input id="e-sort" class="adm-input" name="sort" type="number" value={values.sort} />
</div>
