<script lang="ts">
	let { data, form } = $props();
</script>

<svelte:head>
	<title>Login — Admin CMS</title>
</svelte:head>

<div class="adm-scroll">
	<div class="login-wrap">
		<div class="login-card">
			<h1 class="login-title outline-text">ADMIN</h1>
			<p class="login-sub">Balatro Portfolio CMS</p>

			{#if form?.error}
				<div class="adm-flash adm-flash-err">{form.error}</div>
			{/if}

			<form method="POST">
				<input type="hidden" name="redirect" value={data.redirectTo} />
				<div class="adm-field">
					<label class="adm-label" for="username">Username</label>
					<input
						id="username"
						class="adm-input"
						type="text"
						name="username"
						value={form?.username ?? ''}
						autocomplete="username"
						required
					/>
				</div>
				<div class="adm-field">
					<label class="adm-label" for="password">Password</label>
					<input
						id="password"
						class="adm-input"
						type="password"
						name="password"
						autocomplete="current-password"
						required
					/>
				</div>
				<button type="submit" class="adm-btn adm-btn-primary" style="width:100%;justify-content:center;">MASUK</button>
			</form>
		</div>
	</div>
</div>
