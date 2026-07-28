import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db, schema } from '$lib/server/db/index.js';
import { slugify, parseTags, parseLinks, linksToText, toInt, str } from '$lib/server/form-utils.js';

const EMPTY = {
	title: '',
	art: '',
	rarity: 'common',
	edition: 'none',
	summary: '',
	description: '',
	tagsText: '',
	linksText: '',
	impactChips: 0,
	impactMult: 0,
	sort: 0
};

function rowToValues(r: typeof schema.projects.$inferSelect) {
	return {
		title: r.title,
		art: r.art,
		rarity: r.rarity,
		edition: r.edition,
		summary: r.summary,
		description: r.description,
		tagsText: (r.tags ?? []).join(', '),
		linksText: linksToText(r.links ?? []),
		impactChips: r.impactChips,
		impactMult: r.impactMult,
		sort: r.sort
	};
}

function readForm(form: FormData) {
	return {
		title: str(form.get('title')).trim(),
		art: str(form.get('art')).trim(),
		rarity: str(form.get('rarity')) || 'common',
		edition: str(form.get('edition')) || 'none',
		summary: str(form.get('summary')).trim(),
		description: str(form.get('description')).trim(),
		tagsText: str(form.get('tags')),
		linksText: str(form.get('links')),
		impactChips: toInt(form.get('impactChips')),
		impactMult: toInt(form.get('impactMult')),
		sort: toInt(form.get('sort'))
	};
}

function toRow(v: ReturnType<typeof readForm>) {
	return {
		title: v.title,
		art: v.art,
		rarity: v.rarity,
		edition: v.edition,
		summary: v.summary,
		description: v.description,
		tags: parseTags(v.tagsText),
		links: parseLinks(v.linksText),
		impactChips: v.impactChips,
		impactMult: v.impactMult,
		sort: v.sort
	};
}

export const load = async ({ params }) => {
	const id = params.id ? Number(params.id) : null;
	if (!id) return { id: null, values: EMPTY };
	const rows = await db.select().from(schema.projects).where(eq(schema.projects.id, id)).limit(1);
	const row = rows[0];
	if (!row) throw redirect(303, '/admin/projects');
	return { id, values: rowToValues(row) };
};

export const actions = {
	save: async ({ params, request }) => {
		const id = params.id ? Number(params.id) : null;
		const v = readForm(await request.formData());
		if (!v.title) return fail(400, { error: 'Judul wajib diisi.', values: v });

		const row = toRow(v);
		if (id) {
			await db.update(schema.projects).set(row).where(eq(schema.projects.id, id));
		} else {
			let key = slugify(v.title);
			const dup = await db
				.select({ id: schema.projects.id })
				.from(schema.projects)
				.where(eq(schema.projects.key, key))
				.limit(1);
			if (dup.length) key = `${key}-${Date.now().toString(36)}`;
			await db.insert(schema.projects).values({ ...row, key });
		}
		throw redirect(303, '/admin/projects');
	},
	delete: async ({ params }) => {
		const id = params.id ? Number(params.id) : null;
		if (id) await db.delete(schema.projects).where(eq(schema.projects.id, id));
		throw redirect(303, '/admin/projects');
	}
};
