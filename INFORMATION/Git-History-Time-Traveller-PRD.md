# Product Requirements Document
## Git-History Time Traveller (Git History Visualizer)

**Document owner:** Product Management
**Status:** Draft v1.0
**Related brief:** Problem Statement 10 [PS10]

---

## 1. App Overview

Git-History Time Traveller is an interactive visualization tool that transforms a repository's raw commit history into cinematic, explorable visuals — timelines, heatmaps, and contributor network graphs. Instead of scrolling through `git log`, a developer, new hire, or engineering manager can "scrub" through a project's evolution like a video, watch files appear/grow/get deleted, see who touched what and when, and surface where technical debt and maintenance risk have quietly accumulated.

The product's promise, distilled into four qualities the experience must deliver:

- **Understandable** — a newcomer grasps a project's evolution in minutes, not hours.
- **Engaging** — visual storytelling developers actually want to watch, not another dashboard.
- **Actionable** — surfaces technical debt, high-churn files, and maintenance risk.
- **Shareable** — exportable as video/GIF for onboarding docs, retros, and presentations.

---

## 2. Problem Statement

Version control is foundational to modern software development, but understanding *how a project got here* is painfully hard. Text-based `git log` output is not built for comprehension — it's built for machines. As a result:

- New engineers spend **10+ hours** reconstructing project context during onboarding, because history is locked in an unreadable format.
- Code reviewers approve changes without knowing *why* a file evolved the way it did — historical context is invisible in a diff.
- Technical debt and high-churn "hotspot" files accumulate silently until they trigger production incidents, because no one is watching the trend.
- Engineering managers have no visibility into team contribution patterns, ownership, or risk concentration — reporting is manual and anecdotal.
- Despite Git's ubiquity (100M+ developers on GitHub alone), no visual tool exists that makes history genuinely engaging and actionable rather than just another log viewer.

**Core insight:** the data needed to answer "how did we get here, and where are we exposed?" already exists in every `.git` directory — it's just never been made visible.

---

## 3. Target Users

| Persona | Who they are | What they need from this tool |
|---|---|---|
| **New Team Member ("Onboarding Nadia")** | Recently joined engineer, 0–3 months on the team | A fast, visual way to understand how the codebase evolved, which areas are stable vs. volatile, and who to ask about what |
| **Individual Contributor ("Reviewing Raj")** | Mid-to-senior engineer doing code review / maintenance | Context on why a file changed historically; a quick way to spot risky, high-churn files before touching them |
| **Tech Lead / Engineering Manager ("Managing Meera")** | Owns delivery and code health for a team | Visibility into contribution patterns, hotspots, and technical debt trends to plan refactors and staffing without manual archaeology |
| **Open Source Maintainer ("Maintainer Max")** | Runs or contributes to a public repo | A shareable artifact (video/GIF) to showcase project evolution, contributor activity, and community growth |

**Out of scope for v1:** enterprise security/compliance auditors, non-Git VCS users (SVN, Mercurial), and engineering executives needing org-wide multi-repo rollups.

---

## 4. Core Features (v1)

### 4.1 Repository Ingestion & Parsing
- Connect a local Git repository (via file path) or a public GitHub URL.
- Parse commit history, file tree changes, authorship, and diff stats.
- Handle repositories from small side-projects up to large-scale codebases (e.g., Linux-kernel-sized histories).

### 4.2 Animated Timeline View
- Cinematic playback of the repository's file tree evolving commit-by-commit or day-by-day.
- Files visually appear on creation, grow/shrink with edits, and fade out on deletion.
- Playback controls: play, pause, speed adjustment, and scrub/seek to any point in history ("time travel").

### 4.3 Code Churn Heatmap
- Visual heatmap of files/directories by change frequency and recency.
- Color-coded intensity to highlight high-churn, high-risk files at a glance.
- Filterable by time range (last 30/90/365 days, all-time).

### 4.4 Contributor Network Graph
- Graph view of contributors connected to the files/modules they've touched.
- Reveals ownership concentration, bus-factor risk, and collaboration patterns.
- Filterable by contributor, team, or time window.

### 4.5 Insights & Hotspot Detection (AI-Powered)
- Automated identification of maintenance hotspots (files with high churn + high complexity).
- AI-generated plain-language summaries of what a file's history shows (e.g., "This file has been patched 12 times in the last 90 days without a refactor — a sign of accumulating technical debt").
- Technical debt indicators combining commit frequency, recency, and basic complexity signals (e.g., file size growth, patch-without-refactor patterns).
- Maintenance burden scoring per file/module to help prioritize where to invest engineering time.

### 4.6 Filtering Controls
- Filter by date range, author, file type/path, and branch.
- Combine filters to isolate specific stories (e.g., "show me this module's evolution over the last year").

### 4.7 Export & Sharing
- Export timeline playback as video (MP4) or animated GIF.
- Export static heatmap/graph views as images for slides and docs.

---

## 5. User Stories

**Onboarding & Comprehension**
- As a new team member, I want to watch how the codebase grew over time, so that I can understand its structure without reading months of commit logs.
- As a new team member, I want to see which files are the most actively maintained, so that I know where the "living" parts of the system are.

**Code Review & Maintenance**
- As an engineer reviewing a PR, I want to quickly check a file's change history and churn level, so that I can gauge how risky my change is.
- As an engineer, I want to filter the timeline to a specific file or folder, so that I can trace its history without noise from the rest of the repo.

