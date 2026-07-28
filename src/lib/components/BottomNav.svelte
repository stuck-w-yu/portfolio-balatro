<script lang="ts">
	import type { ScreenId } from '$lib/types.js';
	import BalatroButton from './BalatroButton.svelte';

	let {
		items = [],
		active = 'menu',
		onNavigate
	}: {
		items?: { id: ScreenId; label: string }[];
		active?: ScreenId;
		onNavigate?: (id: ScreenId) => void;
	} = $props();
</script>

<nav class="bottom-nav">
	{#each items as item}
		<BalatroButton
			variant={item.id === active ? 'primary' : 'neutral'}
			size="sm"
			onclick={() => onNavigate?.(item.id)}
		>
			{item.label}
		</BalatroButton>
	{/each}
</nav>

<style>
	.bottom-nav {
		position: relative;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--sp-2);
		padding: var(--sp-2) var(--sp-4);
		background: var(--surface);
		border-top: 2px solid rgba(0, 0, 0, 0.3);
		box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.3);
	}
</style>
