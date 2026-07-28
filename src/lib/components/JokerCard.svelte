<script lang="ts">
	import type { Rarity, Edition } from '$lib/types.js';

	let {
		title,
		art = '',
		rarity = 'common',
		edition = 'none',
		summary = '',
		tags = [],
		onclick
	}: {
		title: string;
		art?: string;
		rarity?: Rarity;
		edition?: Edition;
		summary?: string;
		tags?: string[];
		onclick?: () => void;
	} = $props();

	const rarityColors: Record<Rarity, string> = {
		common: 'var(--chip-blue)',
		rare: '#9b59b6',
		legendary: 'var(--money-gold)'
	};
	let bannerColor = $derived(rarityColors[rarity]);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="joker"
	class:edition-foil={edition === 'foil'}
	class:edition-holo={edition === 'holo'}
	class:edition-poly={edition === 'poly'}
	class:edition-negative={edition === 'negative'}
	onclick={onclick}
>
	<div class="art-area">
		{#if art}
			<img src={art} alt={title} class="pixelated" />
		{:else}
			<div class="art-placeholder">🃏</div>
		{/if}
	</div>
	<div class="banner" style="background: {bannerColor}">
		<span class="banner-text outline-text">{title}</span>
	</div>
	<div class="desc">
		<p class="summary">{summary}</p>
		{#if tags.length}
			<div class="tags">
				{#each tags as tag}
					<span class="tag">{tag}</span>
				{/each}
			</div>
		{/if}
	</div>
	{#if edition !== 'none'}
		<div class="edition-overlay"></div>
	{/if}
</div>

<style>
	.joker {
		position: relative;
		width: 160px;
		background: var(--card-face);
		border-radius: var(--radius-card);
		border: 2px solid var(--card-border);
		overflow: hidden;
		box-shadow: var(--shadow-card);
		cursor: pointer;
		transition: transform var(--dur-fast) var(--ease-out),
					box-shadow var(--dur-fast) var(--ease-out);
		flex-shrink: 0;
	}
	.joker:hover {
		transform: translateY(-12px) scale(1.08);
		box-shadow: var(--shadow-card-hover);
		z-index: 10;
	}

	.art-area {
		width: 100%;
		height: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--card-face-shade);
		overflow: hidden;
	}
	.art-area img {
		width: 80px;
		height: 80px;
		object-fit: contain;
	}
	.art-placeholder {
		font-size: 48px;
	}

	.banner {
		padding: var(--sp-1) var(--sp-2);
		text-align: center;
	}
	.banner-text {
		font-family: var(--font-main);
		font-size: var(--text-label);
		color: white;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.desc {
		padding: var(--sp-2);
		background: var(--card-face);
	}
	.summary {
		font-family: var(--font-small);
		font-size: var(--text-micro);
		color: var(--suit-black);
		text-align: center;
		margin-bottom: var(--sp-1);
	}
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 2px;
		justify-content: center;
	}
	.tag {
		font-family: var(--font-small);
		font-size: 8px;
		padding: 1px 4px;
		background: var(--surface);
		color: var(--text-dim);
		border-radius: var(--radius-badge);
	}

	.edition-overlay {
		position: absolute;
		inset: 0;
		pointer-events: none;
		border-radius: var(--radius-card);
	}
	.edition-foil .edition-overlay {
		background: linear-gradient(135deg, transparent 30%, rgba(79,140,255,0.25) 50%, transparent 70%);
		background-size: 200% 200%;
		animation: shine 3s ease-in-out infinite;
		box-shadow: inset 0 0 12px rgba(79,140,255,0.2);
	}
	.edition-holo .edition-overlay {
		background: linear-gradient(135deg, transparent 20%, rgba(57,217,138,0.2) 40%, transparent 60%);
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
		background: rgba(177,77,255,0.12);
		animation: pulse 2s ease-in-out infinite;
		box-shadow: inset 0 0 16px rgba(177,77,255,0.25);
	}
	@keyframes shine {
		0%, 100% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
	}
	@keyframes pulse {
		0%, 100% { opacity: 0.12; }
		50% { opacity: 0.25; }
	}
</style>
