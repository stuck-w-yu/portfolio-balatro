CREATE TABLE "experiences" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" text DEFAULT 'small' NOT NULL,
	"role" text NOT NULL,
	"company" text DEFAULT '' NOT NULL,
	"period" text DEFAULT '' NOT NULL,
	"reward" text DEFAULT '' NOT NULL,
	"icon" text DEFAULT '' NOT NULL,
	"details" text DEFAULT '' NOT NULL,
	"sort" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "images" (
	"id" serial PRIMARY KEY NOT NULL,
	"drive_file_id" text NOT NULL,
	"filename" text DEFAULT '' NOT NULL,
	"content_type" text DEFAULT 'application/octet-stream' NOT NULL,
	"size" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profile" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"alias" text DEFAULT '' NOT NULL,
	"role" text DEFAULT '' NOT NULL,
	"location" text DEFAULT '' NOT NULL,
	"bio" text DEFAULT '' NOT NULL,
	"avatar" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profile_stats" (
	"id" serial PRIMARY KEY NOT NULL,
	"label" text NOT NULL,
	"value" text NOT NULL,
	"sort" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"title" text NOT NULL,
	"art" text DEFAULT '' NOT NULL,
	"rarity" text DEFAULT 'common' NOT NULL,
	"edition" text DEFAULT 'none' NOT NULL,
	"summary" text DEFAULT '' NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"tags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"links" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"impact_chips" integer DEFAULT 0 NOT NULL,
	"impact_mult" integer DEFAULT 0 NOT NULL,
	"sort" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "projects_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"token" text PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"expires_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"key" text PRIMARY KEY NOT NULL,
	"value" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"id" serial PRIMARY KEY NOT NULL,
	"label" text NOT NULL,
	"kind" text DEFAULT 'chip' NOT NULL,
	"level" integer DEFAULT 0 NOT NULL,
	"note" text DEFAULT '' NOT NULL,
	"sort" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "socials" (
	"id" serial PRIMARY KEY NOT NULL,
	"label" text NOT NULL,
	"url" text DEFAULT '' NOT NULL,
	"icon" text DEFAULT '' NOT NULL,
	"price" text DEFAULT '$0' NOT NULL,
	"sort" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password_hash" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;