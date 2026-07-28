<script lang="ts">
	import ScreenShell from '$lib/components/ScreenShell.svelte';
	import BalatroButton from '$lib/components/BalatroButton.svelte';
	import type { Social } from '$lib/types.js';

	let { socials, onBack }: { socials: Social[]; onBack: () => void } = $props();
</script>

<ScreenShell id="shop" title="S H O P" onBack={onBack}>
	<div class="shop-items">
		{#each socials as social, i}
			<div class="shop-item" style="animation-delay: {i * 60}ms">
				<div class="item-icon">{social.icon}</div>
				<div class="item-label outline-text">{social.label}</div>
				<div class="item-price">{social.price}</div>
				<a href={social.url} target="_blank" rel="noopener noreferrer">
					<BalatroButton variant="primary" size="sm">Buy / Go</BalatroButton>
				</a>
			</div>
		{/each}
	</div>

	<div class="cash-out">
		<a href="mailto:hello@wahyu.dev">
			<BalatroButton variant="success" size="lg">CASH OUT (Say Hi!)</BalatroButton>
		</a>
	</div>
</ScreenShell>

<style>
	.shop-items {
		display: flex;
		flex-wrap: wrap;
		gap: var(--sp-4);
		justify-content: center;
		margin-bottom: var(--sp-6);
	}
	.shop-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--sp-2);
		padding: var(--sp-4);
		background: var(--surface);
		border: 2px solid var(--surface-2);
		border-radius: var(--radius-panel);
		box-shadow: var(--shadow-panel);
		min-width: 140px;
		animation: shopIn var(--dur-slow) var(--ease-out) both;
	}
	.item-icon { font-size: 32px; }
	.item-label {
		font-family: var(--font-main);
		font-size: var(--text-body);
		color: var(--text);
		text-transform: uppercase;
	}
	.item-price {
		font-family: var(--font-small);
		font-size: var(--text-label);
		color: var(--money-gold);
	}
	.cash-out {
		display: flex;
		justify-content: center;
	}

	@keyframes shopIn {
		from { opacity: 0; transform: translateY(20px); }
		to { opacity: 1; transform: translateY(0); }
	}
</style>
