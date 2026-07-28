<script lang="ts">
	import ScreenShell from '$lib/components/ScreenShell.svelte';
	import BlindCard from '$lib/components/BlindCard.svelte';
	import DetailModal from '$lib/components/DetailModal.svelte';
	import type { Experience } from '$lib/types.js';

	let { experiences, onBack }: { experiences: Experience[]; onBack: () => void } = $props();

	let selectedExp: Experience | null = $state(null);
</script>

<ScreenShell id="blinds" title="E X P E R I E N C E" onBack={onBack}>
	<div class="blinds-row">
		{#each experiences as exp, i}
			<div class="blind-slot" style="animation-delay: {i * 100}ms">
				<BlindCard
					type={exp.type}
					title={`${exp.role}\n${exp.company}`}
					period={exp.period}
					reward={exp.reward}
					icon={exp.icon}
					onclick={() => selectedExp = exp}
				/>
			</div>
		{/each}
	</div>
	<p class="blinds-hint outline-text">Pilih Blind untuk melihat detail</p>
</ScreenShell>

<DetailModal
	open={selectedExp !== null}
	title={selectedExp ? `${selectedExp.role} — ${selectedExp.company}` : ''}
	onClose={() => selectedExp = null}
>
	{#if selectedExp}
		<p><strong>{selectedExp.period}</strong></p>
		<p>{selectedExp.details}</p>
		<p style="color: var(--money-gold); margin-top: var(--sp-3);">Reward: {selectedExp.reward}</p>
	{/if}
</DetailModal>

<style>
	.blinds-row {
		display: flex;
		gap: var(--sp-5);
		justify-content: center;
		align-items: flex-end;
		flex-wrap: wrap;
	}
	.blind-slot {
		animation: blindIn var(--dur-slow) var(--ease-spring) both;
	}
	.blinds-hint {
		margin-top: var(--sp-5);
		font-family: var(--font-small);
		font-size: var(--text-label);
		color: var(--text-dim);
		opacity: 0.6;
	}

	@keyframes blindIn {
		from { opacity: 0; transform: translateY(30px) scale(0.9); }
		to { opacity: 1; transform: translateY(0) scale(1); }
	}
</style>
