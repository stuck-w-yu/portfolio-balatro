<script lang="ts">
	import { tweenValue } from '$lib/utils/motion.js';
	import { onMount } from 'svelte';

	let {
		amount = 0,
		animate = true,
		size = 'md'
	}: {
		amount?: number;
		animate?: boolean;
		size?: 'sm' | 'md' | 'lg';
	} = $props();

	let display = $state(0);

	onMount(() => {
		if (animate) {
			tweenValue(0, amount, 600, (v) => { display = Math.round(v); });
		} else {
			display = amount;
		}
	});
</script>

<span class="money money-{size} outline-text">${display}</span>

<style>
	.money {
		font-family: var(--font-main);
		color: var(--money-gold);
		display: inline-block;
	}
	.money-sm { font-size: var(--text-label); }
	.money-md { font-size: var(--text-body); }
	.money-lg { font-size: var(--text-h1); }
</style>
