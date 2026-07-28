import { getPublicContent, getFallbackContent } from '$lib/server/content.js';

export const load = async ({ setHeaders }) => {
	// Cache HTML di CDN Vercel: dianggap segar 60 detik (s-maxage); hingga 10 menit
	// CDN tetap menyajikan versi lama secara instan sambil merevalidasi di latar
	// (stale-while-revalidate). Ini memotong delay cold start + DB remote untuk
	// hampir semua pengunjung (respons dilayani dari edge, tanpa function/DB).
	setHeaders({
		'cache-control': 'public, s-maxage=60, stale-while-revalidate=600'
	});
	try {
		return { content: await getPublicContent(), dbOk: true };
	} catch (e) {
		// DB tak terjangkau (mis. firewall belum mengizinkan IP Vercel).
		// Tetap render situs dengan konten statis agar pengunjung tidak mendapat error 524/500.
		console.error('[db] gagal memuat konten, pakai fallback statis:', (e as Error)?.message ?? e);
		return { content: getFallbackContent(), dbOk: false };
	}
};
