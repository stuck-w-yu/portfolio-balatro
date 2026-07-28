import { redirect } from '@sveltejs/kit';
import {
	buildAuthUrl,
	driveConfigured,
	getFolderId,
	getRefreshToken,
	clearRefreshToken
} from '$lib/server/drive/oauth.js';

export const load = async ({ url }) => {
	const connected = (await getRefreshToken()) !== null;
	const configured = driveConfigured();
	return {
		connected,
		configured,
		authUrl: configured ? buildAuthUrl() : '',
		folderId: getFolderId(),
		flag: url.searchParams.get('connected'),
		disconnected: url.searchParams.get('disconnected'),
		error: url.searchParams.get('error')
	};
};

export const actions = {
	disconnect: async () => {
		await clearRefreshToken();
		throw redirect(303, '/admin/settings?disconnected=1');
	}
};
