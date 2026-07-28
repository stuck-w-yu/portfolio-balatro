import { fail, redirect } from '@sveltejs/kit';
import { asc, eq } from 'drizzle-orm';
import { db, schema } from '$lib/server/db/index.js';
import { invalidateContentCache } from '$lib/server/content.js';
import { str } from '$lib/server/form-utils.js';

export const load = async () => {
	const rows = await db.select().from(schema.profile).limit(1);
	const profile = rows[0] ?? null;
	const stats = await db.select().from(schema.profileStats).orderBy(asc(schema.profileStats.sort));
	return {
		values: {
			name: profile?.name ?? '',
			alias: profile?.alias ?? '',
			role: profile?.role ?? '',
			location: profile?.location ?? '',
			bio: profile?.bio ?? '',
			avatar: profile?.avatar ?? ''
		},
		stats: stats.map((s) => ({ label: s.label, value: s.value }))
	};
};

export const actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const data = {
			name: str(form.get('name')).trim(),
			alias: str(form.get('alias')).trim(),
			role: str(form.get('role')).trim(),
			location: str(form.get('location')).trim(),
			bio: str(form.get('bio')).trim(),
			avatar: str(form.get('avatar')).trim()
		};
		if (!data.name) return fail(400, { error: 'Nama wajib diisi.', values: data });

		const existing = await db.select({ id: schema.profile.id }).from(schema.profile).limit(1);
		if (existing[0]) {
			await db.update(schema.profile).set(data).where(eq(schema.profile.id, existing[0].id));
		} else {
			await db.insert(schema.profile).values(data);
		}

		// Ganti seluruh stats dengan yang dikirim (baris kosong diabaikan).
		const labels = form.getAll('stat_label').map((x) => str(x).trim());
		const values = form.getAll('stat_value').map((x) => str(x).trim());
		const stats = labels
			.map((label, i) => ({ label, value: values[i] ?? '' }))
			.filter((s) => s.label || s.value);

		await db.delete(schema.profileStats);
		if (stats.length) {
			await db.insert(schema.profileStats).values(
				stats.map((s, i) => ({ label: s.label, value: s.value, sort: i }))
			);
		}

		invalidateContentCache();
		throw redirect(303, '/admin/profile?saved=1');
	}
};
