import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db, schema } from '$lib/server/db/index.js';
import { downloadFromDrive } from '$lib/server/drive/index.js';

/** Proxy gambar privat dari Google Drive (tanpa auth publik, server yang mengambil). */
export const GET = async ({ params }) => {
	const id = Number(params.id);
	if (!Number.isFinite(id)) throw error(404, 'Not found');

	const rows = await db.select().from(schema.images).where(eq(schema.images.id, id)).limit(1);
	const img = rows[0];
	if (!img) throw error(404, 'Not found');

	try {
		const buffer = await downloadFromDrive(img.driveFileId);
		return new Response(new Uint8Array(buffer), {
			headers: {
				'Content-Type': img.contentType || 'application/octet-stream',
				'Cache-Control': 'public, max-age=31536000, immutable',
				ETag: `"${img.driveFileId}"`
			}
		});
	} catch {
		throw error(502, 'Gagal mengambil gambar dari Drive');
	}
};
