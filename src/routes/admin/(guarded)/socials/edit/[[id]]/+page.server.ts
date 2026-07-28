import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db, schema } from '$lib/server/db/index.js';
import { invalidateContentCache } from '$lib/server/content.js';
import { toInt, str } from '$lib/server/form-utils.js';

const EMPTY = { label: '', url: '', icon: '', price: '$0', sort: 0 };

function rowToValues(r: typeof schema.socials.$inferSelect) {
	return { label: r.label, url: r.url, icon: r.icon, price: r.price, sort: r.sort };
}

function readForm(form: FormData) {
	return {
		label: str(form.get('label')).trim(),
		url: str(form.get('url')).trim(),
		icon: str(form.get('icon')).trim(),
		price: str(form.get('price')).trim() || '$0',
		sort: toInt(form.get('sort'))
	};
}

export const load = async ({ params }) => {
	const id = params.id ? Number(params.id) : null;
	if (!id) return { id: null, values: EMPTY };
	const rows = await db.select().from(schema.socials).where(eq(schema.socials.id, id)).limit(1);
	if (!rows[0]) throw redirect(303, '/admin/socials');
	return { id, values: rowToValues(rows[0]) };
};

export const actions = {
	save: async ({ params, request }) => {
		const id = params.id ? Number(params.id) : null;
		const v = readForm(await request.formData());
		if (!v.label) return fail(400, { error: 'Nama platform wajib diisi.', values: v });
		if (id) await db.update(schema.socials).set(v).where(eq(schema.socials.id, id));
		else await db.insert(schema.socials).values(v);
		invalidateContentCache();
		throw redirect(303, '/admin/socials');
	},
	delete: async ({ params }) => {
		const id = params.id ? Number(params.id) : null;
		if (id) await db.delete(schema.socials).where(eq(schema.socials.id, id));
		invalidateContentCache();
		throw redirect(303, '/admin/socials');
	}
};
