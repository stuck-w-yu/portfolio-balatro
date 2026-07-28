import type { Profile } from '$lib/types.js';

export const profile: Profile = {
	name: 'Wahyu Dev',
	alias: 'Card Slinger',
	role: 'Full-Stack Developer',
	location: 'Bandung, ID',
	bio: 'Membangun web interaktif yang menyenangkan. Pecinta kode bersih dan UI yang penuh "juice".',
	avatar: '/art/avatar.png',
	stats: [
		{ label: 'Rounds', value: '12' },
		{ label: 'Hands Played', value: '340' },
		{ label: 'Win Rate', value: '88%' },
		{ label: '$ Earned', value: '12k' }
	]
};
