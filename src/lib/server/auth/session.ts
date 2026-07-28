import { eq } from 'drizzle-orm';
import { randomBytes } from 'node:crypto';
import { db, schema } from '$lib/server/db/index.js';

const { sessions, users } = schema;

const SESSION_MS = 30 * 24 * 60 * 60 * 1000; // 30 hari
export const SESSION_COOKIE = 'session';

export async function createSession(userId: number) {
	const token = randomBytes(32).toString('hex');
	const expiresAt = new Date(Date.now() + SESSION_MS);
	await db.insert(sessions).values({ token, userId, expiresAt });
	return { token, expiresAt };
}

export async function getSessionUser(token: string | undefined | null) {
	if (!token) return null;
	const rows = await db.select().from(sessions).where(eq(sessions.token, token)).limit(1);
	const session = rows[0];
	if (!session) return null;

	if (session.expiresAt.getTime() < Date.now()) {
		await db.delete(sessions).where(eq(sessions.token, token));
		return null;
	}

	const u = await db.select().from(users).where(eq(users.id, session.userId)).limit(1);
	const user = u[0];
	return user ? { id: user.id, username: user.username } : null;
}

export async function deleteSession(token: string | undefined | null) {
	if (!token) return;
	await db.delete(sessions).where(eq(sessions.token, token));
}
