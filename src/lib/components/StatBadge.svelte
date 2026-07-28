<script lang="ts">
	import type { BadgeKind } from '$lib/types.js';

	let {
		label,
		value = '',
		kind = 'chip',
		level
	}: {
		label: string;
		value?: string | number;
		kind?: BadgeKind;
		level?: number;
	} = $props();

	const kindColors: Record<BadgeKind, string> = {
		chip: 'var(--chip-blue)',
		mult: 'var(--mult-red)',
		money: 'var(--money-gold)',
		neutral: 'var(--text-dim)'
	};

	let color = $derived(kindColors[kind]);
</script>

<div class="badge" style="--badge-color: {color}">
	<span class="badge-label">{label}</span>
	{#if value}
		<span class="badge-value">+{value}</span>
	{/if}
	{#if level !== undefined}
		<span class="badge-pips">
			{#each Array(5) as _, i}
				<span class="pip" class:filled={i < level}>●</span>
			{/each}
		</span>
	{/if}
</div>

<style>
	.badge {
		display: inline-flex;
		align-items: center;
		gap: var(--sp-1);
		padding: var(--sp-1) var(--sp-2);
		background: var(--surface);
		border: 1px solid var(--badge-color);
		border-radius: var(--radius-badge);
		font-family: var(--font-main);
		font-size: var(--text-label);
		color: var(--text);
		transition: filter var(--dur-fast) var(--ease-out);
		cursor: default;
	}
	.badge:hover { filter: brightness(1.2); }
	.badge-label { color: var(--badge-color); }
	.badge-value {
		color: var(--badge-color);
		font-weight: bold;
	}
	.badge-pips {
		display: flex;
		gap: 1px;
		font-size: 6px;
	}
	.pip { color: var(--surface-2); }
	.pip.filled { color: var(--badge-color); }
</style>
