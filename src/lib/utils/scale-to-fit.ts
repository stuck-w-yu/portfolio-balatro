export function getScaleFactor(containerWidth: number, containerHeight: number) {
	const REF_W = 1280;
	const REF_H = 720;
	return Math.min(containerWidth / REF_W, containerHeight / REF_H);
}
