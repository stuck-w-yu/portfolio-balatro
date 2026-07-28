import { google } from 'googleapis';
import { eq } from 'drizzle-orm';
import { env } from '$env/dynamic/private';
import { db, schema } from '$lib/server/db/index.js';

const { settings } = schema;

const SCOPES = ['https://www.googleapis.com/auth/drive'];
const REFRESH_KEY = 'google_refresh_token';

function cfg() {
	return {
		clientId: env.GOOGLE_CLIENT_ID ?? '',
		clientSecret: env.GOOGLE_CLIENT_SECRET ?? '',
		redirectUri: env.GOOGLE_REDIRECT_URI ?? '',
		folderRaw: env.GOOGLE_DRIVE_ROOT_FOLDER_ID ?? ''
	};
}

/** Ekstrak folder id dari URL Drive atau terima id mentah. */
export function getFolderId(): string {
	const raw = cfg().folderRaw.trim();
	const m = raw.match(/folders\/([A-Za-z0-9_-]+)/);
	if (m) return m[1];
	if (/^[A-Za-z0-9_-]+$/.test(raw)) return raw;
	return raw;
}

export function driveConfigured(): boolean {
	const c = cfg();
	return Boolean(c.clientId && c.clientSecret && c.redirectUri);
}

export function createOAuthClient() {
	const c = cfg();
	return new google.auth.OAuth2(c.clientId, c.clientSecret, c.redirectUri);
}

/** URL persetujuan (consent) Google — admin diarahkan ke sini untuk connect. */
export function buildAuthUrl(): string {
	const client = createOAuthClient();
	return client.generateAuthUrl({
		access_type: 'offline',
		prompt: 'consent',
		scope: SCOPES
	});
}

export async function exchangeCode(code: string) {
	const client = createOAuthClient();
	const { tokens } = await client.getToken(code);
	return tokens;
}

export async function getRefreshToken(): Promise<string | null> {
	const rows = await db.select().from(settings).where(eq(settings.key, REFRESH_KEY)).limit(1);
	return rows[0]?.value ?? null;
}

export async function setRefreshToken(token: string) {
	await db
		.insert(settings)
		.values({ key: REFRESH_KEY, value: token })
		.onConflictDoUpdate({ target: settings.key, set: { value: token } });
}

export async function clearRefreshToken() {
	await db.delete(settings).where(eq(settings.key, REFRESH_KEY));
}

/** OAuth2 client yang sudah ter-otorisasi (auto refresh oleh googleapis). */
export async function getAuthorizedClient() {
	const refresh = await getRefreshToken();
	if (!refresh) return null;
	const client = createOAuthClient();
	client.setCredentials({ refresh_token: refresh });
	return client;
}
