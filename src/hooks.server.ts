import type { Handle } from '@sveltejs/kit';
import { getSessionUser, SESSION_COOKIE } from '$lib/server/auth/session.js';

export const handle: Handle = async ({ event, resolve }) => {
	// Hanya sentuh cookie/DB untuk route admin. Route publik sengaja dibiarkan bebas
	// cookie agar responsnya bisa di-cache publik oleh CDN — SvelteKit menandai
	// respons "private" (tak cacheable CDN) bila `event.cookies` diakses.
	if (event.url.pathname.startsWith('/admin')) {
		const token = event.cookies.get(SESSION_COOKIE) ?? null;
		event.locals.sessionToken = token;
		try {
			event.locals.user = await getSessionUser(token);
		} catch (e) {
			// Jangan biarkan gangguan DB meruntuhkan seluruh request.
			console.error('[auth] gagal memvalidasi session:', (e as Error)?.message ?? e);
			event.locals.user = null;
		}
	} else {
		event.locals.sessionToken = null;
		event.locals.user = null;
	}

	return resolve(event);
};
