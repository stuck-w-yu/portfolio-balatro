import { redirect } from '@sveltejs/kit';
import { asc, eq } from 'drizzle-orm';
import { db, schema } from '$lib/server/db/index.js';
import { invalidateContentCache, CONTENT_TTL_MS } from '$lib/server/content.js';
import { cached } from '$lib/server/cache.js';

export const load = async () => {
	const socials = await cached('content:admin:socials', CONTENT_TTL_MS, () =>
		db
			.select()
			.from(schema.socials)
			.orderBy(asc(schema.socials.sort), asc(schema.socials.id))
	);
	return { socials };
};

export const actions = {
	delete: async ({ request }) => {
		const form = await request.formData();
		const id = Number(form.get('id'));
		if (Number.isFinite(id)) await db.delete(schema.socials).where(eq(schema.socials.id, id));
		invalidateContentCache();
		throw redirect(303, '/admin/socials');
	}
};
