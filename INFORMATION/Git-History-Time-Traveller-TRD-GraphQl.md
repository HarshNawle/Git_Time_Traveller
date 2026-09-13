# Technical Requirements Document
## Git-History Time Traveller (Git History Visualizer)

**Document owner:** Engineering / Architecture
**Status:** Draft v1.0
**Based on:** Git-History-Time-Traveller-PRD.md (v1.0) · Problem Statement 10 [PS10]

---

## 1. Architecture Summary

Git-History Time Traveller is split into three concerns that map directly to its hardest constraints:

1. **Parsing at speed** — 1,000+ commits in <30s, and graceful degradation up to Linux-kernel-scale histories.
2. **Rendering at scale** — thousands of files/commits animating smoothly, not a laggy DOM.
3. **Narrating with AI** — turning churn statistics into trustworthy plain-language insights.

The system is a **client-heavy SPA backed by an async job-processing API**, not a request/response CRUD app — repo analysis is a background job, not something computed inline in an HTTP handler.

```
┌─────────────────────┐         ┌──────────────────────────┐
│   Frontend (SPA)     │ GraphQL │  API Gateway (Fastify +  │
│  React + WebGL canvas│ (ops +  │   Mercurius GraphQL)     │
│                       │ subs)   │  auth, validation, queue │
└─────────┬────────────┘◄───────►└──────────┬───────────────┘
          │  (local repo: parses in-browser              │
          │   via WASM git, uploads only stats)           │
          │                                    ┌──────────▼──────────┐
          │                                    │   Job Queue (Redis/  │
          │                                    │      BullMQ)         │
          │                                    └──────────┬──────────┘
          │                                    ┌──────────▼──────────┐
          │                                    │  Worker Pool         │
          │                                    │  - sandboxed clone   │
          │                                    │  - native `git` CLI  │
          │                                    │  - churn/hotspot calc│
          │                                    │  - LLM insight call  │
          │                                    └──────────┬──────────┘
          │                          ┌────────────────────┼────────────────────┐
          │                 ┌────────▼───────┐   ┌────────▼───────┐   ┌────────▼───────┐
          │                 │  PostgreSQL     │   │  Object Storage │   │  Redis Cache    │
          │                 │  (jobs, users,  │   │  (S3-compatible)│   │  (hot analysis  │
          │                 │  feedback)      │   │  (exports, raw  │   │   results)      │
          │                 │                 │   │  parsed JSON)   │   │                 │
          │                 └─────────────────┘   └─────────────────┘   └─────────────────┘
          └───────────────────────────────────────────────────────────────────────────────┘
```

**Data flow (public GitHub repo, the primary path):**
`URL submitted via submitRepo mutation → job enqueued → worker shallow-clones repo in a sandboxed container → native git CLI extracts commit/file/diff metadata → churn & hotspot stats computed → LLM called with aggregated stats (not raw source) to generate narrative insights → results cached in Redis + persisted to Postgres/S3 → frontend subscribes to analysisProgress for live updates → visualizations render client-side from cached JSON returned by GraphQL queries.`

**Data flow (local repo, the privacy-sensitive path):** parsing happens **in-browser** (see §2 and §9) so proprietary source code never leaves the user's machine unless they explicitly opt in to AI insights, in which case only aggregated statistics — not file contents — are sent.

---

