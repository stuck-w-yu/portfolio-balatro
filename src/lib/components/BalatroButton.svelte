<script lang="ts">
	import type { ButtonVariant } from '$lib/types.js';

	let {
		variant = 'neutral',
		size = 'md',
		disabled = false,
		fullWidth = false,
		onclick,
		children
	}: {
		variant?: ButtonVariant;
		size?: 'sm' | 'md' | 'lg';
		disabled?: boolean;
		fullWidth?: boolean;
		onclick?: (e: MouseEvent) => void;
		children?: any;
	} = $props();

	const colors: Record<ButtonVariant, { face: string; edge: string; text: string }> = {
		primary: { face: 'var(--btn-blue)', edge: 'var(--btn-blue-edge)', text: 'var(--btn-text-light)' },
		danger: { face: 'var(--btn-red)', edge: 'var(--btn-red-edge)', text: 'var(--btn-text-light)' },
		success: { face: 'var(--btn-green)', edge: 'var(--btn-green-edge)', text: 'var(--btn-text-light)' },
		neutral: { face: 'var(--btn-tan)', edge: 'var(--btn-tan-edge)', text: 'var(--btn-text)' }
	};

	let c = $derived(colors[variant]);
</script>

<button
	class="btn btn-{size}"
	class:full-width={fullWidth}
	{disabled}
	style="
		--face: {c.face};
		--edge: {c.edge};
		--txt: {c.text};
	"
	onclick={onclick}
>
	{@render children?.()}
</button>

<style>
	.btn {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--sp-2);
		font-family: var(--font-main);
		font-weight: normal;
		color: var(--txt);
		background: var(--face);
		border-radius: var(--radius-btn);
		box-shadow: 0 4px 0 var(--edge);
		text-transform: uppercase;
		letter-spacing: 1px;
		transition: transform var(--dur-fast) var(--ease-out),
					box-shadow var(--dur-fast) var(--ease-out),
					filter var(--dur-fast) var(--ease-out);
		text-shadow: -1px -1px 0 rgba(0,0,0,0.2), 1px 1px 0 rgba(0,0,0,0.2);
		cursor: pointer;
		user-select: none;
	}
	.btn-sm { padding: var(--sp-1) var(--sp-3); font-size: var(--text-label); }
	.btn-md { padding: var(--sp-2) var(--sp-5); font-size: var(--text-body); }
	.btn-lg { padding: var(--sp-3) var(--sp-6); font-size: var(--text-h2); }
	.full-width { width: 100%; }

	.btn:hover:not(:disabled) {
		transform: scale(1.03) translateY(-1px);
		filter: brightness(1.1);
		box-shadow: 0 6px 0 var(--edge);
	}
	.btn:active:not(:disabled) {
		transform: translateY(3px);
		box-shadow: 0 1px 0 var(--edge);
	}
	.btn:disabled {
		opacity: 0.5;
		filter: saturate(0.3);
		cursor: not-allowed;
	}
</style>
