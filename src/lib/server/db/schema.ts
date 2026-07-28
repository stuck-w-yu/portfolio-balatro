import {
	pgTable,
	serial,
	text,
	integer,
	timestamp,
	jsonb
} from 'drizzle-orm/pg-core';

/** Akun admin CMS. */
export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull()
});

/** Session login (token cookie). */
export const sessions = pgTable('sessions', {
	token: text('token').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expiresAt: timestamp('expires_at').notNull()
});

/** Penyimpanan key/value (mis. google refresh token). */
export const settings = pgTable('settings', {
	key: text('key').primaryKey(),
	value: text('value').notNull()
});

/** Profil tunggal pemilik portfolio. */
export const profile = pgTable('profile', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	alias: text('alias').notNull().default(''),
	role: text('role').notNull().default(''),
	location: text('location').notNull().default(''),
	bio: text('bio').notNull().default(''),
	avatar: text('avatar').notNull().default('')
});

/** Statistik "run" pada profil. */
export const profileStats = pgTable('profile_stats', {
	id: serial('id').primaryKey(),
	label: text('label').notNull(),
	value: text('value').notNull(),
	sort: integer('sort').notNull().default(0)
});

/** Project sebagai kartu Joker. */
export const projects = pgTable('projects', {
	id: serial('id').primaryKey(),
	key: text('key').notNull().unique(),
	title: text('title').notNull(),
	art: text('art').notNull().default(''),
	rarity: text('rarity').notNull().default('common'),
	edition: text('edition').notNull().default('none'),
	summary: text('summary').notNull().default(''),
	description: text('description').notNull().default(''),
	tags: jsonb('tags').$type<string[]>().notNull().default([]),
	links: jsonb('links').$type<{ label: string; url: string }[]>().notNull().default([]),
	impactChips: integer('impact_chips').notNull().default(0),
	impactMult: integer('impact_mult').notNull().default(0),
	sort: integer('sort').notNull().default(0)
});

/** Skill sebagai chip/mult badge. */
export const skills = pgTable('skills', {
	id: serial('id').primaryKey(),
	label: text('label').notNull(),
	kind: text('kind').notNull().default('chip'),
	level: integer('level').notNull().default(0),
	note: text('note').notNull().default(''),
	sort: integer('sort').notNull().default(0)
});

/** Pengalaman sebagai Blind rounds. */
export const experiences = pgTable('experiences', {
	id: serial('id').primaryKey(),
	type: text('type').notNull().default('small'),
	role: text('role').notNull(),
	company: text('company').notNull().default(''),
	period: text('period').notNull().default(''),
	reward: text('reward').notNull().default(''),
	icon: text('icon').notNull().default(''),
	details: text('details').notNull().default(''),
	sort: integer('sort').notNull().default(0)
});

/** Link sosial sebagai item Shop. */
export const socials = pgTable('socials', {
	id: serial('id').primaryKey(),
	label: text('label').notNull(),
	url: text('url').notNull().default(''),
	icon: text('icon').notNull().default(''),
	price: text('price').notNull().default('$0'),
	sort: integer('sort').notNull().default(0)
});

/** Metadata gambar yang disimpan di Google Drive (disajikan via proxy). */
export const images = pgTable('images', {
	id: serial('id').primaryKey(),
	driveFileId: text('drive_file_id').notNull(),
	filename: text('filename').notNull().default(''),
	contentType: text('content_type').notNull().default('application/octet-stream'),
	size: integer('size').notNull().default(0),
	createdAt: timestamp('created_at').defaultNow().notNull()
});
