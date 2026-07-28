import { redirect } from '@sveltejs/kit';
import { asc, eq } from 'drizzle-orm';
import { db, schema } from '$lib/server/db/index.js';
import { invalidateContentCache, CONTENT_TTL_MS } from '$lib/server/content.js';
import { cached } from '$lib/server/cache.js';

export const load = async () => {
	const skills = await cached('content:admin:skills', CONTENT_TTL_MS, () =>
		db
			.select()
			.from(schema.skills)
			.orderBy(asc(schema.skills.sort), asc(schema.skills.id))
	);
	return { skills };
};

export const actions = {
	delete: async ({ request }) => {
		const form = await request.formData();
		const id = Number(form.get('id'));
		if (Number.isFinite(id)) await db.delete(schema.skills).where(eq(schema.skills.id, id));
		invalidateContentCache();
		throw redirect(303, '/admin/skills');
	}
};
