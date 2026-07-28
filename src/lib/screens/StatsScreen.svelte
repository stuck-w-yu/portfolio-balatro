<script lang="ts">
	import ScreenShell from '$lib/components/ScreenShell.svelte';
	import PixelAvatar from '$lib/components/PixelAvatar.svelte';
	import ScoreDisplay from '$lib/components/ScoreDisplay.svelte';
	import StatBadge from '$lib/components/StatBadge.svelte';
	import type { Profile, Skill, Project } from '$lib/types.js';

	let {
		profile,
		skills,
		projects,
		onBack
	}: { profile: Profile; skills: Skill[]; projects: Project[]; onBack: () => void } = $props();

	let totalChips = $derived(projects.reduce((a, p) => a + p.impact.chips, 0));
	let totalMult = $derived(projects.reduce((a, p) => a + p.impact.mult, 0));
</script>

<ScreenShell id="stats" title="S T A T S" onBack={onBack}>
	<div class="stats-layout">
		<div class="about-panel">
			<div class="about-header">
				<PixelAvatar src={profile.avatar} size={64} />
				<div class="about-info">
					<h2 class="about-name outline-text">{profile.name}</h2>
					<p class="about-role">{profile.role}</p>
					<p class="about-loc">{profile.location}</p>
				</div>
			</div>
			<p class="about-bio">{profile.bio}</p>
			<div class="run-info">
				<h3 class="section-label outline-text">RUN INFO</h3>
				<div class="run-stats">
					{#each profile.stats as stat}
						<div class="run-stat">
							<span class="stat-label">{stat.label}</span>
							<span class="stat-val">{stat.value}</span>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<div class="score-panel">
			<div class="score-box">
				<h3 class="section-label outline-text">TOTAL IMPACT</h3>
				<ScoreDisplay chips={totalChips} mult={totalMult} />
			</div>

			<div class="skills-section">
				<h3 class="section-label outline-text">SKILLS</h3>
				<div class="skills-grid">
					{#each skills as skill}
						<StatBadge
							label={skill.label}
							value={skill.level}
							kind={skill.kind}
							level={skill.level}
						/>
					{/each}
				</div>
			</div>
		</div>
	</div>
</ScreenShell>

<style>
	.stats-layout {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--sp-5);
		width: 100%;
		max-width: 900px;
	}
	.about-panel, .score-panel {
		display: flex;
		flex-direction: column;
		gap: var(--sp-4);
	}
	.about-panel {
		background: var(--surface);
		border-radius: var(--radius-panel);
		padding: var(--sp-4);
		box-shadow: var(--shadow-panel);
	}
	.about-header {
		display: flex;
		gap: var(--sp-3);
		align-items: center;
	}
	.about-name {
		font-size: var(--text-h2);
		color: var(--text);
	}
	.about-role {
		font-family: var(--font-small);
		color: var(--text-dim);
		font-size: var(--text-label);
	}
	.about-loc {
		font-family: var(--font-small);
		color: var(--text-dim);
		font-size: var(--text-micro);
	}
	.about-bio {
		font-family: var(--font-small);
		font-size: var(--text-body);
		color: var(--text-dim);
		line-height: 1.5;
	}
	.section-label {
		font-size: var(--text-label);
		color: var(--text-dim);
		text-transform: uppercase;
		letter-spacing: 2px;
		margin-bottom: var(--sp-2);
	}
	.run-stats {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--sp-1);
	}
	.run-stat {
		display: flex;
		justify-content: space-between;
		font-family: var(--font-small);
		font-size: var(--text-label);
	}
	.stat-label { color: var(--text-dim); }
	.stat-val { color: var(--text); }

	.score-box {
		background: var(--surface);
		border-radius: var(--radius-panel);
		padding: var(--sp-4);
		box-shadow: var(--shadow-panel);
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.skills-grid {
		display: flex;
		flex-wrap: wrap;
		gap: var(--sp-2);
	}

	@media (max-width: 700px) {
		.stats-layout { grid-template-columns: 1fr; }
	}
</style>
