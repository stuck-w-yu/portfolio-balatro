import { defineConfig } from 'drizzle-kit';

// Muat .env agar DATABASE_URL tersedia saat menjalankan drizzle-kit (push/migrate).
try {
	process.loadEnvFile('.env');
} catch {
	/* .env opsional (mis. env sudah di-set di sistem/CI) */
}

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	out: './drizzle',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.DATABASE_URL!
	}
});
