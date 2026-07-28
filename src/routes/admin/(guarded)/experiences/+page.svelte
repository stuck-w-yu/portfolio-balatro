<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Experience — Admin CMS</title>
</svelte:head>

<h1 class="adm-title outline-text">EXPERIENCE</h1>
<p class="adm-subtitle">Blind rounds / timeline karier.</p>

<div class="adm-actions">
	<a class="adm-btn adm-btn-primary" href="/admin/experiences/edit">+ Experience Baru</a>
</div>

<div class="adm-panel">
	{#if data.experiences.length === 0}
		<p class="adm-hint">Belum ada experience.</p>
	{:else}
		<table class="adm-table">
			<thead>
				<tr><th>Ikon</th><th>Peran</th><th>Perusahaan</th><th>Periode</th><th>Blind</th><th>Aksi</th></tr>
			</thead>
			<tbody>
				{#each data.experiences as e}
					<tr>
						<td>{e.icon}</td>
						<td>{e.role}</td>
						<td>{e.company}</td>
						<td>{e.period}</td>
						<td>{e.type}</td>
						<td>
							<div class="adm-row-actions">
								<a class="adm-btn adm-btn-sm" href="/admin/experiences/edit/{e.id}">Edit</a>
								<form method="POST" action="?/delete" onsubmit={(e) => { if (!confirm('Hapus experience ini?')) e.preventDefault(); }}>
									<input type="hidden" name="id" value={e.id} />
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
