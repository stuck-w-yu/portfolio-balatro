<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { initFromHash } from '$lib/state/app-state.svelte.js';
	import MenuScreen from '$lib/screens/MenuScreen.svelte';
	import ProjectsScreen from '$lib/screens/ProjectsScreen.svelte';
	import CollectionScreen from '$lib/screens/CollectionScreen.svelte';
	import StatsScreen from '$lib/screens/StatsScreen.svelte';
	import BlindsScreen from '$lib/screens/BlindsScreen.svelte';
	import ShopScreen from '$lib/screens/ShopScreen.svelte';
	import type { ScreenId } from '$lib/types.js';
	import type { PublicContent } from '$lib/server/content.js';

	const app = getContext<ReturnType<typeof import('$lib/state/app-state.svelte.js').getAppState>>('app');
	const content = getContext<PublicContent>('content');

	onMount(() => {
		const initial = initFromHash();
		if (initial !== 'menu') app.navigate(initial);

		window.addEventListener('hashchange', () => {
			const h = window.location.hash.replace('#', '') as ScreenId;
			const valid: ScreenId[] = ['menu', 'projects', 'collection', 'stats', 'blinds', 'shop'];
			if (valid.includes(h) && h !== app.screen) app.navigate(h);
		});

		window.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && app.screen !== 'menu') app.back();
		});
	});

	function navigate(s: ScreenId) { app.navigate(s); }
	function back() { app.back(); }
</script>

<svelte:head>
	<title>{content.profile.name} — Portfolio</title>
</svelte:head>

{#key app.screen}
	{#if app.screen === 'menu'}
		<MenuScreen profile={content.profile} onNavigate={navigate} />
	{:else if app.screen === 'projects'}
		<ProjectsScreen projects={content.projects} onBack={back} />
	{:else if app.screen === 'collection'}
		<CollectionScreen projects={content.projects} skills={content.skills} onBack={back} />
	{:else if app.screen === 'stats'}
		<StatsScreen profile={content.profile} skills={content.skills} projects={content.projects} onBack={back} />
	{:else if app.screen === 'blinds'}
		<BlindsScreen experiences={content.experiences} onBack={back} />
	{:else if app.screen === 'shop'}
		<ShopScreen socials={content.socials} onBack={back} />
	{/if}
{/key}
