import { redirect } from '@sveltejs/kit';
import { asc, eq } from 'drizzle-orm';
import { db, schema } from '$lib/server/db/index.js';

export const load = async () => {
	const experiences = await db
		.select()
		.from(schema.experiences)
		.orderBy(asc(schema.experiences.sort), asc(schema.experiences.id));
	return { experiences };
};

export const actions = {
	delete: async ({ request }) => {
		const form = await request.formData();
		const id = Number(form.get('id'));
		if (Number.isFinite(id)) await db.delete(schema.experiences).where(eq(schema.experiences.id, id));
		throw redirect(303, '/admin/experiences');
	}
};
