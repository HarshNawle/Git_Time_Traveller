CREATE TYPE "public"."repository_status" AS ENUM('PENDING', 'ANALYZING', 'COMPLETED', 'FAILED');--> statement-breakpoint
CREATE TYPE "public"."repositroy_provider" AS ENUM('GITHUB');--> statement-breakpoint
CREATE TYPE "public"."repository_role" AS ENUM('OWNER', 'EDITOR', 'VIEWER');--> statement-breakpoint
CREATE TYPE "public"."file_change_status" AS ENUM('ADDED', 'MODIFIED', 'DELETED', 'RENAMED', 'COPIED', 'BINARY');--> statement-breakpoint
CREATE TYPE "public"."git_reference_type" AS ENUM('LOCAL_BRANCH', 'REMOTE_BRANCH', 'TAG');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"github_id" bigint NOT NULL,
	"github_username" varchar(100) NOT NULL,
	"display_name" varchar(200),
	"email" varchar(320),
	"avatar_url" varchar(500),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_github_id_unique" UNIQUE("github_id")
);
--> statement-breakpoint
CREATE TABLE "repositories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provider" "repositroy_provider" DEFAULT 'GITHUB' NOT NULL,
	"owner" varchar(100) NOT NULL,
	"name" varchar(100) NOT NULL,
	"full_name" varchar(200) NOT NULL,
	"url" varchar(500) NOT NULL,
	"default_branch" varchar(255),
	"current_commit_hash" varchar(40),
	"status" "repository_status" DEFAULT 'PENDING' NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "repository_memberships" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"repository_id" uuid NOT NULL,
	"role" "repository_role" DEFAULT 'OWNER' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"refresh_token_hash" varchar(255) NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"revoked_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "commits" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"repository_id" uuid NOT NULL,
	"hash" varchar(40) NOT NULL,
	"short_hash" varchar(12) NOT NULL,
	"message" text NOT NULL,
	"author_name" varchar(255),
	"author_email" varchar(320),
	"committed_at" timestamp with time zone NOT NULL,
	"additions" integer DEFAULT 0 NOT NULL,
	"deletions" integer DEFAULT 0 NOT NULL,
	"changed_files" integer DEFAULT 0 NOT NULL,
	"url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "commit_parents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"commit_id" uuid NOT NULL,
	"parent_hash" varchar(40) NOT NULL,
	"parent_order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "file_changes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"commit_id" uuid NOT NULL,
	"path" varchar(1000) NOT NULL,
	"old_path" varchar(1000),
	"additions" integer DEFAULT 0 NOT NULL,
	"deletions" integer DEFAULT 0 NOT NULL,
	"status" "file_change_status" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "git_references" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"repository_id" uuid NOT NULL,
	"name" varchar(500) NOT NULL,
	"type" "git_reference_type" NOT NULL,
	"target_commit_hash" varchar(40) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "file_metrics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"repository_id" uuid NOT NULL,
	"file_path" varchar(1000) NOT NULL,
	"commit_count" integer DEFAULT 0 NOT NULL,
	"total_additions" integer DEFAULT 0 NOT NULL,
	"churn" integer DEFAULT 0 NOT NULL,
	"risk_score" integer DEFAULT 0 NOT NULL,
	"last_changed_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "contributor_metrics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"repository_id" uuid NOT NULL,
	"contributor_identity" varchar(320) NOT NULL,
	"display_name" varchar(200) NOT NULL,
	"commit_count" integer DEFAULT 0 NOT NULL,
	"additions" integer DEFAULT 0 NOT NULL,
	"deletions" integer DEFAULT 0 NOT NULL,
	"files_touched" integer DEFAULT 0 NOT NULL,
	"last_commit_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "repository_memberships" ADD CONSTRAINT "repository_memberships_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "repository_memberships" ADD CONSTRAINT "repository_memberships_repository_id_repositories_id_fk" FOREIGN KEY ("repository_id") REFERENCES "public"."repositories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "commits" ADD CONSTRAINT "commits_repository_id_repositories_id_fk" FOREIGN KEY ("repository_id") REFERENCES "public"."repositories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "commit_parents" ADD CONSTRAINT "commit_parents_commit_id_commits_id_fk" FOREIGN KEY ("commit_id") REFERENCES "public"."commits"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "file_changes" ADD CONSTRAINT "file_changes_commit_id_commits_id_fk" FOREIGN KEY ("commit_id") REFERENCES "public"."commits"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "git_references" ADD CONSTRAINT "git_references_repository_id_repositories_id_fk" FOREIGN KEY ("repository_id") REFERENCES "public"."repositories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "file_metrics" ADD CONSTRAINT "file_metrics_repository_id_repositories_id_fk" FOREIGN KEY ("repository_id") REFERENCES "public"."repositories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contributor_metrics" ADD CONSTRAINT "contributor_metrics_repository_id_repositories_id_fk" FOREIGN KEY ("repository_id") REFERENCES "public"."repositories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "user_github_id_idx" ON "users" USING btree ("github_id");--> statement-breakpoint
CREATE UNIQUE INDEX "user_repository_unique" ON "repository_memberships" USING btree ("user_id","repository_id");--> statement-breakpoint
CREATE INDEX "sessions_user_d_idx" ON "sessions" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "repository_commit_hash_unique" ON "commits" USING btree ("repository_id","hash");--> statement-breakpoint
CREATE INDEX "commits_repository_time_idx" ON "commits" USING btree ("repository_id","committed_at");--> statement-breakpoint
CREATE INDEX "commit_parents_commit_idx" ON "commit_parents" USING btree ("commit_id");--> statement-breakpoint
CREATE INDEX "file_changes_commit_idx" ON "file_changes" USING btree ("commit_id");--> statement-breakpoint
CREATE INDEX "file_changes_path_idx" ON "file_changes" USING btree ("path");--> statement-breakpoint
CREATE UNIQUE INDEX "repository_reference_unique" ON "git_references" USING btree ("repository_id","type","name");--> statement-breakpoint
CREATE INDEX "git_references_repository_idx" ON "git_references" USING btree ("repository_id");--> statement-breakpoint
CREATE UNIQUE INDEX "repository_file_metrics_unique" ON "file_metrics" USING btree ("repository_id","file_path");--> statement-breakpoint
CREATE UNIQUE INDEX "repository_contributor_unique" ON "contributor_metrics" USING btree ("repository_id","contributor_identity");