<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Socials — Admin CMS</title>
</svelte:head>

<h1 class="adm-title outline-text">SOCIALS</h1>
<p class="adm-subtitle">Item Shop / tautan kontak.</p>

<div class="adm-actions">
	<a class="adm-btn adm-btn-primary" href="/admin/socials/edit">+ Social Baru</a>
</div>

<div class="adm-panel">
	{#if data.socials.length === 0}
		<p class="adm-hint">Belum ada social.</p>
	{:else}
		<table class="adm-table">
			<thead>
				<tr><th>Ikon</th><th>Label</th><th>URL</th><th>Harga</th><th>Aksi</th></tr>
			</thead>
			<tbody>
				{#each data.socials as s}
					<tr>
						<td>{s.icon}</td>
						<td>{s.label}</td>
						<td style="max-width:280px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">{s.url}</td>
						<td>{s.price}</td>
						<td>
							<div class="adm-row-actions">
								<a class="adm-btn adm-btn-sm" href="/admin/socials/edit/{s.id}">Edit</a>
								<form method="POST" action="?/delete" onsubmit={(e) => { if (!confirm('Hapus social ini?')) e.preventDefault(); }}>
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
