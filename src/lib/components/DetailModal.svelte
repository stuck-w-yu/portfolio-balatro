<script lang="ts">
	import BalatroButton from './BalatroButton.svelte';

	let {
		open = false,
		title = '',
		onClose,
		actions = [],
		children
	}: {
		open?: boolean;
		title?: string;
		onClose?: () => void;
		actions?: { label: string; url: string }[];
		children?: any;
	} = $props();

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') onClose?.();
	}
</script>

<svelte:window onkeydown={open ? handleKeydown : undefined} />

{#if open}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="scrim" onclick={onClose}>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="modal" onclick={(e) => e.stopPropagation()}>
			<div class="modal-header">
				<h2 class="modal-title outline-text">{title}</h2>
				<button class="close-btn" onclick={onClose} aria-label="Close">✕</button>
			</div>
			<div class="modal-body">
				{@render children?.()}
			</div>
			{#if actions.length}
				<div class="modal-actions">
					{#each actions as action}
						<a href={action.url} target="_blank" rel="noopener noreferrer">
							<BalatroButton variant="primary" size="sm">{action.label}</BalatroButton>
						</a>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.scrim {
		position: fixed;
		inset: 0;
		z-index: 200;
		background: var(--overlay-dark);
		display: flex;
		align-items: center;
		justify-content: center;
		animation: fadeIn 0.2s ease;
	}
	.modal {
		background: var(--surface);
		border: 2px solid var(--surface-2);
		border-radius: var(--radius-panel);
		box-shadow: var(--shadow-panel);
		padding: var(--sp-5);
		max-width: 500px;
		width: 90%;
		max-height: 80vh;
		overflow-y: auto;
		animation: modalIn 0.25s var(--ease-spring);
	}
	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--sp-4);
	}
	.modal-title {
		font-family: var(--font-main);
		font-size: var(--text-h2);
		color: var(--text);
	}
	.close-btn {
		width: 32px;
		height: 32px;
		border-radius: var(--radius-badge);
		background: var(--surface-2);
		color: var(--text);
		font-size: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background var(--dur-fast);
	}
	.close-btn:hover { background: var(--mult-red); }
	.modal-body {
		font-family: var(--font-small);
		font-size: var(--text-body);
		color: var(--text-dim);
		line-height: 1.5;
		margin-bottom: var(--sp-4);
	}
	.modal-actions {
		display: flex;
		gap: var(--sp-2);
		flex-wrap: wrap;
	}

	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}
	@keyframes modalIn {
		from { opacity: 0; transform: scale(0.9); }
		to { opacity: 1; transform: scale(1); }
	}
</style>
