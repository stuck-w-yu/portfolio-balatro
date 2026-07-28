import { getPublicContent } from '$lib/server/content.js';

export const load = async () => {
	return { content: await getPublicContent() };
};
