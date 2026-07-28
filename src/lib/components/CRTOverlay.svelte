<script lang="ts">
	let { scanlines = true, vignette = true, noise = true, intensity = 1 }: {
		scanlines?: boolean;
		vignette?: boolean;
		noise?: boolean;
		intensity?: number;
	} = $props();
</script>

<div class="crt" style="--intensity: {intensity}">
	{#if scanlines}
		<div class="scanlines"></div>
	{/if}
	{#if vignette}
		<div class="vignette"></div>
	{/if}
	{#if noise}
		<div class="noise"></div>
	{/if}
</div>

<style>
	.crt {
		position: fixed;
		inset: 0;
		z-index: 9999;
		pointer-events: none;
	}
	.scanlines {
		position: absolute;
		inset: 0;
		background: repeating-linear-gradient(
			0deg,
			transparent,
			transparent 2px,
			rgba(0, 0, 0, 0.08) 2px,
			rgba(0, 0, 0, 0.08) 4px
		);
		opacity: var(--intensity);
	}
	.vignette {
		position: absolute;
		inset: 0;
		background: radial-gradient(ellipse at center, transparent 50%, rgba(0, 0, 0, 0.55) 100%);
	}
	.noise {
		position: absolute;
		inset: 0;
		opacity: calc(0.04 * var(--intensity));
		mix-blend-mode: overlay;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
		background-size: 256px 256px;
	}
</style>
