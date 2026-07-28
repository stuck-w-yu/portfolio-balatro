<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Settings — Admin CMS</title>
</svelte:head>

<h1 class="adm-title outline-text">SETTINGS</h1>
<p class="adm-subtitle">Koneksi Google Drive untuk penyimpanan gambar.</p>

{#if data.flag === '1'}
	<div class="adm-flash adm-flash-ok">Google Drive berhasil terhubung.</div>
{:else if data.flag === '0'}
	<div class="adm-flash adm-flash-err">Gagal terhubung: {data.error ?? 'unknown error'}</div>
{/if}
{#if data.disconnected === '1'}
	<div class="adm-flash adm-flash-ok">Google Drive diputus.</div>
{/if}

<div class="adm-panel">
	<span class="adm-label">Status</span>
	<p style="margin:var(--sp-2) 0;">
		{#if data.connected}
			<span class="adm-badge adm-badge-ok">TERHUBUNG</span>
		{:else}
			<span class="adm-badge adm-badge-warn">BELUM TERHUBUNG</span>
		{/if}
	</p>

	{#if !data.configured}
		<div class="adm-flash adm-flash-err">
			Variabel env GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / GOOGLE_REDIRECT_URI belum lengkap.
			Set di environment (Vercel / .env).
		</div>
	{:else if data.connected}
		<form method="POST" action="?/disconnect">
			<button class="adm-btn adm-btn-danger" type="submit">Putuskan Koneksi</button>
		</form>
	{:else}
		<a class="adm-btn adm-btn-success" href={data.authUrl}>Hubungkan Google Drive</a>
		<p class="adm-hint" style="margin-top:var(--sp-3);">
			Anda akan diarahkan ke Google untuk memberi izin akses Drive. Setelah setuju,
			kembali ke sini dan upload gambar akan aktif.
		</p>
	{/if}
</div>

<div class="adm-panel">
	<span class="adm-label">Folder Drive tujuan</span>
	<p style="margin-top:var(--sp-2);font-family:var(--font-small);word-break:break-all;">
		ID: <code>{data.folderId || '(belum di-set)'}</code>
	</p>
	<p class="adm-hint" style="margin-top:var(--sp-2);">
		Diambil dari env <code>GOOGLE_DRIVE_ROOT_FOLDER_ID</code>. Gambar di-upload privat ke folder ini
		dan disajikan ke situs melalui proxy <code>/images/&lt;id&gt;</code>.
	</p>
</div>

<div class="adm-panel">
	<span class="adm-label">Catatan Redirect URI</span>
	<p class="adm-hint" style="margin-top:var(--sp-2);line-height:1.6;">
		Pastikan <code>GOOGLE_REDIRECT_URI</code> sama persis dengan URL deploy + path
		<code>/api/auth/callback/google</code>, dan URL tersebut sudah didaftarkan di
		Google Cloud → Credentials → OAuth Client → Authorized redirect URIs.
	</p>
</div>
