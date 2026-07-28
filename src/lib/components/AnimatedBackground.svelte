<script lang="ts">
	let { palette = ['#c0392b', '#3a86ff', '#6c3483', '#e67e22'], speed = 1, dim = 0.25 }: {
		palette?: string[];
		speed?: number;
		dim?: number;
	} = $props();
</script>

<div class="bg" style="--dim: {dim}; --speed: {30 / speed}s">
	{#each palette as color, i}
		<div
			class="blob"
			style="
				background: {color};
				--delay: {i * -7}s;
				--x: {20 + i * 20}%;
				--y: {30 + (i % 2) * 30}%;
			"
		></div>
	{/each}
	<div class="dim-overlay"></div>
</div>

<style>
	.bg {
		position: fixed;
		inset: 0;
		z-index: 0;
		overflow: hidden;
		background: var(--bg-deep);
	}
	.blob {
		position: absolute;
		width: 60vmax;
		height: 60vmax;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0.5;
		left: var(--x);
		top: var(--y);
		animation: swirl var(--speed) ease-in-out infinite var(--delay);
		will-change: transform;
	}
	.dim-overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, var(--dim));
	}
	@keyframes swirl {
		0%, 100% { transform: translate(0, 0) scale(1); }
		25% { transform: translate(10%, -15%) scale(1.1); }
		50% { transform: translate(-10%, 10%) scale(0.9); }
		75% { transform: translate(15%, 5%) scale(1.05); }
	}

	@media (prefers-reduced-motion: reduce) {
		.blob { animation: none; }
	}
</style>
