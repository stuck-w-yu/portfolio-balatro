import { asc } from 'drizzle-orm';
import { db, schema } from '$lib/server/db/index.js';
import type { Profile, Project, Skill, Experience, Social } from '$lib/types.js';

const { profile, profileStats, projects, skills, experiences, socials } = schema;

export async function getProfile(): Promise<Profile | null> {
	const rows = await db.select().from(profile).limit(1);
	const p = rows[0];
	if (!p) return null;
	const stats = await db.select().from(profileStats).orderBy(asc(profileStats.sort));
	return {
		name: p.name,
		alias: p.alias,
		role: p.role,
		location: p.location,
		bio: p.bio,
		avatar: p.avatar,
		stats: stats.map((s) => ({ label: s.label, value: s.value }))
	};
}

export async function getProjects(): Promise<Project[]> {
	const rows = await db.select().from(projects).orderBy(asc(projects.sort), asc(projects.id));
	return rows.map((r) => ({
		id: r.key,
		title: r.title,
		art: r.art,
		rarity: r.rarity as Project['rarity'],
		edition: r.edition as Project['edition'],
		summary: r.summary,
		description: r.description,
		tags: r.tags ?? [],
		links: r.links ?? [],
		impact: { chips: r.impactChips, mult: r.impactMult }
	}));
}

export async function getSkills(): Promise<Skill[]> {
	const rows = await db.select().from(skills).orderBy(asc(skills.sort), asc(skills.id));
	return rows.map((r) => ({
		id: String(r.id),
		label: r.label,
		kind: r.kind as Skill['kind'],
		level: r.level,
		note: r.note
	}));
}

export async function getExperiences(): Promise<Experience[]> {
	const rows = await db.select().from(experiences).orderBy(asc(experiences.sort), asc(experiences.id));
	return rows.map((r) => ({
		id: String(r.id),
		type: r.type as Experience['type'],
		role: r.role,
		company: r.company,
		period: r.period,
		reward: r.reward,
		icon: r.icon,
		details: r.details
	}));
}

export async function getSocials(): Promise<Social[]> {
	const rows = await db.select().from(socials).orderBy(asc(socials.sort), asc(socials.id));
	return rows.map((r) => ({
		id: String(r.id),
		label: r.label,
		url: r.url,
		icon: r.icon,
		price: r.price
	}));
}

export interface PublicContent {
	profile: Profile;
	projects: Project[];
	skills: Skill[];
	experiences: Experience[];
	socials: Social[];
}

/** Profil fallback bila database belum di-seed. */
export const FALLBACK_PROFILE: Profile = {
	name: 'Wahyu Dev',
	alias: 'Card Slinger',
	role: 'Full-Stack Developer',
	location: 'Bandung, ID',
	bio: 'Konten belum tersedia. Jalankan seed pada CMS.',
	avatar: '',
	stats: []
};

export async function getPublicContent(): Promise<PublicContent> {
	const [prof, projs, sk, exp, soc] = await Promise.all([
		getProfile(),
		getProjects(),
		getSkills(),
		getExperiences(),
		getSocials()
	]);
	return {
		profile: prof ?? FALLBACK_PROFILE,
		projects: projs,
		skills: sk,
		experiences: exp,
		socials: soc
	};
}
