import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db, schema } from '$lib/server/db/index.js';
import { verifyPassword } from '$lib/server/auth/password.js';
import { createSession, SESSION_COOKIE } from '$lib/server/auth/session.js';

export const load = async ({ locals, url }) => {
	if (locals.user) throw redirect(303, '/admin');
	return { redirectTo: url.searchParams.get('redirect') ?? '/admin' };
};

export const actions = {
	default: async ({ request, cookies, url }) => {
		const form = await request.formData();
		const username = String(form.get('username') ?? '').trim();
		const password = String(form.get('password') ?? '');
		const redirectTo = String(form.get('redirect') ?? '/admin');

		const rows = await db
			.select()
			.from(schema.users)
			.where(eq(schema.users.username, username))
			.limit(1);
		const user = rows[0];

		if (!user || !verifyPassword(password, user.passwordHash)) {
			return fail(401, { error: 'Username atau password salah.', username });
		}

		const { token, expiresAt } = await createSession(user.id);
		cookies.set(SESSION_COOKIE, token, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: url.protocol === 'https:',
			expires: expiresAt
		});

		throw redirect(303, redirectTo);
	}
};
