<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Skills — Admin CMS</title>
</svelte:head>

<h1 class="adm-title outline-text">SKILLS</h1>
<p class="adm-subtitle">Chip / Mult board.</p>

<div class="adm-actions">
	<a class="adm-btn adm-btn-primary" href="/admin/skills/edit">+ Skill Baru</a>
</div>

<div class="adm-panel">
	{#if data.skills.length === 0}
		<p class="adm-hint">Belum ada skill.</p>
	{:else}
		<table class="adm-table">
			<thead>
				<tr><th>Label</th><th>Jenis</th><th>Level</th><th>Catatan</th><th>Aksi</th></tr>
			</thead>
			<tbody>
				{#each data.skills as s}
					<tr>
						<td>{s.label}</td>
						<td>{s.kind}</td>
						<td>{s.level}</td>
						<td>{s.note}</td>
						<td>
							<div class="adm-row-actions">
								<a class="adm-btn adm-btn-sm" href="/admin/skills/edit/{s.id}">Edit</a>
								<form method="POST" action="?/delete" onsubmit={(e) => { if (!confirm('Hapus skill ini?')) e.preventDefault(); }}>
									<input type="hidden" name="id" value={s.id} />
									<button class="adm-btn adm-btn-sm adm-btn-danger" type="submit">Hapus</button>
								</form>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</div>
