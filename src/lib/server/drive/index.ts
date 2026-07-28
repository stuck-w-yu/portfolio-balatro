import { google } from 'googleapis';
import { getAuthorizedClient, getFolderId } from './oauth.js';

export async function isDriveConnected(): Promise<boolean> {
	return (await getAuthorizedClient()) !== null;
}

/** Upload buffer ke folder Drive (privat). Mengembalikan drive file id. */
export async function uploadToDrive(
	buffer: Buffer,
	filename: string,
	mimeType: string
): Promise<string> {
	const auth = await getAuthorizedClient();
	if (!auth) throw new Error('Google Drive belum terhubung. Hubungkan di menu Settings.');
	const drive = google.drive({ version: 'v3', auth });
	const res = await drive.files.create({
		requestBody: { name: filename, parents: [getFolderId()] },
		media: { mimeType, body: buffer },
		fields: 'id'
	});
	if (!res.data.id) throw new Error('Gagal upload ke Drive: id tidak dikembalikan.');
	return res.data.id;
}

/** Unduh isi file dari Drive (untuk proxy). */
export async function downloadFromDrive(fileId: string): Promise<Buffer> {
	const auth = await getAuthorizedClient();
	if (!auth) throw new Error('Google Drive belum terhubung.');
	const drive = google.drive({ version: 'v3', auth });
	const res = await drive.files.get({ fileId, alt: 'media' }, { responseType: 'arraybuffer' });
	return Buffer.from(res.data as ArrayBuffer);
}

/** Hapus file dari Drive (best-effort). */
export async function deleteFromDrive(fileId: string): Promise<void> {
	const auth = await getAuthorizedClient();
	if (!auth) return;
	const drive = google.drive({ version: 'v3', auth });
	try {
		await drive.files.delete({ fileId });
	} catch {
		/* abaikan — file mungkin sudah terhapus */
	}
}
