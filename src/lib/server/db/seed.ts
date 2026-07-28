/**
 * Seed database: membuat user admin default + seluruh konten awal.
 * Idempotent — aman dijalankan berulang.
 *
 * Jalankan: npm run db:seed  (setelah db:push / db:migrate)
 */
import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.js';
import { hashPassword } from '../auth/password.js';

// Data konten awal (sama dengan placeholder situs).
import { profile as profileData } from '../../data/profile.js';
import { projects as projectsData } from '../../data/projects.js';
import { skills as skillsData } from '../../data/skills.js';
import { experiences as experiencesData } from '../../data/experience.js';
import { socials as socialsData } from '../../data/socials.js';

try {
	process.loadEnvFile('.env');
} catch {
	/* env mungkin sudah tersedia di sistem */
}

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
	console.error('✗ DATABASE_URL tidak ditemukan. Periksa .env');
	process.exit(1);
}

// Kredensial admin default.
const DEFAULT_USER = process.env.SEED_USERNAME ?? 'stuckwyu';
const DEFAULT_PASS = process.env.SEED_PASSWORD ?? 'yu758690!';

const client = postgres(DATABASE_URL, { prepare: false, max: 1 });
const db = drizzle(client, { schema });

async function count(table: any): Promise<number> {
	const rows = await db.select({ n: sql<number>`count(*)::int` }).from(table);
	return Number(rows[0]?.n ?? 0);
}

async function seedUser() {
	const existing = await count(schema.users);
	if (existing > 0) {
		console.log('• User sudah ada, lewati.');
		return;
	}
	await db.insert(schema.users).values({
		username: DEFAULT_USER,
		passwordHash: hashPassword(DEFAULT_PASS)
	});
	console.log(`✓ User default dibuat: ${DEFAULT_USER}`);
}

async function seedProfile() {
	if ((await count(schema.profile)) > 0) {
		console.log('• Profile sudah ada, lewati.');
		return;
	}
	await db.insert(schema.profile).values({
		name: profileData.name,
		alias: profileData.alias,
		role: profileData.role,
		location: profileData.location,
		bio: profileData.bio,
		avatar: profileData.avatar
	});
	await db.insert(schema.profileStats).values(
		profileData.stats.map((s, i) => ({ label: s.label, value: s.value, sort: i }))
	);
	console.log('✓ Profile + stats dibuat.');
}

async function seedProjects() {
	if ((await count(schema.projects)) > 0) {
		console.log('• Projects sudah ada, lewati.');
		return;
	}
	await db.insert(schema.projects).values(
		projectsData.map((p, i) => ({
			key: p.id,
			title: p.title,
			art: p.art,
			rarity: p.rarity,
			edition: p.edition,
			summary: p.summary,
			description: p.description,
			tags: p.tags,
			links: p.links,
			impactChips: p.impact.chips,
			impactMult: p.impact.mult,
			sort: i
		}))
	);
	console.log(`✓ ${projectsData.length} projects dibuat.`);
}

async function seedSkills() {
	if ((await count(schema.skills)) > 0) {
		console.log('• Skills sudah ada, lewati.');
		return;
	}
	await db.insert(schema.skills).values(
		skillsData.map((s, i) => ({
			label: s.label,
			kind: s.kind,
			level: s.level,
			note: s.note,
			sort: i
		}))
	);
	console.log(`✓ ${skillsData.length} skills dibuat.`);
}

async function seedExperiences() {
	if ((await count(schema.experiences)) > 0) {
		console.log('• Experiences sudah ada, lewati.');
		return;
	}
	await db.insert(schema.experiences).values(
		experiencesData.map((e, i) => ({
			type: e.type,
			role: e.role,
			company: e.company,
			period: e.period,
			reward: e.reward,
			icon: e.icon,
			details: e.details,
			sort: i
		}))
	);
	console.log(`✓ ${experiencesData.length} experiences dibuat.`);
}

async function seedSocials() {
	if ((await count(schema.socials)) > 0) {
		console.log('• Socials sudah ada, lewati.');
		return;
	}
	await db.insert(schema.socials).values(
		socialsData.map((s, i) => ({
			label: s.label,
			url: s.url,
			icon: s.icon,
			price: s.price,
			sort: i
		}))
	);
	console.log(`✓ ${socialsData.length} socials dibuat.`);
}

async function main() {
	console.log('▶ Menjalankan seed...');
	await seedUser();
	await seedProfile();
	await seedProjects();
	await seedSkills();
	await seedExperiences();
	await seedSocials();
	console.log('✓ Seed selesai.');
}

main()
	.catch((err) => {
		console.error('✗ Seed gagal:', err);
		process.exitCode = 1;
	})
	.finally(async () => {
		await client.end();
	});
