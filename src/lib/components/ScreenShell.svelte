<script lang="ts">
	import BalatroButton from './BalatroButton.svelte';

	let {
		id,
		title = '',
		showBack = true,
		onBack,
		children
	}: {
		id: string;
		title?: string;
		showBack?: boolean;
		onBack?: () => void;
		children?: any;
	} = $props();
</script>

<section class="screen" data-screen={id}>
	{#if showBack || title}
		<div class="screen-header">
			{#if showBack}
				<BalatroButton variant="neutral" size="sm" onclick={onBack}>← Back</BalatroButton>
			{/if}
			{#if title}
				<h1 class="screen-title outline-text">{title}</h1>
			{/if}
		</div>
	{/if}
	<div class="screen-content">
		{@render children?.()}
	</div>
</section>

<style>
	.screen {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: var(--sp-4);
		animation: screenIn var(--dur-slow) var(--ease-in-out);
		overflow: hidden;
	}
	.screen-header {
		display: flex;
		align-items: center;
		gap: var(--sp-4);
		margin-bottom: var(--sp-4);
	}
	.screen-title {
		font-family: var(--font-main);
		font-size: var(--text-h1);
		color: var(--text);
		text-transform: uppercase;
		letter-spacing: 4px;
	}
	.screen-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	@keyframes screenIn {
		from { opacity: 0; transform: translateY(16px); }
		to { opacity: 1; transform: translateY(0); }
	}
</style>
