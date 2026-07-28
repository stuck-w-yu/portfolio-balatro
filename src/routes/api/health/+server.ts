import { json } from '@sveltejs/kit';
import { sql } from 'drizzle-orm';
import { db } from '$lib/server/db/index.js';

/**
 * Endpoint diagnostik: mengecek konektivitas database dari lingkungan runtime
 * (mis. dari server Vercel). Berguna untuk mendiagnosis error 524/timeout.
 * Contoh: GET /api/health
 */
export const GET = async () => {
	const start = Date.now();
	try {
		const rows = await db.execute(sql`select 1 as ok`);
		return json({
			db: 'ok',
			latencyMs: Date.now() - start,
			result: rows[0] ?? null
		});
	} catch (e) {
		return json(
			{
				db: 'error',
				latencyMs: Date.now() - start,
				error: (e as Error)?.message ?? String(e)
			},
			{ status: 200 }
		);
	}
};
