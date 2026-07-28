import type { Skill } from '$lib/types.js';

export const skills: Skill[] = [
	{ id: 'svelte', label: 'Svelte', kind: 'chip', level: 5, note: 'Framework utama. SvelteKit + Svelte 5 runes.' },
	{ id: 'typescript', label: 'TypeScript', kind: 'chip', level: 4, note: 'Strict mode, generics, type-safe APIs.' },
	{ id: 'nodejs', label: 'Node.js', kind: 'mult', level: 4, note: 'Express, Fastify, serverless functions.' },
	{ id: 'css', label: 'CSS/Animation', kind: 'mult', level: 3, note: 'CSS Grid, Flexbox, keyframes, transitions.' },
	{ id: 'sql', label: 'SQL', kind: 'money', level: 3, note: 'PostgreSQL, query optimization, migrations.' },
	{ id: 'figma', label: 'Figma', kind: 'neutral', level: 2, note: 'UI design, prototyping, design systems.' }
];
