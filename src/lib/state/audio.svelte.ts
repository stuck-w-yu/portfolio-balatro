let muted: boolean = $state(true);
let volume: number = $state(0.5);

export function getAudioState() {
	return {
		get muted() { return muted; },
		set muted(v: boolean) { muted = v; persist(); },
		get volume() { return volume; },
		set volume(v: number) { volume = v; persist(); },
		toggle() { muted = !muted; persist(); },
		play(_id: string) {
			// ponytail: placeholder — implement with Web Audio when SFX assets exist
		}
	};
}

function persist() {
	if (typeof localStorage === 'undefined') return;
	localStorage.setItem('audio', JSON.stringify({ muted, volume }));
}

export function restoreAudio() {
	if (typeof localStorage === 'undefined') return;
	try {
		const saved = JSON.parse(localStorage.getItem('audio') || '{}');
		if (typeof saved.muted === 'boolean') muted = saved.muted;
		if (typeof saved.volume === 'number') volume = saved.volume;
	} catch { /* ignore */ }
}
