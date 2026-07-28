import { error, json } from '@sveltejs/kit';
import { db, schema } from '$lib/server/db/index.js';
import { uploadToDrive } from '$lib/server/drive/index.js';

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

/** Upload gambar ke Google Drive (privat) → simpan metadata → return URL proxy. */
export const POST = async ({ request, locals }) => {
	if (!locals.user) throw error(401, 'Unauthorized');

	let form: FormData;
	try {
		form = await request.formData();
	} catch {
		throw error(400, 'Invalid form data');
	}

	const file = form.get('file');
	if (!(file instanceof File)) throw error(400, 'File tidak ditemukan');
	if (!file.type.startsWith('image/')) throw error(400, 'Hanya file gambar yang diperbolehkan');
	if (file.size > MAX_BYTES) throw error(413, 'Ukuran gambar maksimal 8MB');

	const buffer = Buffer.from(await file.arrayBuffer());

	let driveFileId: string;
	try {
		driveFileId = await uploadToDrive(buffer, file.name || 'upload', file.type);
	} catch (e) {
		throw error(502, (e as Error).message || 'Gagal upload ke Drive');
	}

	const rows = await db
		.insert(schema.images)
		.values({
			driveFileId,
			filename: file.name || 'upload',
			contentType: file.type,
			size: file.size
		})
		.returning();
	const img = rows[0];

	return json({ id: img.id, url: `/images/${img.id}`, driveFileId });
};