## 2. Frontend Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **React 18 + TypeScript** | Large ecosystem for data-viz interop (D3/PixiJS bindings), strong hiring pool, matches the "web app" nature of the product |
| Build tool | **Vite** | Fast dev server and build times matter for iteration speed on a visualization-heavy app |
| Rendering: timeline & heatmap | **PixiJS (WebGL/Canvas 2D renderer)** | A DOM/SVG-based render of thousands of animating file nodes will drop frames past a few hundred elements. PixiJS batches draw calls on the GPU, which is required to hit "cinematic," 60fps playback at Linux-kernel-repo file counts |
| Rendering: contributor graph | **D3-force (simulation) + Canvas rendering** | D3's force-directed layout algorithm is best-in-class for network graphs; rendering the output to Canvas instead of SVG avoids DOM thrash once contributor/file node counts grow |
| State management | **Zustand** | Lightweight, avoids Redux boilerplate; a visualization app needs frequent, granular state updates (playhead position, filters) where minimal re-render overhead matters |
| Styling | **Tailwind CSS** | Fast iteration on UI chrome (controls, panels) without fighting a component library; keeps bundle lean since the app's weight budget should go to the renderer, not the CSS framework |
| Local repo parsing | **isomorphic-git (WASM) + File System Access API** | Enables reading a local `.git` directory entirely client-side — no source code upload required (see §9 Security) |
| Client-side export | **gif.js (GIF) + MediaRecorder API on canvas.captureStream() (MP4/WebM)** | Captures exactly what the user sees (WYSIWYG), avoids standing up a server-side headless-browser rendering pipeline for MVP |

---

## 3. Backend Stack

