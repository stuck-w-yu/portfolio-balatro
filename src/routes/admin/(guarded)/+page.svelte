<script lang="ts">
	let { data } = $props();

	let cards = $derived([
		{ label: 'Projects', n: data.counts.projects, href: '/admin/projects' },
		{ label: 'Skills', n: data.counts.skills, href: '/admin/skills' },
		{ label: 'Experience', n: data.counts.experiences, href: '/admin/experiences' },
		{ label: 'Socials', n: data.counts.socials, href: '/admin/socials' }
	]);
</script>

<svelte:head>
	<title>Dashboard — Admin CMS</title>
</svelte:head>

<h1 class="adm-title outline-text">DASHBOARD</h1>
<p class="adm-subtitle">Kelola konten portfolio bertema Balatro.</p>

<div class="adm-panel">
	<span class="adm-label">Status Google Drive</span>
	{#if data.driveConnected}
		<span class="adm-badge adm-badge-ok">TERHUBUNG</span>
		<span class="adm-hint"> — upload gambar aktif.</span>
	{:else}
		<span class="adm-badge adm-badge-warn">BELUM TERHUBUNG</span>
		<span class="adm-hint"> — hubungkan di menu <a href="/admin/settings" style="color:var(--accent-2);">Settings</a> agar bisa upload gambar.</span>
	{/if}
</div>

<div class="adm-cards">
	{#each cards as c}
		<a class="adm-card" href={c.href}>
			<div class="adm-card-num outline-text">{c.n}</div>
			<div class="adm-card-label">{c.label}</div>
		</a>
	{/each}
</div>

<div class="adm-panel">
	<span class="adm-label">Aksi cepat</span>
	<div class="adm-actions" style="margin-top:var(--sp-2);">
		<a class="adm-btn adm-btn-primary" href="/admin/profile">Edit Profile</a>
		<a class="adm-btn" href="/admin/projects/edit">+ Project Baru</a>
		<a class="adm-btn" href="/admin/settings">Hubungkan Drive</a>
	</div>
</div>
