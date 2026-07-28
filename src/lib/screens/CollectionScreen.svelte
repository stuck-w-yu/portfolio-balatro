<script lang="ts">
	import ScreenShell from '$lib/components/ScreenShell.svelte';
	import PlayingCard from '$lib/components/PlayingCard.svelte';
	import StatBadge from '$lib/components/StatBadge.svelte';
	import type { Suit, Rank, Project, Skill } from '$lib/types.js';

	let {
		projects,
		skills,
		onBack
	}: { projects: Project[]; skills: Skill[]; onBack: () => void } = $props();

	let filter: 'all' | 'projects' | 'skills' = $state('all');

	const suits: Suit[] = ['spade', 'heart', 'diamond', 'club'];
	const ranks: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

	let collectionCards = $derived(
		Array.from({ length: 16 }, (_, i) => ({
			suit: suits[i % 4],
			rank: ranks[i % 13]
		}))
	);

	let totalItems = $derived(projects.length + skills.length);
</script>

<ScreenShell id="collection" title="C O L L E C T I O N" onBack={onBack}>
	<div class="filter-bar">
		<button class="filter-btn" class:active={filter === 'all'} onclick={() => filter = 'all'}>All</button>
		<button class="filter-btn" class:active={filter === 'projects'} onclick={() => filter = 'projects'}>Projects</button>
		<button class="filter-btn" class:active={filter === 'skills'} onclick={() => filter = 'skills'}>Skills</button>
	</div>

	<div class="collection-grid">
		{#if filter !== 'skills'}
			{#each collectionCards.slice(0, projects.length) as card, i}
				<div class="card-slot" style="animation-delay: {i * 30}ms">
					<PlayingCard rank={card.rank} suit={card.suit} size="sm" />
				</div>
			{/each}
		{/if}
		{#if filter !== 'projects'}
			{#each skills as skill}
				<div class="card-slot">
					<StatBadge label={skill.label} kind={skill.kind} level={skill.level} />
				</div>
			{/each}
		{/if}
	</div>

	<p class="collection-count outline-text">Terkumpul: {totalItems} / 30</p>
</ScreenShell>

<style>
	.filter-bar {
		display: flex;
		gap: var(--sp-2);
		margin-bottom: var(--sp-4);
	}
	.filter-btn {
		padding: var(--sp-1) var(--sp-3);
		font-family: var(--font-main);
		font-size: var(--text-label);
		background: var(--surface);
		color: var(--text-dim);
		border-radius: var(--radius-btn);
		border: 1px solid var(--surface-2);
		text-transform: uppercase;
		transition: all var(--dur-fast) var(--ease-out);
	}
	.filter-btn:hover { background: var(--surface-2); }
	.filter-btn.active {
		background: var(--accent-2);
		color: var(--text);
		border-color: var(--accent-2);
	}

	.collection-grid {
		display: flex;
		flex-wrap: wrap;
		gap: var(--sp-2);
		justify-content: center;
		max-height: 60vh;
		overflow-y: auto;
		padding: var(--sp-2);
	}
	.card-slot {
		animation: fadeSlot var(--dur-base) var(--ease-out) both;
	}
	.collection-count {
		margin-top: var(--sp-4);
		font-size: var(--text-body);
		color: var(--text-dim);
	}

	@keyframes fadeSlot {
		from { opacity: 0; transform: scale(0.9); }
		to { opacity: 1; transform: scale(1); }
	}
</style>
