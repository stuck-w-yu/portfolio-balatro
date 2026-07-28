<script lang="ts">
	import type { BlindType } from '$lib/types.js';

	let {
		type = 'small',
		title,
		period = '',
		reward = '',
		icon = '◐',
		onclick
	}: {
		type?: BlindType;
		title: string;
		period?: string;
		reward?: string;
		icon?: string;
		onclick?: () => void;
	} = $props();

	const typeStyles: Record<BlindType, { bg: string; border: string; scale: string }> = {
		small: { bg: 'var(--surface)', border: 'var(--chip-blue)', scale: '1' },
		big: { bg: 'var(--surface-2)', border: 'var(--money-gold)', scale: '1.05' },
		boss: { bg: '#3a1a3a', border: 'var(--mult-red)', scale: '1.1' }
	};

	let s = $derived(typeStyles[type]);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="blind blind-{type}"
	style="
		background: {s.bg};
		border-color: {s.border};
		--scale: {s.scale};
	"
	onclick={onclick}
>
	<div class="blind-type outline-text">{type.toUpperCase()} BLIND</div>
	<div class="blind-icon">{icon}</div>
	<div class="blind-title outline-text">{title}</div>
	{#if period}
		<div class="blind-period">{period}</div>
	{/if}
	{#if reward}
		<div class="blind-reward">
			Reward: <span class="reward-value">{reward}</span>
		</div>
	{/if}
</div>

<style>
	.blind {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--sp-2);
		padding: var(--sp-4) var(--sp-5);
		border: 2px solid;
		border-radius: var(--radius-panel);
		box-shadow: var(--shadow-panel);
		cursor: pointer;
		transition: transform var(--dur-fast) var(--ease-out),
					box-shadow var(--dur-fast) var(--ease-out);
		transform: scale(var(--scale));
		min-width: 180px;
		animation: wobble 3s ease-in-out infinite;
	}
	.blind:hover {
		transform: scale(calc(var(--scale) * 1.06));
		box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
	}

	.blind-type {
		font-size: var(--text-micro);
		text-transform: uppercase;
		letter-spacing: 2px;
		color: var(--text-dim);
	}
	.blind-icon { font-size: 48px; }
	.blind-title {
		font-size: var(--text-h2);
		color: var(--text);
		text-align: center;
	}
	.blind-period {
		font-family: var(--font-small);
		font-size: var(--text-label);
		color: var(--text-dim);
	}
	.blind-reward {
		font-family: var(--font-small);
		font-size: var(--text-label);
		color: var(--text-dim);
	}
	.reward-value { color: var(--money-gold); }

	.blind-boss { animation-duration: 2.5s; }

	@keyframes wobble {
		0%, 100% { transform: scale(var(--scale)) rotate(0deg); }
		25% { transform: scale(var(--scale)) rotate(1deg); }
		75% { transform: scale(var(--scale)) rotate(-1deg); }
	}

	@media (prefers-reduced-motion: reduce) {
		.blind { animation: none; }
	}
</style>
