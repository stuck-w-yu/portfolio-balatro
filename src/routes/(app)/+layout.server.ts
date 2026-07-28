import { getPublicContent, getFallbackContent } from '$lib/server/content.js';

export const load = async () => {
	try {
		return { content: await getPublicContent(), dbOk: true };
	} catch (e) {
		// DB tak terjangkau (mis. firewall belum mengizinkan IP Vercel).
		// Tetap render situs dengan konten statis agar pengunjung tidak mendapat error 524/500.
		console.error('[db] gagal memuat konten, pakai fallback statis:', (e as Error)?.message ?? e);
		return { content: getFallbackContent(), dbOk: false };
	}
};
