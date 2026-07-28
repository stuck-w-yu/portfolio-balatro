<script lang="ts">
	import AnimatedBackground from '$lib/components/AnimatedBackground.svelte';
	import CRTOverlay from '$lib/components/CRTOverlay.svelte';
	import HUDTopBar from '$lib/components/HUDTopBar.svelte';
	import BottomNav from '$lib/components/BottomNav.svelte';
	import { getAppState, initReducedMotion } from '$lib/state/app-state.svelte.js';
	import { getAudioState, restoreAudio } from '$lib/state/audio.svelte.js';
	import { setContext, onMount } from 'svelte';
	import type { ScreenId } from '$lib/types.js';
	import type { PublicContent } from '$lib/server/content.js';

	let { data, children } = $props();

	const app = getAppState();
	const audio = getAudioState();

	setContext('app', app);
	setContext('audio', audio);
	setContext('content', data.content as PublicContent);

	const navItems: { id: ScreenId; label: string }[] = [
		{ id: 'menu', label: 'Menu' },
		{ id: 'projects', label: 'Projects' },
		{ id: 'stats', label: 'Stats' },
		{ id: 'blinds', label: 'Blinds' },
		{ id: 'shop', label: 'Shop' }
	];

	onMount(() => {
		restoreAudio();
		initReducedMotion();
	});

	let profile = $derived(data.content.profile);
	let displayName = $derived(profile.name.toUpperCase());
	let money = $derived(data.content.projects.length);
</script>

<div class="app-shell">
	<AnimatedBackground />

	<div class="app-grid">
		<HUDTopBar
			name={displayName}
			ante="Ante 1 · Round 1"
			{money}
			muted={audio.muted}
			onMute={() => audio.toggle()}
		/>

		<main class="stage">
			{@render children()}
		</main>

		<BottomNav
			items={navItems}
			active={app.screen}
			onNavigate={(id) => app.navigate(id)}
		/>
	</div>

	<CRTOverlay />
</div>

<style>
	.app-shell {
		position: fixed;
		inset: 0;
		overflow: hidden;
	}
	.app-grid {
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-rows: auto 1fr auto;
		height: 100dvh;
		width: 100vw;
	}
	.stage {
		overflow: hidden;
		position: relative;
	}
</style>
