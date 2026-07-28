import { redirect } from '@sveltejs/kit';
import { deleteSession, SESSION_COOKIE } from '$lib/server/auth/session.js';

export const actions = {
	default: async ({ cookies, locals }) => {
		await deleteSession(locals.sessionToken);
		cookies.delete(SESSION_COOKIE, { path: '/' });
		throw redirect(303, '/admin/login');
	}
};