**Technical Debt & Risk Management**
- As a tech lead, I want an automatically generated list of hotspot files with a plain-language explanation, so that I can prioritize refactoring work with data instead of guesswork.
- As a tech lead, I want AI-generated summaries of why a file is flagged as risky, so that I don't have to interpret raw churn numbers myself.
- As a tech lead, I want to see contributor concentration per module, so that I can identify bus-factor risk before someone leaves the team.

**Reporting & Sharing**
- As a maintainer, I want to export an animated video of my project's history, so that I can showcase it in a README, conference talk, or investor update.
- As an engineering manager, I want a shareable heatmap image, so that I can include it in a quarterly engineering health report.

**Core Interaction**
- As a user, I want to scrub the timeline like a video player, so that I can jump to any point in the project's history instantly.
- As a user, I want to load a public GitHub repo by URL, so that I can explore projects I don't have cloned locally.

---

## 6. MVP Scope

**In scope for MVP:**
- Repository ingestion from local path and public GitHub URL.
- One primary visualization: **animated file-tree timeline** with play/pause/scrub controls.
- **Churn heatmap** as the second visualization (v1's minimum bar per success criteria is 3 visualization types — see note below).
- **Contributor graph** as the third visualization, at a basic level (contributor–file connections, no advanced clustering).
- Basic filtering: date range and author.
- **AI-powered hotspot & technical debt insights**: use commit-churn, recency, and file-growth signals as inputs to an LLM-generated plain-language summary per hotspot (e.g., "this module changed 40% more than average with no accompanying tests"). Keep the underlying signals simple and explainable in v1 — the AI layer's job is to narrate and prioritize the data, not to run deep static analysis.
- Export to GIF (video/MP4 export can follow shortly after if time-constrained).
- Performance target: parse and render repositories with 1,000+ commits in under 30 seconds.

**Explicit technical bar for MVP (from success criteria):**
1. Parse and visualize 1,000+ commit repositories in <30 seconds.
2. At least 3 visualization types shipped: timeline, heatmap, contributor graph.
3. Interactive controls: play/pause, time-travel/scrub, filtering.
4. At least one actionable insight surfaced automatically (hotspot identification).
5. Demonstrated to work on both small repos and a large real-world repo (e.g., a major OSS project).

---

## 7. Success Metrics

**Product performance**
- Repository parse + first-render time: < 30 seconds for repos with 1,000+ commits.
- Successful render rate across a test set of real-world repos (small → large scale), target ≥ 95%.

**User comprehension & value**
- Time-to-understanding for a new user exploring an unfamiliar repo (target: materially faster than manual `git log` review — directional goal for v1, formal benchmarking post-launch).
- % of sessions where a user interacts with at least 2 of the 3 visualization types (engagement/discoverability signal).
- % of sessions resulting in an export (proxy for perceived shareable value).

**Actionability**
- % of identified hotspots that users mark as "useful/accurate" via lightweight in-app feedback (thumbs up/down).
- % of AI-generated insight summaries rated as clear and trustworthy in user feedback (target: ≥ 80%), since accuracy/trust is the main risk of adding an AI narration layer.

**Adoption (post-MVP tracking)**
- Number of repositories analyzed per week.
- Retention: % of users who return to analyze a second repository within 30 days.

---

## 8. Features to Avoid in Version 1

To keep MVP scope realistic and shippable, the following are explicitly **out of scope** for v1:

- **Deep, model-driven complexity/debt scoring beyond churn-based heuristics** — v1's AI layer narrates and prioritizes simple, explainable signals (churn, recency, file growth); it does not run custom-trained risk-prediction models. That's a v2 investment once the heuristic layer is validated with real users.
- **Multi-repo / organization-wide dashboards** — v1 is single-repository analysis only.
- **Real-time / live sync with an active repository** — v1 works on a point-in-time snapshot import, not a continuously updating feed.
- **Private repository authentication beyond basic access (e.g., enterprise SSO, GitHub Enterprise integration)** — start with public repos and local paths only.
- **Deep static-analysis-based complexity metrics** (cyclomatic complexity, AST-level code quality scoring) — use commit-churn as the v1 proxy for risk; defer true code complexity analysis.
- **Non-Git VCS support** (SVN, Mercurial, Perforce) — Git only for v1.
- **Team/manager reporting suite** (PDF report generation, scheduled email digests) — export of raw video/image assets is sufficient for v1; structured reporting is a v2 candidate.
- **Collaborative/multiplayer viewing** (shared live sessions, comments/annotations on the timeline) — defer to a future collaboration-focused release.
- **Mobile app** — v1 is a desktop/web experience only, given the data density and visualization needs.
- **Branch-merge visualization complexity** (full DAG/branch topology rendering) — v1 focuses on mainline history; complex branch-merge graph visualization is a stretch goal, not a requirement.

---

## Appendix: Source Problem Statement (PS10)

**Introduction:** Version control systems like Git are fundamental to modern software development, but understanding a project's evolution is painfully difficult. Reading text-based git logs to comprehend how a codebase grew, which files are maintenance nightmares, who contributed what, or where technical debt accumulated requires hours of manual analysis.

**Why it matters:**
1. 100M+ developers use GitHub globally.
2. New developers spend 10+ hours understanding project history when onboarding.
3. Code reviews miss context about why changes happened historically.
4. Technical debt accumulates invisibly until it causes production issues.
5. No visual tools exist to make git history engaging and actionable.

**Success criteria (as defined in the brief):**
1. Parsing and visualizing repositories with 1,000+ commits in < 30 seconds.
2. Creating at least 3 visualization types (timeline, heatmap, contributor graph).
3. Providing interactive controls (play/pause, time-travel, filtering).
4. Generating actionable insights (hotspot identification, complexity tracking).
5. Handling real-world repositories (from small projects to Linux kernel scale).
