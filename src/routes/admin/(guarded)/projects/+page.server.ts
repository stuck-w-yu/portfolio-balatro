import { redirect } from '@sveltejs/kit';
import { asc, eq } from 'drizzle-orm';
import { db, schema } from '$lib/server/db/index.js';
import { invalidateContentCache, CONTENT_TTL_MS } from '$lib/server/content.js';
import { cached } from '$lib/server/cache.js';

export const load = async () => {
	const projects = await cached('content:admin:projects', CONTENT_TTL_MS, () =>
		db
			.select()
			.from(schema.projects)
			.orderBy(asc(schema.projects.sort), asc(schema.projects.id))
	);
	return { projects };
};

export const actions = {
	delete: async ({ request }) => {
		const form = await request.formData();
		const id = Number(form.get('id'));
		if (Number.isFinite(id)) {
			await db.delete(schema.projects).where(eq(schema.projects.id, id));
		}
		invalidateContentCache();
		throw redirect(303, '/admin/projects');
	}
};
