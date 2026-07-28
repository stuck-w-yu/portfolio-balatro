<script lang="ts">
	import { tweenValue } from '$lib/utils/motion.js';
	import { onMount } from 'svelte';

	let {
		chips = 0,
		mult = 0,
		animate = true,
		showTotal = true
	}: {
		chips?: number;
		mult?: number;
		animate?: boolean;
		showTotal?: boolean;
	} = $props();

	let displayChips = $state(0);
	let displayMult = $state(0);
	let popping = $state(false);

	onMount(() => {
		if (animate) {
			tweenValue(0, chips, 800, (v) => { displayChips = Math.round(v); });
			tweenValue(0, mult, 800, (v) => { displayMult = Math.round(v); }, () => {
				popping = true;
				setTimeout(() => { popping = false; }, 300);
			});
		} else {
			displayChips = chips;
			displayMult = mult;
		}
	});
</script>

<div class="score" class:popping>
	<span class="chips outline-text">{displayChips}</span>
	<span class="x outline-text">×</span>
	<span class="mult outline-text">{displayMult}</span>
	{#if showTotal}
		<span class="eq outline-text">=</span>
		<span class="total outline-text">{displayChips * displayMult}</span>
	{/if}
</div>

<style>
	.score {
		display: flex;
		align-items: center;
		gap: var(--sp-2);
		font-family: var(--font-main);
		font-size: var(--text-h1);
		transition: transform 0.2s var(--ease-spring);
	}
	.popping { transform: scale(1.15); }
	.chips { color: var(--chip-blue); }
	.x { color: var(--text-dim); font-size: var(--text-h2); }
	.mult { color: var(--mult-red); }
	.eq { color: var(--text-dim); font-size: var(--text-h2); }
	.total { color: var(--score-white); font-size: var(--text-h1); }
</style>
