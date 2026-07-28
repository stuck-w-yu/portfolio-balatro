<script lang="ts">
	import type { Rank, Suit, Edition } from '$lib/types.js';

	let {
		rank = 'A',
		suit = 'spade',
		size = 'md',
		edition = 'none',
		faceDown = false,
		selected = false,
		interactive = true,
		onclick
	}: {
		rank?: Rank;
		suit?: Suit;
		size?: 'sm' | 'md' | 'lg';
		edition?: Edition;
		faceDown?: boolean;
		selected?: boolean;
		interactive?: boolean;
		onclick?: () => void;
	} = $props();

	const suitSymbols: Record<Suit, string> = {
		spade: '♠', heart: '♥', diamond: '♦', club: '♣'
	};
	let sym = $derived(suitSymbols[suit]);
	let isRed = $derived(suit === 'heart' || suit === 'diamond');
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="card card-{size}"
	class:face-down={faceDown}
	class:selected
	class:interactive
	class:edition-foil={edition === 'foil'}
	class:edition-holo={edition === 'holo'}
	class:edition-poly={edition === 'poly'}
	class:edition-negative={edition === 'negative'}
	onclick={interactive ? onclick : undefined}
>
	{#if faceDown}
		<div class="card-back">
			<div class="back-pattern"></div>
		</div>
	{:else}
		<div class="card-face">
			<div class="corner top-left" class:red={isRed}>
				<span class="rank">{rank}</span>
				<span class="suit-small">{sym}</span>
			</div>
			<div class="pip" class:red={isRed}>{sym}</div>
			<div class="corner bottom-right" class:red={isRed}>
				<span class="rank">{rank}</span>
				<span class="suit-small">{sym}</span>
			</div>
		</div>
		{#if edition !== 'none'}
			<div class="edition-overlay"></div>
		{/if}
	{/if}
</div>

<style>
	.card {
		position: relative;
		aspect-ratio: 2.5 / 3.5;
		border-radius: var(--radius-card);
		border: 2px solid var(--card-border);
		overflow: hidden;
		transition: transform var(--dur-fast) var(--ease-out),
					box-shadow var(--dur-fast) var(--ease-out);
		box-shadow: var(--shadow-card);
		flex-shrink: 0;
	}
	.card-sm { width: 60px; }
	.card-md { width: 90px; }
	.card-lg { width: 130px; }

	.interactive { cursor: pointer; }
	.interactive:hover {
		transform: translateY(-12px) scale(1.06);
		box-shadow: var(--shadow-card-hover);
		z-index: 10;
	}
	.selected {
		transform: translateY(-16px);
		box-shadow: var(--shadow-card-hover);
	}

	.card-face {
		width: 100%;
		height: 100%;
		background: var(--card-face);
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}
	.card-back {
		width: 100%;
		height: 100%;
		background: var(--card-back);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.back-pattern {
		width: 70%;
		height: 80%;
		border: 2px solid var(--card-back-accent);
		border-radius: 4px;
		background: repeating-linear-gradient(
			45deg,
			transparent,
			transparent 4px,
			var(--card-back-accent) 4px,
			var(--card-back-accent) 5px
		);
		opacity: 0.4;
	}

	.corner {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		line-height: 1;
		font-family: var(--font-main);
		color: var(--suit-black);
	}
	.corner.red { color: var(--suit-red); }
	.top-left { top: 4px; left: 6px; }
	.bottom-right { bottom: 4px; right: 6px; transform: rotate(180deg); }
	.rank { font-size: 14px; font-weight: bold; }
	.suit-small { font-size: 10px; }

	.pip {
		font-size: 32px;
		color: var(--suit-black);
	}
	.pip.red { color: var(--suit-red); }

	.card-sm .rank { font-size: 10px; }
	.card-sm .suit-small { font-size: 8px; }
	.card-sm .pip { font-size: 20px; }
	.card-lg .rank { font-size: 18px; }
	.card-lg .suit-small { font-size: 14px; }
	.card-lg .pip { font-size: 48px; }

	.edition-overlay {
		position: absolute;
		inset: 0;
		pointer-events: none;
		border-radius: var(--radius-card);
	}
	.edition-foil .edition-overlay {
		background: linear-gradient(135deg, transparent 30%, rgba(79, 140, 255, 0.3) 50%, transparent 70%);
		background-size: 200% 200%;
		animation: foilShine 3s ease-in-out infinite;
		box-shadow: inset 0 0 16px rgba(79, 140, 255, 0.2);
	}
	.edition-holo .edition-overlay {
		background: linear-gradient(135deg, transparent 20%, rgba(57, 217, 138, 0.25) 40%, transparent 60%);
		background-size: 300% 300%;
		animation: holoShine 3s ease-in-out infinite;
	}
	.edition-poly .edition-overlay {
		background: linear-gradient(135deg, #ff4d40aa, #f7b731aa, #39d98aaa, #3a86ffaa, #b14dffaa);
		background-size: 400% 400%;
		animation: polyShine 5s ease-in-out infinite;
		mix-blend-mode: overlay;
		opacity: 0.5;
	}
	.edition-negative .edition-overlay {
		background: rgba(177, 77, 255, 0.15);
		animation: negPulse 2s ease-in-out infinite;
		box-shadow: inset 0 0 20px rgba(177, 77, 255, 0.3);
	}

	@keyframes foilShine {
		0%, 100% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
	}
	@keyframes holoShine {
		0%, 100% { background-position: 0% 0%; }
		50% { background-position: 100% 100%; }
	}
	@keyframes polyShine {
		0%, 100% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
	}
	@keyframes negPulse {
		0%, 100% { opacity: 0.15; }
		50% { opacity: 0.3; }
	}
</style>
