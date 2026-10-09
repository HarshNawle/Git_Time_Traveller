**Backend Packages Details :-**



1. **fastify = Creates the backend HTTP server and API routes.**
2. **mercurius = 	Adds GraphQL support to Fastify.**
3. **graphql = 	Defines and executes your GraphQL schema, queries, mutations, and subscriptions.**
4. **graphql-ws = Supports GraphQL subscriptions over WebSockets for live analysis progress.**
5. **fastify pulgins = /cors, /cookie, /helmet, /rate-limit , /jwt, /sensible**

&#x20; 

**| Package             | Purpose                                                                    |**

**| ------------------- | ------------------------------------------------------------------ |**

**| @fastify/cors       | Allows your frontend to communicate with the backend.              |**

**| @fastify/cookie     | Reads and sets cookies, including HTTP-only refresh-token cookies. |**

**| @fastify/helmet     | Adds common HTTP security headers.                                 |**

**| @fastify/rate-limit | Limits requests and helps prevent API abuse.                       |**

**| @fastify/jwt        | Creates and verifies JWT access tokens.                            |**

**| @fastify/sensible   | Provides useful Fastify errors and helper utilities.               |**



1. **eslint prettier =** 
2. 


src/
└── schemas/
    │
    ├── common.schema.ts
    │   ├── UUIDSchema*
    │   ├── IDSchema*
    │   ├── DateSchema*
    │   ├── DateRangeSchema*
    │   └── PageInputSchema*
    │
    ├── repo.schema.ts
    │   ├── RepoUrlSchema*
    │   ├── GitHubRepoUrlSchema*
    │   ├── RepoNameSchema*
    │   ├── RepoOwnerSchema*
    │   ├── RepoMetadataSchema*
    │   ├── SubmitRepoSchema*
    │   ├── RepoIdSchema*
    │   ├── BranchSchema*
    │   ├── FilePathSchema*
    │   ├── PathPatternSchema*
    │   ├── AuthorFilterSchema*
    │   └── RepoFilterSchema*
    │
    ├── analysis.schema.ts
    │   ├── JobIdSchema*
    │   ├── JobStatusSchema*
    │   ├── JobStageSchema*
    │   ├── JobProgressSchema*
    │   ├── AnalysisJobSchema*
    │   ├── CancelAnalysisJobSchema*
    │   └── AnalysisProgressEventSchema*
    │
    ├── visualization.schema.ts
    │   ├── TimelineFilterSchema*
    │   ├── HeatmapFilterSchema*
    │   └── ContributorFilterSchema*
    │
    ├── git.schema.ts
    │   ├── CommitSchema*
    │   ├── FileChangeSchema*
    │   ├── CommitWithChangesSchema*
    │   ├── FileStatsSchema*
    │   └── HotspotScoreSchema*
    │
    ├── local-repo.schema.ts
    │   ├── LocalStatsSchema*
    │   ├── SubmitLocalRepoStatsSchema*
    │   └── RepositoryAnalysisSchema*
    │
    ├── export.schema.ts
    │   ├── ExportFormatSchema*
    │   └── StartExportSchema*
    │
    └── insight.schema.ts
        ├── FeedbackVoteSchema*
        ├── InsightFeedbackSchema*
        └── InsightSchema*

For example, your GraphQL resolver:

import { SubmitRepoSchema } from "../schemas";

export async function submitRepo(
  _: unknown,
  args: unknown
) {
  const validated = SubmitRepoSchema.parse(args);

  return analysisService.submitRepo(
    validated.url
  );
}

Better for API code:

const result = SubmitRepoSchema.safeParse(args);

if (!result.success) {
  throw new Error(
    result.error.issues
      .map((issue) => issue.message)
      .join(", ")
  );
}

const { url } = result.data;