| Layer | Choice | Why |
|---|---|---|
| Runtime | **Node.js + TypeScript** | Same language as frontend (shared types for API contracts); Node's async I/O model suits a service that mostly orchestrates subprocesses (git) and network calls (LLM API) rather than doing CPU-bound work in-process |
| API framework | **Fastify** | Lower overhead than Express, built-in schema validation (important for an endpoint that accepts arbitrary repo URLs — see §9), first-class TypeScript support |
| API paradigm | **GraphQL via Mercurius** (Fastify's native GraphQL adapter) | The product's own data model is inherently graph-shaped and client-driven — a workspace screen may need timeline data, a filtered subset of insights, and contributor summaries in one round trip, with different tabs needing different slices of the same repo. GraphQL lets the frontend request exactly the fields each view needs instead of over-fetching fixed REST payloads. Mercurius is chosen over Apollo Server specifically because it's built for Fastify (shares its JSON-schema validation and plugin lifecycle) and compiles resolvers via GraphQL-JIT, which matters for a backend that's otherwise optimized for speed (§1) |
| Git parsing engine | **Native `git` CLI via sandboxed `child_process`**, not a JS re-implementation | This is the single most important performance decision in the system. Pure-JS/WASM git libraries (isomorphic-git, etc.) re-implement git's object model and are meaningfully slower than the C-based `git` binary on large histories. Shelling out to `git log --numstat`, `git log --pretty=format:...`, etc. is the only realistic way to hit "1,000+ commits in <30s" and scale toward Linux-kernel-sized repos |
| Job queue / background processing | **BullMQ (Redis-backed)** | Repo analysis is not request/response — a large clone + parse can take well past typical HTTP timeout windows. Jobs need retry, progress reporting, and concurrency limits per worker, which BullMQ provides out of the box |
| Worker isolation | **Docker containers per parse job (ephemeral, resource-capped)** | Untrusted repository content (arbitrary Git history, potentially crafted to abuse git internals) should never run against the host filesystem directly — see §9 |
| AI insight generation | **LLM API abstraction layer**, primary provider **Claude API (Anthropic)** | Insight generation is a narrow, well-defined task (summarize structured churn statistics into plain language) — no need for a custom-trained model. An abstraction layer means the provider can be swapped without touching calling code |
| Large history strategy | **Progressive parsing + level-of-detail (LOD) bucketing** | For repos far beyond 1,000 commits (Linux-kernel scale), full per-commit fidelity for the entire history is neither fast nor visually meaningful. Commit metadata is parsed first (cheap, fast) to unblock the UI quickly; detailed diff stats are computed incrementally and older history is aggregated into daily/weekly/monthly buckets rather than rendered commit-by-commit. This is what makes "small project" and "Linux kernel" both achievable without two separate code paths |

---

## 4. Database & Storage

| Store | Purpose | Why this choice |
|---|---|---|
| **PostgreSQL** | Users, repo records, job metadata/status, insight feedback (thumbs up/down), export records | Relational integrity matters for job state transitions and feedback-to-insight linkage; mature, well-understood operational profile |
| **Redis** | Job queue (via BullMQ) + hot cache of computed analysis results | Sub-millisecond reads for "reopen a recently analyzed repo" without re-parsing; doubles as the queue broker, reducing infra surface area |
| **Object storage (S3-compatible)** | Raw parsed JSON payloads (for large repos), exported video/GIF files | These are large, immutable blobs — wrong shape for a relational DB row. S3-compatible storage keeps this cloud-portable (works identically on AWS S3, Cloudflare R2, MinIO for self-hosting) |
| **Local IndexedDB (client-side)** | Cached parsed data for locally-analyzed repos | Since local repos are parsed in-browser (§2, §9), results should persist across a session refresh without re-parsing, and without ever touching the server |

**Data retention:** cached analysis results (Redis + S3) expire on a TTL (proposed: 30 days) rather than persisting indefinitely — the product doesn't need to be a permanent code archive, and this bounds storage cost and the blast radius of any one analyzed repo's cached data.

---

## 5. Authentication

| Requirement | Approach | Reasoning |
|---|---|---|
| Identity | **GitHub OAuth** (via Passport.js / `@fastify/oauth2`) | The overwhelming majority of target users already have a GitHub identity; using it avoids a separate password system and sets up (but does not require building yet) the path to private-repo access in a future version |
| Anonymous usage | **Public repo analysis works without login** | The core "show me" experience should have zero friction — login is only required to save analysis history, manage exports, or leave insight feedback. This matches a tool meant to be tried casually (e.g., pasted into a demo or shared link) |
| Session handling | **Short-lived JWT access token + HTTP-only refresh cookie** | Standard, avoids storing long-lived tokens in `localStorage` (XSS exposure); HTTP-only cookie prevents script access to the refresh token |
| Scope requested | **Minimum viable GitHub OAuth scope** (public read only for v1) | Per the PRD, private repo access is explicitly out of scope for v1 — requesting broader scopes than needed would be a security and trust liability with no v1 feature to justify it |

---

## 6. APIs

The API is **GraphQL-first**, served from a single endpoint (`POST /graphql`, plus a `/graphql` WebSocket upgrade for subscriptions). One exception is kept as plain HTTP — see the note at the end of §6.1 — because it's driven by browser redirects rather than client-initiated operations.

### 6.1 GraphQL Schema

**Queries** (read operations, called on-demand by whichever screen/tab needs them — see the App Flow document for exactly which screen triggers which):

| Query | Returns | Purpose |
|---|---|---|
| `analysisJob(jobId: ID!)` | `AnalysisJob { status, stage, progress, repoId }` | Check current status of a submitted job (fallback for clients that aren't subscribed, or on initial page load before a subscription is established) |
| `repoTimeline(repoId: ID!, filter: RepoFilterInput)` | `TimelineData` | Bucketed commit/file-tree data for the Timeline tab |
| `repoHeatmap(repoId: ID!, filter: RepoFilterInput, granularity: HeatmapGranularity)` | `HeatmapData` | Churn heatmap data |
| `repoContributors(repoId: ID!, filter: RepoFilterInput)` | `ContributorGraphData` | Contributor–file graph data |
| `repoInsights(repoId: ID!)` | `[Insight!]!` | AI-generated hotspot/technical-debt summaries (or the raw-churn fallback list — see App Flow §7) |
| `fileHistory(repoId: ID!, path: String!, filter: RepoFilterInput, page: PageInput)` | `FileHistoryPage` | Paginated commit history for a single file (File Detail Drawer) |
| `me` | `User` | Current authenticated user + saved repo history summary |
| `myRepos` | `[SavedRepo!]!` | Full "My Repos" history list |

A single shared `RepoFilterInput` type (dateFrom, dateTo, authors, pathPattern, branch) is reused across every repo-scoped query, so the frontend's Filter Bar (App Flow §6) maps to one input object rather than bespoke params per query.

**Mutations** (write/action operations):

| Mutation | Returns | Purpose |
|---|---|---|
| `submitRepo(url: String!)` | `AnalysisJob` | Submit a public GitHub URL for analysis → returns a `jobId` immediately, work continues async |
| `submitLocalRepoStats(stats: LocalStatsInput!)` | `AnalysisJob` | Register a client-parsed (WASM) local repo's aggregated stats so it can get an AI insights pass, if the user opts in |
| `cancelAnalysisJob(jobId: ID!)` | `Boolean` | Cancel an in-progress job |
| `submitInsightFeedback(insightId: ID!, vote: FeedbackVote!)` | `Insight` | Thumbs up/down on an insight (feeds the accuracy metric in the PRD); requires auth |
| `removeSavedRepo(repoId: ID!)` | `Boolean` | Remove an entry from "My Repos" |
| `deleteAllHistory` | `Boolean` | Clear all saved history for the current user |
| `startExport(repoId: ID!, format: ExportFormat!, scope: ExportScope!)` | `ExportJob` | Server-assisted export job — **post-MVP stub only**; MVP exports client-side (canvas capture) and never calls this |

**Subscriptions** (real-time, server-push):

| Subscription | Emits | Purpose |
|---|---|---|
| `analysisProgress(jobId: ID!)` | `AnalysisProgressEvent { stage, progress, message }` | Live progress updates for the Analysis Progress screen's stepper (App Flow §5), replacing polling |

**OAuth exception:** `GET /api/auth/github/callback` remains a plain REST/HTTP endpoint outside the GraphQL schema. OAuth's redirect-based handshake (the browser is sent to GitHub and back by HTTP redirects, not by a client-initiated request) doesn't map cleanly onto GraphQL's request/response or subscription semantics, and forcing it into the schema would add complexity without benefit. This is the one deliberate hybrid point in an otherwise GraphQL-first API.

### 6.2 Real-time channel

**GraphQL Subscriptions over WebSocket** (`graphql-ws` protocol, served by Mercurius) for parse-progress updates, superseding the SSE approach considered earlier. Reasoning: once the API is GraphQL-first, subscriptions are the native mechanism for server-push — they're typed and schema-validated like every other operation, and the frontend uses the same GraphQL client library for queries, mutations, and subscriptions instead of maintaining a second, special-cased transport (SSE) just for one feature. The data flow is still one-directional (server → client), so this is a consistency win rather than a functional one — WebSocket's bidirectionality isn't otherwise needed here.

### 6.3 External APIs

| External API | Purpose | Notes |
|---|---|---|
| **GitHub REST/GraphQL API** | Resolve repo metadata, validate URL is a legitimate public repo before cloning | Also used for OAuth identity |
| **LLM API (Claude API primary)** | Generate plain-language insight narration from pre-computed churn/hotspot statistics | Only aggregated statistics are sent, never raw source code (see §9) |

---

## 7. System Architecture — Key Decisions

**Why background jobs instead of synchronous API calls:** cloning and parsing a large repository can take longer than a reasonable HTTP request timeout, and the product's own success metric (parse a 1,000+ commit repo in under 30 seconds) is itself an indicator that this must be treated as a job with progress reporting, not a blocking call.

**Why sandboxed, ephemeral workers:** the system clones and executes `git` operations against repository content submitted by any user, including public repos the team doesn't control. Treating that content as untrusted input (see §9) means each parse job runs in an isolated, resource-capped, throwaway container rather than a long-lived shared worker process.

**Why a two-tier ingestion model (server-side for GitHub URLs, client-side for local repos):** these have fundamentally different trust boundaries. A public GitHub URL is already public — server-side cloning is fine and enables background job processing, caching, and sharing. A local repo may contain proprietary code the user never intended to upload anywhere — parsing it in-browser (WASM) keeps that code on the user's machine by default.

**Why level-of-detail bucketing instead of one parsing code path:** trying to render 500,000 individual commit-frames for a Linux-kernel-scale repo the same way as a 200-commit side project would be both slow and visually meaningless (indistinguishable flicker). Aggregating older/denser history into time buckets, while keeping full per-commit fidelity for recent/zoomed-in ranges, is what allows the same architecture to legitimately serve both the "small project" and "Linux kernel" success criteria in the PRD.

---

## 8. Deployment Plan

| Environment | Purpose | Infrastructure |
|---|---|---|
| **Development** | Local iteration | Docker Compose (API, worker, Postgres, Redis, MinIO as local S3 stand-in) |
| **Staging** | Pre-release validation, demo environment | Same container images as production, smaller instance sizes |
| **Production** | Live product | Containerized services on a managed platform |

**Deployment topology:**
- **Frontend:** static build deployed to a CDN (e.g., Cloudflare Pages / Vercel) — no server needed for the SPA shell itself.
- **API service:** containerized, deployed to a managed container platform (e.g., AWS Fargate / Render / Fly.io) behind a load balancer, horizontally scalable since it's largely stateless (state lives in Postgres/Redis).
- **Worker pool:** separate deployable from the API service, scaled independently — parse jobs are CPU/IO-bound and bursty, while the API is mostly lightweight request handling. Decoupling scaling policies avoids over-provisioning the API tier just to handle occasional large-repo parse spikes.
- **CI/CD:** GitHub Actions — lint/test/build on PR, deploy to staging on merge to `main`, manual promotion to production.
- **Rollout strategy:** MVP launches to a single region; multi-region is not warranted until there's usage data justifying it (avoids premature infra complexity).

---

## 9. Security Requirements

| Concern | Requirement | Reasoning |
|---|---|---|
| **Untrusted repository content** | All server-side git operations run inside ephemeral, network-restricted, resource-capped (CPU/memory/time) containers | A malicious or malformed repository (crafted pack files, git hooks, oversized blobs) should not be able to affect the host system or other jobs. Resource caps prevent a single large repo from starving the worker pool |
| **SSRF via repo URL** | Strict allow-list validation that submitted URLs resolve to `github.com`/public GitHub hosts only; no arbitrary URL fetching | Without this, the "submit a repo URL" feature is a textbook SSRF vector into internal infrastructure |
| **Source code privacy (local repos)** | Local repository parsing happens client-side (WASM); only aggregated statistics — never file contents — are transmitted to the server, and only when the user opts into AI insights | Proprietary local code is the most sensitive data this product touches; the architecture should make leaking it structurally difficult, not just policy-forbidden |
| **AI insight data minimization** | LLM prompts contain computed statistics (churn counts, file paths, timestamps) only — never raw diffs or file content | Limits exposure if the LLM provider retains prompt data, and reduces the chance of proprietary code fragments appearing in a generated summary |
| **Secrets management** | GitHub OAuth credentials and LLM API keys stored in a managed secrets store (e.g., AWS Secrets Manager / Doppler), never in source control or plain environment files committed to the repo | Standard baseline; the cost of getting this wrong (leaked API keys) is high and easily avoidable |
| **Rate limiting** | Per-IP and per-user rate limits on repo submission and export endpoints | Prevents abuse of the compute-expensive clone/parse pipeline and controls LLM API cost exposure |
| **Transport security** | HTTPS everywhere; HTTP-only, `Secure`, `SameSite=Lax` cookies for session/refresh tokens | Baseline protection against token interception and CSRF |
| **Dependency hygiene** | Automated dependency vulnerability scanning (e.g., `npm audit` / Dependabot) in CI | Standard supply-chain hygiene, low cost to implement early |
| **Data retention** | TTL-based expiry on cached analysis data and exports (proposed 30 days); explicit user-triggered delete | Bounds how long any submitted repo's derived data persists, relevant even for "public" repos where a user may not expect indefinite retention |

---

## 10. Technical Decisions Summary (Decision Log)

| # | Decision | Alternative(s) considered | Reason for choice |
|---|---|---|---|
| 1 | Native `git` CLI (shelled out) for server-side parsing | isomorphic-git, NodeGit, libgit2 bindings | Fastest available option; required to meet the <30s/1,000-commit performance bar and scale toward very large repos |
| 2 | PixiJS/WebGL rendering for timeline & heatmap | Plain SVG/DOM (D3 default), React component-per-node | DOM-based rendering degrades badly past a few hundred animated nodes; GPU-accelerated rendering is necessary for "cinematic," smooth playback at scale |
| 3 | Client-side (WASM) parsing for local repos | Upload local repo to server for parsing | Avoids ever transmitting potentially proprietary local source code off the user's machine by default |
| 4 | Background job queue (BullMQ/Redis) instead of synchronous request handling | Synchronous HTTP handler with long timeout | Large-repo parsing routinely exceeds reasonable HTTP timeout windows and needs progress reporting/retry |
| 5 | Ephemeral sandboxed containers per parse job | Long-lived shared worker process | Treats arbitrary repository content as untrusted input; limits blast radius of malicious/malformed repos |
| 6 | LLM abstraction layer with Claude API as default provider | Hard-coding a single vendor SDK throughout the codebase | Keeps the AI-insight feature provider-agnostic; the task (summarizing structured stats) doesn't require a custom-trained model |
| 7 | Level-of-detail (LOD) bucketing for large histories | Uniform per-commit rendering for all repo sizes | The only realistic way to satisfy both "small project" and "Linux-kernel-scale" success criteria with one codebase |
| 8 | GitHub OAuth for identity; anonymous access for public repo analysis | Custom email/password auth; login-walled product | Matches where target users already have identity; removes friction from the core try-it-out experience |
| 9 | GraphQL Subscriptions (over WebSocket, via Mercurius/`graphql-ws`) for progress updates | Server-Sent Events; plain polling | Once GraphQL is the API paradigm (#11), subscriptions are its native real-time mechanism — same typed schema and client library as queries/mutations, rather than a second special-cased transport for one feature |
| 10 | Client-side export (MediaRecorder/gif.js) for MVP | Server-side headless-browser frame capture + ffmpeg | Avoids standing up a compute-heavy rendering pipeline before validating that export is actually used; matches PRD's MVP-first export scope |
| 11 | GraphQL (via Mercurius on Fastify) as the API paradigm, with one plain-HTTP exception for OAuth callback | REST/JSON over Fastify (original v1.0 decision) | The product's screens each need a different, view-specific slice of a repo's data (timeline vs. heatmap vs. contributors vs. insights, each further sliced by the shared filter set) — GraphQL lets each screen request exactly the fields it needs in one round trip instead of over- or under-fetching fixed REST payloads. Mercurius keeps this in the Fastify ecosystem already chosen for the API framework rather than introducing Apollo Server as a second framework layer |

---

## 11. Traceability to PRD Success Metrics

| PRD success metric | Technical requirement that satisfies it |
|---|---|
| Parse + render 1,000+ commit repos in <30s | Native git CLI parsing (§3) + LOD bucketing (§7) |
| ≥95% successful render rate across real-world repos | Sandboxed worker isolation with resource limits prevents hard failures from resource exhaustion (§9); progressive parsing avoids all-or-nothing failure on huge histories |
| At least 3 visualization types, interactive | PixiJS timeline, Canvas/D3 heatmap, D3-force contributor graph — all client-rendered from cached JSON for responsive filtering (§2) |
| AI-generated, trustworthy hotspot insights | LLM abstraction layer fed pre-computed statistics only, with a `submitInsightFeedback` mutation to track trust over time (§6, §10) |
| Exportable, shareable output | Client-side MediaRecorder/gif.js export in MVP (§2, §10) |

---

## Appendix: Inputs to This Document

This TRD implements the feature set, MVP scope, and success metrics defined in `Git-History-Time-Traveller-PRD.md` (v1.0), which itself derives from Problem Statement 10 [PS10] — Git-History Time Traveller / Git History Visualizer. Where the PRD specifies a *what* (e.g., "3 visualization types," "<30 second parse," "AI-powered insights"), this document specifies the corresponding *how* and the reasoning behind each technical choice.
