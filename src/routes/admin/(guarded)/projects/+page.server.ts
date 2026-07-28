import { redirect } from '@sveltejs/kit';
import { asc, eq } from 'drizzle-orm';
import { db, schema } from '$lib/server/db/index.js';

export const load = async () => {
	const projects = await db
		.select()
		.from(schema.projects)
		.orderBy(asc(schema.projects.sort), asc(schema.projects.id));
	return { projects };
};

export const actions = {
	delete: async ({ request }) => {
		const form = await request.formData();
		const id = Number(form.get('id'));
		if (Number.isFinite(id)) {
			await db.delete(schema.projects).where(eq(schema.projects.id, id));
		}
		throw redirect(303, '/admin/projects');
	}
};
