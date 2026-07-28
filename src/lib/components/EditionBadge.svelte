<script lang="ts">
	import type { Edition } from '$lib/types.js';

	let { edition = 'foil' }: { edition?: Edition } = $props();

	const editionLabels: Record<Edition, string> = {
		none: '',
		foil: 'FOIL',
		holo: 'HOLO',
		poly: 'POLYCHROME',
		negative: 'NEGATIVE'
	};

	const editionColors: Record<Edition, string> = {
		none: 'transparent',
		foil: 'var(--ed-foil)',
		holo: 'var(--ed-holo)',
		poly: 'var(--money-gold)',
		negative: 'var(--ed-negative)'
	};
</script>

{#if edition !== 'none'}
	<span class="edition-badge" style="--ec: {editionColors[edition]}">
		{editionLabels[edition]}
	</span>
{/if}

<style>
	.edition-badge {
		display: inline-block;
		padding: 1px 6px;
		font-family: var(--font-small);
		font-size: 8px;
		text-transform: uppercase;
		letter-spacing: 1px;
		color: var(--ec);
		border: 1px solid var(--ec);
		border-radius: var(--radius-badge);
		background: rgba(0, 0, 0, 0.3);
	}
</style>
