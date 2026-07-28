import type { Handle } from '@sveltejs/kit';
import { getSessionUser, SESSION_COOKIE } from '$lib/server/auth/session.js';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get(SESSION_COOKIE) ?? null;
	event.locals.sessionToken = token;
	try {
		event.locals.user = await getSessionUser(token);
	} catch (e) {
		// Jangan biarkan gangguan DB meruntuhkan seluruh request.
		console.error('[auth] gagal memvalidasi session:', (e as Error)?.message ?? e);
		event.locals.user = null;
	}
	return resolve(event);
};
