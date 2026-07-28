import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db, schema } from '$lib/server/db/index.js';
import { toInt, str } from '$lib/server/form-utils.js';

const EMPTY = {
	type: 'small',
	role: '',
	company: '',
	period: '',
	reward: '',
	icon: '',
	details: '',
	sort: 0
};

function rowToValues(r: typeof schema.experiences.$inferSelect) {
	return {
		type: r.type,
		role: r.role,
		company: r.company,
		period: r.period,
		reward: r.reward,
		icon: r.icon,
		details: r.details,
		sort: r.sort
	};
}

function readForm(form: FormData) {
	return {
		type: str(form.get('type')) || 'small',
		role: str(form.get('role')).trim(),
		company: str(form.get('company')).trim(),
		period: str(form.get('period')).trim(),
		reward: str(form.get('reward')).trim(),
		icon: str(form.get('icon')).trim(),
		details: str(form.get('details')).trim(),
		sort: toInt(form.get('sort'))
	};
}

export const load = async ({ params }) => {
	const id = params.id ? Number(params.id) : null;
	if (!id) return { id: null, values: EMPTY };
	const rows = await db.select().from(schema.experiences).where(eq(schema.experiences.id, id)).limit(1);
	if (!rows[0]) throw redirect(303, '/admin/experiences');
	return { id, values: rowToValues(rows[0]) };
};

export const actions = {
	save: async ({ params, request }) => {
		const id = params.id ? Number(params.id) : null;
		const v = readForm(await request.formData());
		if (!v.role) return fail(400, { error: 'Peran wajib diisi.', values: v });
		if (id) await db.update(schema.experiences).set(v).where(eq(schema.experiences.id, id));
		else await db.insert(schema.experiences).values(v);
		throw redirect(303, '/admin/experiences');
	},
	delete: async ({ params }) => {
		const id = params.id ? Number(params.id) : null;
		if (id) await db.delete(schema.experiences).where(eq(schema.experiences.id, id));
		throw redirect(303, '/admin/experiences');
	}
};
