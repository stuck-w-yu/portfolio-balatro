<script lang="ts">
	import PixelAvatar from './PixelAvatar.svelte';
	import type { Edition, Suit } from '$lib/types.js';

	let {
		name,
		role = '',
		alias = '',
		avatar = '',
		suit = 'spade',
		edition = 'foil'
	}: {
		name: string;
		role?: string;
		alias?: string;
		avatar?: string;
		suit?: Suit;
		edition?: Edition;
	} = $props();

	const suitSymbols: Record<Suit, string> = {
		spade: '♠',
		heart: '♥',
		diamond: '♦',
		club: '♣'
	};
	let sym = $derived(suitSymbols[suit]);
	let isRed = $derived(suit === 'heart' || suit === 'diamond');
	let subtitle = $derived([role, alias].filter(Boolean).join(' · '));
</script>

<div
	class="name-card"
	class:edition-foil={edition === 'foil'}
	class:edition-holo={edition === 'holo'}
	class:edition-poly={edition === 'poly'}
	class:edition-negative={edition === 'negative'}
>
	<div class="art-area">
		<span class="corner top-left" class:red={isRed}>{sym}</span>
		<span class="corner bottom-right" class:red={isRed}>{sym}</span>
		<PixelAvatar src={avatar} size={120} frame={false} />
	</div>

	<div class="banner">
		<span class="banner-name outline-text">{name}</span>
	</div>

	{#if subtitle}
		<div class="card-info">
			<span class="info-text">{subtitle}</span>
		</div>
	{/if}

	{#if edition !== 'none'}
		<div class="edition-overlay"></div>
	{/if}
</div>

<style>
	.name-card {
		position: relative;
		width: 240px;
		background: var(--card-face);
		border: 2px solid var(--card-border);
		border-radius: var(--radius-card);
		overflow: hidden;
		box-shadow: var(--shadow-card);
		flex-shrink: 0;
		transition: transform var(--dur-fast) var(--ease-out),
			box-shadow var(--dur-fast) var(--ease-out);
		animation: float 4s ease-in-out infinite;
	}
	.name-card:hover {
		transform: translateY(-10px) scale(1.05);
		box-shadow: var(--shadow-card-hover);
		z-index: 10;
	}

	.art-area {
		position: relative;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--sp-4) var(--sp-3);
		background: var(--card-face-shade);
	}

	.corner {
		position: absolute;
		font-family: var(--font-main);
		font-size: 18px;
		line-height: 1;
		color: var(--suit-black);
	}
	.corner.red { color: var(--suit-red); }
	.top-left { top: 6px; left: 8px; }
	.bottom-right { bottom: 6px; right: 8px; transform: rotate(180deg); }

	.banner {
		padding: var(--sp-2) var(--sp-3);
		background: var(--chip-blue);
		text-align: center;
	}
	.banner-name {
		display: block;
		font-family: var(--font-main);
		font-size: var(--text-h2);
		color: white;
		text-transform: uppercase;
		letter-spacing: 2px;
		line-height: 1.25;
		overflow-wrap: break-word;
		word-break: break-word;
		text-wrap: balance;
	}

	.card-info {
		padding: var(--sp-2) var(--sp-3);
		background: var(--card-face);
		text-align: center;
	}
	.info-text {
		font-family: var(--font-small);
		font-size: var(--text-label);
		color: var(--suit-black);
		overflow-wrap: break-word;
		word-break: break-word;
	}

	.edition-overlay {
		position: absolute;
		inset: 0;
		pointer-events: none;
		border-radius: var(--radius-card);
	}
	.edition-foil .edition-overlay {
		background: linear-gradient(135deg, transparent 30%, rgba(79, 140, 255, 0.25) 50%, transparent 70%);
		background-size: 200% 200%;
		animation: shine 3s ease-in-out infinite;
		box-shadow: inset 0 0 12px rgba(79, 140, 255, 0.2);
	}
	.edition-holo .edition-overlay {
		background: linear-gradient(135deg, transparent 20%, rgba(57, 217, 138, 0.2) 40%, transparent 60%);
		background-size: 300% 300%;
		animation: shine 3s ease-in-out infinite;
	}
	.edition-poly .edition-overlay {
		background: linear-gradient(135deg, #ff4d4066, #f7b73166, #39d98a66, #3a86ff66, #b14dff66);
		background-size: 400% 400%;
		animation: shine 5s ease-in-out infinite;
		mix-blend-mode: overlay;
	}
	.edition-negative .edition-overlay {
		background: rgba(177, 77, 255, 0.12);
		animation: pulse 2s ease-in-out infinite;
		box-shadow: inset 0 0 16px rgba(177, 77, 255, 0.25);
	}

	@keyframes float {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-6px); }
	}
	@keyframes shine {
		0%, 100% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
	}
	@keyframes pulse {
		0%, 100% { opacity: 0.12; }
		50% { opacity: 0.25; }
	}

	@media (prefers-reduced-motion: reduce) {
		.name-card { animation: none; }
	}
</style>
