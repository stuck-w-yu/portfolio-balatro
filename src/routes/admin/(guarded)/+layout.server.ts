import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, url }) => {
	if (!locals.user) {
		const target = url.pathname + url.search;
		throw redirect(303, `/admin/login?redirect=${encodeURIComponent(target)}`);
	}
	return { user: locals.user };
};
