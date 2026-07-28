import type { Project } from '$lib/types.js';

export const projects: Project[] = [
	{
		id: 'ecommerce',
		title: 'E-Commerce Platform',
		art: '/art/project-ecommerce.png',
		rarity: 'rare',
		edition: 'foil',
		summary: '+30 Mult saat deploy ke production',
		description: 'Platform e-commerce full-stack dengan keranjang belanja, pembayaran, dan dashboard admin. Dibangun dengan SvelteKit dan PostgreSQL.',
		tags: ['SvelteKit', 'TypeScript', 'PostgreSQL', 'Stripe'],
		links: [
			{ label: 'Repo', url: '#' },
			{ label: 'Live Demo', url: '#' }
		],
		impact: { chips: 120, mult: 30 }
	},
	{
		id: 'chat',
		title: 'Realtime Chat',
		art: '/art/project-chat.png',
		rarity: 'common',
		edition: 'none',
		summary: '+15 Chips untuk setiap pesan terkirim',
		description: 'Aplikasi chat realtime dengan WebSocket, fitur room, dan notifikasi push.',
		tags: ['Node.js', 'Socket.io', 'Redis', 'React'],
		links: [
			{ label: 'Repo', url: '#' }
		],
		impact: { chips: 80, mult: 15 }
	},
	{
		id: 'dashboard',
		title: 'Analytics Dashboard',
		art: '/art/project-dashboard.png',
		rarity: 'common',
		edition: 'holo',
		summary: '+$8 untuk setiap metrik yang divisualisasikan',
		description: 'Dashboard analitik interaktif dengan grafik realtime, filter, dan export data.',
		tags: ['Vue.js', 'D3.js', 'Express', 'MongoDB'],
		links: [
			{ label: 'Repo', url: '#' },
			{ label: 'Live Demo', url: '#' }
		],
		impact: { chips: 100, mult: 20 }
	},
	{
		id: 'game-engine',
		title: 'Mini Game Engine',
		art: '/art/project-game.png',
		rarity: 'legendary',
		edition: 'poly',
		summary: 'X3 Mult untuk semua project lain',
		description: 'Game engine ringan berbasis Canvas/WebGL untuk game 2D. Mendukung sprite, physics, dan input system.',
		tags: ['TypeScript', 'WebGL', 'Canvas', 'ECS'],
		links: [
			{ label: 'Repo', url: '#' },
			{ label: 'Play Demo', url: '#' }
		],
		impact: { chips: 250, mult: 50 }
	}
];
