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
// connect_timeout: gagal cepat (10s) bila DB tak terjangkau, agar tidak menggantung
// (yang memicu error 524 dari Cloudflare).
const client = postgres(getUrl(), {
	prepare: false,
	max: 1,
	connect_timeout: 10,
	idle_timeout: 20,
	max_lifetime: 60 * 30
});

export const db = drizzle(client, { schema });
export { schema };
