import type { ScreenId } from '$lib/types.js';

let screen: ScreenId = $state('menu');
let activeModal: string | null = $state(null);
let focusedIndex: number = $state(-1);
let reducedMotion: boolean = $state(false);

export function getAppState() {
	return {
		get screen() { return screen; },
		set screen(v: ScreenId) { screen = v; syncHash(v); },
		get activeModal() { return activeModal; },
		set activeModal(v: string | null) { activeModal = v; },
		get focusedIndex() { return focusedIndex; },
		set focusedIndex(v: number) { focusedIndex = v; },
		get reducedMotion() { return reducedMotion; },
		navigate(s: ScreenId) { screen = s; syncHash(s); },
		back() { screen = 'menu'; syncHash('menu'); },
		openModal(id: string) { activeModal = id; },
		closeModal() { activeModal = null; }
	};
}

function syncHash(s: ScreenId) {
	if (typeof window === 'undefined') return;
	window.location.hash = s === 'menu' ? '' : s;
}

export function initFromHash(): ScreenId {
	if (typeof window === 'undefined') return 'menu';
	const hash = window.location.hash.replace('#', '') as ScreenId;
	const valid: ScreenId[] = ['menu', 'projects', 'collection', 'stats', 'blinds', 'shop'];
	return valid.includes(hash) ? hash : 'menu';
}

export function initReducedMotion() {
	if (typeof window === 'undefined') return;
	const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
	reducedMotion = mq.matches;
	mq.addEventListener('change', (e) => { reducedMotion = e.matches; });
}
