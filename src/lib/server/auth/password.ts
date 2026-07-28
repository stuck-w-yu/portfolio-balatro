import { scryptSync, randomBytes, timingSafeEqual } from 'node:crypto';

/** Hash password dengan scrypt. Format: `<saltHex>:<hashHex>`. */
export function hashPassword(password: string): string {
	const salt = randomBytes(16).toString('hex');
	const hash = scryptSync(password, salt, 64).toString('hex');
	return `${salt}:${hash}`;
}

/** Verifikasi password terhadap hash tersimpan (constant-time). */
export function verifyPassword(password: string, stored: string): boolean {
	const [salt, hash] = stored.split(':');
	if (!salt || !hash) return false;
	const storedBuf = Buffer.from(hash, 'hex');
	const testBuf = scryptSync(password, salt, storedBuf.length);
	return testBuf.length === storedBuf.length && timingSafeEqual(testBuf, storedBuf);
}
