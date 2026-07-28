import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '$env/dynamic/private';
import * as schema from './schema.js';

function getUrl(): string {
	const url = env.DATABASE_URL;
	if (!url) throw new Error('DATABASE_URL tidak ditemukan di environment.');
	return url;
}

// prepare: false → aman untuk serverless / connection pooler (Vercel).
const client = postgres(getUrl(), { prepare: false, max: 1 });

export const db = drizzle(client, { schema });
export { schema };
