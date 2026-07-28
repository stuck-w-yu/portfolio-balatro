<script lang="ts">
	import BalatroButton from '$lib/components/BalatroButton.svelte';
	import NameCard from '$lib/components/NameCard.svelte';
	import type { Profile, ScreenId } from '$lib/types.js';

	let { profile, onNavigate }: { profile: Profile; onNavigate: (s: ScreenId) => void } = $props();

	const menuItems: { id: ScreenId; label: string; variant: 'primary' | 'neutral' }[] = [
		{ id: 'projects', label: '► PLAY (Projects)', variant: 'primary' },
		{ id: 'collection', label: 'COLLECTION', variant: 'neutral' },
		{ id: 'stats', label: 'STATS', variant: 'neutral' },
		{ id: 'blinds', label: 'BLINDS', variant: 'neutral' },
		{ id: 'shop', label: 'SHOP', variant: 'neutral' }
	];
</script>

<div class="menu">
	<NameCard
		name={profile.name}
		role={profile.role}
		alias={profile.alias}
		avatar={profile.avatar}
		edition="foil"
	/>
	<div class="menu-buttons">
		{#each menuItems as item}
			<BalatroButton
				variant={item.variant}
				size="md"
				fullWidth
				onclick={() => onNavigate(item.id)}
			>
				{item.label}
			</BalatroButton>
		{/each}
	</div>
	<p class="menu-footer">v1.0 · © 2026</p>
</div>

<style>
	.menu {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--sp-5);
		height: 100%;
		animation: menuIn var(--dur-slow) var(--ease-out);
	}
	.menu-buttons {
		display: flex;
		flex-direction: column;
		gap: var(--sp-2);
		width: 280px;
	}
	.menu-footer {
		font-family: var(--font-small);
		font-size: var(--text-micro);
		color: var(--text-dim);
		opacity: 0.5;
	}

	@keyframes menuIn {
		from { opacity: 0; transform: scale(0.95); }
		to { opacity: 1; transform: scale(1); }
	}
</style>
