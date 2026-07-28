import { redirect } from '@sveltejs/kit';
import { exchangeCode, setRefreshToken } from '$lib/server/drive/oauth.js';

/** Callback OAuth Google. Path harus persis dengan GOOGLE_REDIRECT_URI. */
export const GET = async ({ url }) => {
	const code = url.searchParams.get('code');
	const gerr = url.searchParams.get('error');

	if (gerr || !code) {
		throw redirect(
			303,
			`/admin/settings?connected=0&error=${encodeURIComponent(gerr ?? 'no_code')}`
		);
	}

	let refreshToken: string | null | undefined;
	try {
		const tokens = await exchangeCode(code);
		refreshToken = tokens.refresh_token;
	} catch (e) {
		throw redirect(
			303,
			`/admin/settings?connected=0&error=${encodeURIComponent((e as Error)?.message ?? 'exchange_failed')}`
		);
	}

	if (!refreshToken) {
		throw redirect(303, '/admin/settings?connected=0&error=no_refresh_token');
	}

	await setRefreshToken(refreshToken);
	throw redirect(303, '/admin/settings?connected=1');
};
