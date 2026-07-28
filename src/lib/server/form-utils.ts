/** Helper parsing form admin. */

export function slugify(s: string): string {
	return (
		s
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '') || 'item'
	);
}

export function parseTags(input: string): string[] {
	return input
		.split(',')
		.map((t) => t.trim())
		.filter(Boolean);
}

/** Parse teks "Label | URL" per baris menjadi array link. */
export function parseLinks(input: string): { label: string; url: string }[] {
	return input
		.split('\n')
		.map((line) => line.trim())
		.filter(Boolean)
		.map((line) => {
			const parts = line.split('|').map((x) => x.trim());
			const label = parts[0] ?? '';
			const url = parts[1] ?? parts[0] ?? '';
			return { label, url };
		})
		.filter((l) => l.label || l.url);
}

export function linksToText(links: { label: string; url: string }[]): string {
	return links.map((l) => `${l.label} | ${l.url}`).join('\n');
}

export function toInt(v: unknown, fallback = 0): number {
	const n = parseInt(String(v ?? ''), 10);
	return Number.isFinite(n) ? n : fallback;
}

export function str(v: unknown): string {
	return typeof v === 'string' ? v : v == null ? '' : String(v);
}
