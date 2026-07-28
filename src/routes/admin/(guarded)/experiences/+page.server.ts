import { redirect } from '@sveltejs/kit';
import { asc, eq } from 'drizzle-orm';
import { db, schema } from '$lib/server/db/index.js';
import { invalidateContentCache, CONTENT_TTL_MS } from '$lib/server/content.js';
import { cached } from '$lib/server/cache.js';

export const load = async () => {
	const experiences = await cached('content:admin:experiences', CONTENT_TTL_MS, () =>
		db
			.select()
			.from(schema.experiences)
			.orderBy(asc(schema.experiences.sort), asc(schema.experiences.id))
	);
	return { experiences };
};

export const actions = {
	delete: async ({ request }) => {
		const form = await request.formData();
		const id = Number(form.get('id'));
		if (Number.isFinite(id)) await db.delete(schema.experiences).where(eq(schema.experiences.id, id));
		invalidateContentCache();
		throw redirect(303, '/admin/experiences');
	}
};
