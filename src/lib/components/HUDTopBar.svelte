<script lang="ts">
	let {
		name = 'Wahyu Dev',
		ante = 'Ante 1 · Round 1',
		money = 12,
		muted = true,
		onMute,
		onSettings
	}: {
		name?: string;
		ante?: string;
		money?: number;
		muted?: boolean;
		onMute?: () => void;
		onSettings?: () => void;
	} = $props();
</script>

<header class="hud">
	<div class="hud-left">
		<span class="hud-name outline-text">{name}</span>
	</div>
	<div class="hud-center">
		<span class="hud-ante outline-text">{ante}</span>
	</div>
	<div class="hud-right">
		<span class="hud-money outline-text">${money}</span>
		<button class="hud-btn" onclick={onMute} aria-label={muted ? 'Unmute' : 'Mute'}>
			{muted ? '🔇' : '🔊'}
		</button>
		<button class="hud-btn" onclick={onSettings} aria-label="Settings">⚙</button>
	</div>
</header>

<style>
	.hud {
		position: relative;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--sp-2) var(--sp-4);
		background: var(--surface);
		border-bottom: 2px solid rgba(0, 0, 0, 0.3);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
		font-size: var(--text-label);
		text-transform: uppercase;
		letter-spacing: 1px;
	}
	.hud-left, .hud-center, .hud-right {
		display: flex;
		align-items: center;
		gap: var(--sp-3);
	}
	.hud-name { font-size: var(--text-body); color: var(--text); }
	.hud-ante { color: var(--text-dim); }
	.hud-money { color: var(--money-gold); font-size: var(--text-body); }
	.hud-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		border-radius: var(--radius-badge);
		background: var(--surface-2);
		font-size: 14px;
		transition: background var(--dur-fast) var(--ease-out);
	}
	.hud-btn:hover { background: var(--accent-2); }
</style>
