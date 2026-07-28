import type { Experience } from '$lib/types.js';

export const experiences: Experience[] = [
	{
		id: 'junior',
		type: 'small',
		role: 'Junior Developer',
		company: 'Startup ABC',
		period: '2020 — 2021',
		reward: '$3',
		icon: '◐',
		details: 'Membangun fitur front-end, belajar best practices, dan berkontribusi ke codebase utama. Fokus pada React dan REST API.'
	},
	{
		id: 'mid',
		type: 'big',
		role: 'Mid-Level Developer',
		company: 'Tech Corp',
		period: '2021 — 2023',
		reward: '$5',
		icon: '◑',
		details: 'Memimpin pengembangan modul, mentoring junior, dan arsitektur microservices. Migrasi dari monolith ke service-oriented.'
	},
	{
		id: 'senior',
		type: 'boss',
		role: 'Senior Dev / Lead',
		company: 'Digital Agency XYZ',
		period: '2023 — Now',
		reward: '$8',
		icon: '☠',
		details: 'Tech lead untuk tim 6 orang. Arsitektur sistem, code review, CI/CD, dan mentoring. Fokus pada SvelteKit dan cloud infrastructure.'
	}
];
