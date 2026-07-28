import { json } from '@sveltejs/kit';
import { db, schema } from '$lib/server/db/index.js';
import { uploadToDrive } from '$lib/server/drive/index.js';

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

/** Upload gambar ke Google Drive (privat) → simpan metadata → return URL proxy. */
export const POST = async ({ request, locals }) => {
	if (!locals.user) {
		return json({ error: 'Tidak terautentikasi. Silakan login ulang.' }, { status: 401 });
	}

	let form: FormData;
	try {
		form = await request.formData();
	} catch {
		return json({ error: 'Data form tidak valid.' }, { status: 400 });
	}

	const file = form.get('file');
	if (!(file instanceof File)) return json({ error: 'File tidak ditemukan.' }, { status: 400 });
	if (!file.type.startsWith('image/')) {
		return json({ error: 'Hanya file gambar yang diperbolehkan.' }, { status: 400 });
	}
	if (file.size > MAX_BYTES) {
		return json({ error: 'Ukuran gambar maksimal 8MB.' }, { status: 413 });
	}

	const buffer = Buffer.from(await file.arrayBuffer());

	let driveFileId: string;
	try {
		driveFileId = await uploadToDrive(buffer, file.name || 'upload', file.type);
	} catch (e) {
		return json({ error: (e as Error).message || 'Gagal upload ke Drive.' }, { status: 502 });
	}

	try {
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
	} catch (e) {
		return json(
			{ error: 'Gagal menyimpan metadata gambar: ' + ((e as Error)?.message ?? '') },
			{ status: 500 }
		);
	}
};
