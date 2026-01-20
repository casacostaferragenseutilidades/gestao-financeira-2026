CREATE TABLE "financial_goals" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"target_amount" numeric(15, 2) NOT NULL,
	"month" integer NOT NULL,
	"year" integer NOT NULL,
	"category_id" varchar,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "notes" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"content" text,
	"favorite" boolean DEFAULT false,
	"color" text DEFAULT 'default',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_sessions" (
	"sid" varchar PRIMARY KEY NOT NULL,
	"sess" text NOT NULL,
	"expire" timestamp (6) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_username_unique";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "active" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "accounts_payable" ADD COLUMN "discount" numeric(15, 2);--> statement-breakpoint
ALTER TABLE "accounts_payable" ADD COLUMN "recurrence_end" text;--> statement-breakpoint
ALTER TABLE "accounts_receivable" ADD COLUMN "recurrence" text;--> statement-breakpoint
ALTER TABLE "accounts_receivable" ADD COLUMN "recurrence_period" text;--> statement-breakpoint
ALTER TABLE "accounts_receivable" ADD COLUMN "payment_method" text;--> statement-breakpoint
ALTER TABLE "accounts_receivable" ADD COLUMN "active" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "color" text;--> statement-breakpoint
ALTER TABLE "clients" ADD COLUMN "active" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "clients" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "email" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "full_name" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "team" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "status" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "created_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updated_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "financial_goals" ADD CONSTRAINT "financial_goals_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;