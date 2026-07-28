import type { Handle } from '@sveltejs/kit';
import { getSessionUser, SESSION_COOKIE } from '$lib/server/auth/session.js';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get(SESSION_COOKIE) ?? null;
	event.locals.sessionToken = token;
	event.locals.user = await getSessionUser(token);
	return resolve(event);
};
