<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Projects — Admin CMS</title>
</svelte:head>

<h1 class="adm-title outline-text">PROJECTS</h1>
<p class="adm-subtitle">Kartu Joker portfolio.</p>

<div class="adm-actions">
	<a class="adm-btn adm-btn-primary" href="/admin/projects/edit">+ Project Baru</a>
</div>

<div class="adm-panel">
	{#if data.projects.length === 0}
		<p class="adm-hint">Belum ada project. Klik "+ Project Baru".</p>
	{:else}
		<table class="adm-table">
			<thead>
				<tr>
					<th>Art</th>
					<th>Judul</th>
					<th>Rarity</th>
					<th>Edisi</th>
					<th>Chips / Mult</th>
					<th>Aksi</th>
				</tr>
			</thead>
			<tbody>
				{#each data.projects as p}
					<tr>
						<td>
							{#if p.art}
								<img class="adm-thumb" src={p.art} alt="" />
							{:else}
								<div class="adm-thumb"></div>
							{/if}
						</td>
						<td>{p.title}</td>
						<td>{p.rarity}</td>
						<td>{p.edition}</td>
						<td>{p.impactChips} / {p.impactMult}</td>
						<td>
							<div class="adm-row-actions">
								<a class="adm-btn adm-btn-sm" href="/admin/projects/edit/{p.id}">Edit</a>
								<form method="POST" action="?/delete" onsubmit={(e) => { if (!confirm('Hapus project ini?')) e.preventDefault(); }}>
									<input type="hidden" name="id" value={p.id} />
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
