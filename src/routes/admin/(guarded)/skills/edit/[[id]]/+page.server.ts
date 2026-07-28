import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db, schema } from '$lib/server/db/index.js';
import { toInt, str } from '$lib/server/form-utils.js';

const EMPTY = { label: '', kind: 'chip', level: 0, note: '', sort: 0 };

function rowToValues(r: typeof schema.skills.$inferSelect) {
	return { label: r.label, kind: r.kind, level: r.level, note: r.note, sort: r.sort };
}

function readForm(form: FormData) {
	return {
		label: str(form.get('label')).trim(),
		kind: str(form.get('kind')) || 'chip',
		level: toInt(form.get('level')),
		note: str(form.get('note')).trim(),
		sort: toInt(form.get('sort'))
	};
}

export const load = async ({ params }) => {
	const id = params.id ? Number(params.id) : null;
	if (!id) return { id: null, values: EMPTY };
	const rows = await db.select().from(schema.skills).where(eq(schema.skills.id, id)).limit(1);
	if (!rows[0]) throw redirect(303, '/admin/skills');
	return { id, values: rowToValues(rows[0]) };
};

export const actions = {
	save: async ({ params, request }) => {
		const id = params.id ? Number(params.id) : null;
		const v = readForm(await request.formData());
		if (!v.label) return fail(400, { error: 'Nama skill wajib diisi.', values: v });
		if (id) await db.update(schema.skills).set(v).where(eq(schema.skills.id, id));
		else await db.insert(schema.skills).values(v);
		throw redirect(303, '/admin/skills');
	},
	delete: async ({ params }) => {
		const id = params.id ? Number(params.id) : null;
		if (id) await db.delete(schema.skills).where(eq(schema.skills.id, id));
		throw redirect(303, '/admin/skills');
	}
};
