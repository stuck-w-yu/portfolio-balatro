<script lang="ts">
	import { page } from '$app/state';

	let { data, children } = $props();

	const nav = [
		{ href: '/admin', label: 'Dashboard', exact: true },
		{ href: '/admin/profile', label: 'Profile' },
		{ href: '/admin/projects', label: 'Projects' },
		{ href: '/admin/skills', label: 'Skills' },
		{ href: '/admin/experiences', label: 'Experience' },
		{ href: '/admin/socials', label: 'Socials' },
		{ href: '/admin/settings', label: 'Settings' }
	];

	function isActive(item: { href: string; exact?: boolean }) {
		const p = page.url.pathname;
		return item.exact ? p === item.href : p.startsWith(item.href);
	}
</script>

<div class="adm-scroll">
	<div class="adm-layout">
		<aside class="adm-sidebar">
			<div class="adm-brand outline-text">♠ CMS</div>
			{#each nav as item}
				<a class="adm-navlink" class:active={isActive(item)} href={item.href}>{item.label}</a>
			{/each}
			<div class="adm-navspacer"></div>
			<a class="adm-navlink" href="/">Lihat Situs ↗</a>
			<form method="POST" action="/admin/logout">
				<button type="submit" class="adm-navlink">Logout</button>
			</form>
			<div class="adm-user">Login: @{data.user.username}</div>
		</aside>

		<main class="adm-main">
			{@render children()}
		</main>
	</div>
</div>
