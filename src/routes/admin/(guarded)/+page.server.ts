import { sql } from 'drizzle-orm';
import { db, schema } from '$lib/server/db/index.js';
import { isDriveConnected } from '$lib/server/drive/index.js';

async function count(table: any): Promise<number> {
	const rows = await db.select({ n: sql<number>`count(*)::int` }).from(table);
	return Number(rows[0]?.n ?? 0);
}

export const load = async () => {
	const [projects, skills, experiences, socials] = await Promise.all([
		count(schema.projects),
		count(schema.skills),
		count(schema.experiences),
		count(schema.socials)
	]);
	const driveConnected = await isDriveConnected();
	return { counts: { projects, skills, experiences, socials }, driveConnected };
};
