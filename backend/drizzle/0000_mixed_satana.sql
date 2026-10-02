CREATE TYPE "public"."repositroy_source_type" AS ENUM('github', 'local');--> statement-breakpoint
CREATE TYPE "public"."analysis_job_status" AS ENUM('queued', 'running', 'completed', 'failed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."analysis_stage" AS ENUM('connecting', 'cloning', 'parsing', 'computing', 'insights', 'completed');--> statement-breakpoint
CREATE TABLE "repositories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source_type" "repositroy_source_type" NOT NULL,
	"url" text,
	"owner" varchar(255),
	"name" varchar(255) NOT NULL,
	"default_branch" varchar(255),
	"commit_count" integer DEFAULT 0 NOT NULL,
	"file_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "analysis_jobs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"repository_id" uuid NOT NULL,
	"status" "analysis_job_status" DEFAULT 'queued' NOT NULL,
	"stage" "analysis_stage" DEFAULT 'connecting' NOT NULL,
	"error_code" varchar(100),
	"error_message" text,
	"started_at" timestamp with time zone,
	"completed_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "analysis_jobs" ADD CONSTRAINT "analysis_jobs_repository_id_repositories_id_fk" FOREIGN KEY ("repository_id") REFERENCES "public"."repositories"("id") ON DELETE cascade ON UPDATE no action;