CREATE TABLE "commits" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"repository_id" uuid NOT NULL,
	"sha" varchar(40) NOT NULL,
	"message" text NOT NULL,
	"author_name" varchar(255),
	"author_email" varchar(255),
	"committed_at" timestamp with time zone NOT NULL,
	"additions" integer DEFAULT 0 NOT NULL,
	"deletions" integer DEFAULT 0 NOT NULL,
	"changed_files" integer DEFAULT 0 NOT NULL,
	"url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "commits_sha_unique" UNIQUE("sha")
);
--> statement-breakpoint
ALTER TABLE "repositories" ALTER COLUMN "url" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "repositories" ADD COLUMN "github_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "repositories" ADD COLUMN "full_name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "commits" ADD CONSTRAINT "commits_repository_id_repositories_id_fk" FOREIGN KEY ("repository_id") REFERENCES "public"."repositories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "repositories" ADD CONSTRAINT "repositories_github_id_unique" UNIQUE("github_id");