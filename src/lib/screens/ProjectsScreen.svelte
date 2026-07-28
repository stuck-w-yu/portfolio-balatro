<script lang="ts">
	import ScreenShell from '$lib/components/ScreenShell.svelte';
	import JokerCard from '$lib/components/JokerCard.svelte';
	import DetailModal from '$lib/components/DetailModal.svelte';
	import BalatroTooltip from '$lib/components/BalatroTooltip.svelte';
	import type { Project } from '$lib/types.js';

	let { projects, onBack }: { projects: Project[]; onBack: () => void } = $props();

	let selectedProject: Project | null = $state(null);
	let hoveredIndex: number = $state(-1);
</script>

<ScreenShell id="projects" title="P R O J E C T S" onBack={onBack}>
	<div class="projects-grid">
		{#each projects as project, i}
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="project-slot"
				role="group"
				style="animation-delay: {i * 60}ms"
				onmouseenter={() => hoveredIndex = i}
				onmouseleave={() => hoveredIndex = -1}
			>
				<JokerCard
					title={project.title}
					art={project.art}
					rarity={project.rarity}
					edition={project.edition}
					summary={project.summary}
					tags={project.tags}
					onclick={() => selectedProject = project}
				/>
				<BalatroTooltip
					visible={hoveredIndex === i}
					title={project.title}
					body={project.summary}
					stats={[
						{ label: 'Chips', value: String(project.impact.chips), color: 'var(--chip-blue)' },
						{ label: 'Mult', value: String(project.impact.mult), color: 'var(--mult-red)' }
					]}
				/>
			</div>
		{/each}
	</div>
</ScreenShell>

<DetailModal
	open={selectedProject !== null}
	title={selectedProject?.title ?? ''}
	onClose={() => selectedProject = null}
	actions={selectedProject?.links ?? []}
>
	{#if selectedProject}
		<p>{selectedProject.description}</p>
		<div class="modal-tags">
			{#each selectedProject.tags as tag}
				<span class="modal-tag">{tag}</span>
			{/each}
		</div>
	{/if}
</DetailModal>

<style>
	.projects-grid {
		display: flex;
		flex-wrap: wrap;
		gap: var(--sp-4);
		justify-content: center;
		align-items: flex-start;
	}
	.project-slot {
		position: relative;
		animation: dealIn var(--dur-slow) var(--ease-out) both;
	}
	.modal-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--sp-1);
		margin-top: var(--sp-3);
	}
	.modal-tag {
		padding: 2px 8px;
		background: var(--surface-2);
		border-radius: var(--radius-badge);
		font-family: var(--font-small);
		font-size: var(--text-label);
		color: var(--chip-blue);
	}

	@keyframes dealIn {
		from { opacity: 0; transform: translateY(40px) rotate(5deg); }
		to { opacity: 1; transform: translateY(0) rotate(0deg); }
	}
</style>
