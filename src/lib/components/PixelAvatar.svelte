<script lang="ts">
	let {
		src = '',
		size = 96,
		frame = true
	}: {
		src?: string;
		size?: number;
		frame?: boolean;
	} = $props();
</script>

<div
	class="avatar"
	class:framed={frame}
	style="width: {size}px; height: {size}px;"
>
	{#if src}
		<img {src} alt="Avatar" class="avatar-img pixelated" style="width: {size}px; height: {size}px;" />
	{:else}
		<div class="avatar-placeholder" style="font-size: {size * 0.5}px;">🃏</div>
	{/if}
</div>

<style>
	.avatar {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		overflow: hidden;
		transition: transform var(--dur-fast) var(--ease-out);
	}
	.avatar:hover { transform: scale(1.05); }
	.framed {
		border: 3px solid var(--card-border);
		border-radius: var(--radius-card);
		background: var(--card-face);
		box-shadow: var(--shadow-card);
	}
	.avatar-img {
		display: block;
		object-fit: contain;
	}
	.avatar-placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}
</style>
