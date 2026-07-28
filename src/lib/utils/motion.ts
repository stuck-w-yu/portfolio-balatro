export function tweenValue(
	from: number,
	to: number,
	duration: number,
	onUpdate: (v: number) => void,
	onDone?: () => void
) {
	const start = performance.now();
	function tick(now: number) {
		const elapsed = now - start;
		const t = Math.min(elapsed / duration, 1);
		const eased = 1 - Math.pow(1 - t, 3);
		onUpdate(from + (to - from) * eased);
		if (t < 1) requestAnimationFrame(tick);
		else onDone?.();
	}
	requestAnimationFrame(tick);
}
