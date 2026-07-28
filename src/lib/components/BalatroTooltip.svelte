<script lang="ts">
	let {
		title = '',
		body = '',
		stats = [],
		visible = false
	}: {
		title?: string;
		body?: string;
		stats?: { label: string; value: string; color?: string }[];
		visible?: boolean;
	} = $props();
</script>

{#if visible}
	<div class="tooltip">
		{#if title}
			<div class="tooltip-title outline-text">{title}</div>
		{/if}
		{#if body}
			<p class="tooltip-body">{body}</p>
		{/if}
		{#if stats.length}
			<div class="tooltip-stats">
				{#each stats as stat}
					<div class="stat-row">
						<span class="stat-label">{stat.label}</span>
						<span class="stat-value" style="color: {stat.color || 'var(--text)'}">{stat.value}</span>
					</div>
				{/each}
			</div>
		{/if}
	</div>
{/if}

<style>
	.tooltip {
		position: absolute;
		bottom: calc(100% + 8px);
		left: 50%;
		transform: translateX(-50%);
		background: var(--overlay-dark);
		border: 1px solid var(--surface-2);
		border-radius: var(--radius-panel);
		padding: var(--sp-3);
		min-width: 200px;
		max-width: 280px;
		z-index: 50;
		animation: tooltipIn var(--dur-fast) var(--ease-out);
		pointer-events: none;
	}
	.tooltip-title {
		font-family: var(--font-main);
		font-size: var(--text-body);
		color: var(--text);
		margin-bottom: var(--sp-1);
	}
	.tooltip-body {
		font-family: var(--font-small);
		font-size: var(--text-label);
		color: var(--text-dim);
		line-height: 1.4;
		margin-bottom: var(--sp-2);
	}
	.tooltip-stats {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.stat-row {
		display: flex;
		justify-content: space-between;
		font-family: var(--font-small);
		font-size: var(--text-micro);
	}
	.stat-label { color: var(--text-dim); }
	.stat-value { font-weight: bold; }

	@keyframes tooltipIn {
		from { opacity: 0; transform: translateX(-50%) translateY(4px) scale(0.95); }
		to { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
	}
</style>
