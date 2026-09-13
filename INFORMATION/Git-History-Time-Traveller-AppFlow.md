# App Flow Document
## Git-History Time Traveller (Git History Visualizer)

**Document owner:** UX Strategy
**Status:** Draft v1.0
**Based on:** Git-History-Time-Traveller-PRD.md (v1.0) · Git-History-Time-Traveller-TRD.md (v1.0)

---

## 0. How to Read This Document

This document is written so a coding agent can implement navigation, components, and state handling without inferring intent. Conventions used throughout:

- **Screen ID** (e.g., `S-01`) — a stable reference; use these IDs as route/component names in code where practical.
- **Route** — the URL path for that screen. All routes are client-side (SPA) unless noted.
- Every screen defines four state types where applicable: **Loading**, **Success (default/populated)**, **Empty**, **Error**. If a state type doesn't apply to a screen, it is explicitly marked "N/A" rather than omitted, so its absence is a decision, not a gap.
- Every interactive element is listed in an **Actions table**: `Element | Label | Enabled when | On click/change | Result`.
- "Toast" refers to the global transient notification component defined in §12.
- "Modal" refers to the global overlay dialog component defined in §12.

---

## 1. Screen Inventory & Navigation Map

| ID | Screen | Route | Auth required? |
|---|---|---|---|
| S-00 | Global App Shell (persistent header/footer/toast/modal layer) | wraps all routes | No |
| S-01 | Landing / Home | `/` | No |
| S-02 | GitHub OAuth Callback (flow, not a visible screen) | `/auth/github/callback` | No |
| S-03 | Analysis Progress | `/analyze/:jobId` | No |
| S-04 | Analysis Workspace (parent shell for tabs) | `/repo/:jobId` | No |
| S-04a | — Timeline Tab | `/repo/:jobId/timeline` | No |
| S-04b | — Heatmap Tab | `/repo/:jobId/heatmap` | No |
| S-04c | — Contributor Graph Tab | `/repo/:jobId/contributors` | No |
| S-04d | — Insights Panel (drawer, overlays any tab) | n/a (drawer state, not a route) | No to view / Yes to give feedback |
| S-04e | — File Detail Drawer (overlays any tab) | n/a (drawer state, not a route) | No |
| S-05 | Export Modal | n/a (modal over S-04) | No |
| S-06 | My Repos / History | `/my-repos` | Yes |
| S-07 | Account Menu (dropdown, not a route) | n/a | Shown only if logged in |
| S-08 | Settings & Privacy | `/settings` | Yes |
| S-09 | 404 / Not Found | `*` (unmatched routes) | No |
| S-10 | Fatal Error Screen | rendered in place of any route on unrecoverable error | No |

**High-level flow:**

```
S-01 Landing
   │  submit public URL ──────────────► S-03 Analysis Progress ──done──► S-04 Workspace ──┬─► S-05 Export Modal
   │  pick local folder  ─────────────►        (same screen,                              ├─► S-04d Insights Panel
   │                                     different source)                                ├─► S-04e File Detail Drawer
   │  "Sign in with GitHub" ──────────► S-02 OAuth Callback ──► back to S-01 or S-06       └─► tabs: S-04a/b/c
   │
   └─ header "My Repos" (if logged in) ─► S-06 My Repos ──select past repo──► S-04 Workspace
   └─ header account menu ─► S-07 Account Menu ──"Settings"──► S-08 Settings
                                        └──"Sign out"──► S-01 Landing (logged out)
```

---

## 2. Global App Shell (S-00)

Persistent across every route.

**Layout:**
- **Header** (fixed top): app logo/wordmark (click → `/`), center/right: nothing on `/`; on all other routes, shows current repo name + owner (when applicable) truncated with ellipsis, "Share" icon button, "Export" button (visible only on S-04 workspace routes), auth area on the far right.
- **Auth area (right of header):**
  - Logged out: single button, label **"Sign in with GitHub"**.
  - Logged in: circular avatar (GitHub profile image) + username; click opens S-07 Account Menu.
- **Toast layer:** fixed top-right, stacks vertically, newest on top. See §12.1.
- **Modal layer:** centered overlay with dimmed backdrop. Only one modal may be open at a time; opening a second modal closes the first. See §12.2.
- **Footer:** none in v1 (kept out to maximize canvas space for visualizations; this is a deliberate omission, not an oversight).

**Actions table (header):**

| Element | Label | Enabled when | On click | Result |
|---|---|---|---|---|
| Logo | — | always | click | Navigate to `/` (S-01). If an analysis is in progress or a workspace is open, no confirmation is needed — analysis continues server-side / is cached, so leaving is non-destructive |
| Share icon | — | only visible on S-04 routes | click | Copy current URL to clipboard; show success toast: "Link copied — anyone can view this analysis." |
| Export button | "Export" | only visible on S-04 routes, and only once the active tab has finished rendering (not during initial data load) | click | Open S-05 Export Modal |
| "Sign in with GitHub" | "Sign in with GitHub" | always (when logged out) | click | Redirect to GitHub OAuth authorize URL → S-02 |
| Avatar/username | — | always (when logged in) | click | Toggle S-07 Account Menu dropdown open/closed |

---

## 3. S-01 — Landing / Home

**Purpose:** Zero-friction entry point. A first-time visitor should be able to start an analysis within one interaction.

**Entry points:** direct visit, logo click from anywhere, "Sign out" action, failed/cancelled OAuth.

**Layout:**
- Hero section: one-line value proposition, short supporting line.
- **Primary input card** with two entry modes as tabs or side-by-side options (implementer's choice of exact layout, but both must be equally prominent — neither is secondary):
  - **"Analyze a GitHub repo"**: single text input (placeholder: `https://github.com/owner/repo`) + button **"Visualize"**.
  - **"Analyze a local repo"**: button **"Choose Folder…"**.
- Below the input card: 3–4 example/preset public repos as clickable chips (e.g., "Try: facebook/react") for users who don't have a repo in mind yet.
- If logged in: small link/button "View my past repos →" linking to S-06.

**Actions table:**

| Element | Label | Enabled when | On click/submit | Result |
|---|---|---|---|---|
| URL input | — | always | typing | Live client-side validation (see Error state below); no action on keystroke besides validation |
| "Visualize" button | "Visualize" | input is non-empty AND passes URL format validation | click / Enter key | POST to create analysis job → on success, navigate to `/analyze/:jobId` (S-03). Button enters a brief inline loading spinner state until the job-creation call returns (this is the job *creation* call, not the full parse — should resolve in well under a second) |
| "Choose Folder…" button | "Choose Folder…" | browser supports File System Access API | click | Opens native OS folder picker via File System Access API. On selection, verify a `.git` directory exists inside the chosen folder, then navigate to `/analyze/:local` (a reserved jobId value indicating a client-side job) → S-03 |
| Example repo chip | e.g., "facebook/react" | always | click | Pre-fills URL input with that repo's URL and immediately triggers the same behavior as "Visualize" |
| "View my past repos →" | — | only visible if logged in | click | Navigate to `/my-repos` (S-06) |

**State: Loading** — N/A at the page level (the page itself doesn't load async data); only the "Visualize" button has a micro-loading state as described above.

**State: Success (default)** — the populated landing page described above. This *is* the default/only state of this screen.

**State: Empty** — N/A (this screen has no data-dependent empty state).

**State: Error:**
- Invalid URL format (e.g., not a `github.com` URL, or malformed): inline red text below the input, **"Enter a valid public GitHub repository URL, e.g. https://github.com/owner/repo"**. Input border turns red. "Visualize" button remains disabled until corrected.
- Job creation call fails (network/server error): toast, type=error: **"Couldn't start analysis. Please try again."** Input and button return to normal interactive state (not disabled) so the user can retry immediately.
- File System Access API unsupported (e.g., Firefox/Safari): "Choose Folder…" button is not hidden but shows a disabled state with adjacent helper text: **"Local repo analysis requires Chrome or Edge. You can still analyze any public GitHub repo above."**
- Selected local folder has no `.git` directory: toast, type=error: **"That folder doesn't look like a Git repository (no .git directory found)."** No navigation occurs; user remains on S-01.

---

## 4. S-02 — GitHub OAuth Callback (flow)

**Purpose:** Complete GitHub OAuth handshake. Not a designed "page" the user spends time on — it should resolve in under a second and redirect.

**Entry points:** Only reachable via redirect from GitHub after the user approves/denies the OAuth prompt initiated by "Sign in with GitHub".

**Behavior:**
1. On load, exchange the OAuth `code` query param for a session via the backend callback endpoint.
2. **Success:** set session (JWT + refresh cookie per TRD §5), then redirect:
   - If the user initiated sign-in from S-01 with no pending action → redirect to `/` with a success toast: **"Signed in as {username}."**
   - If the user initiated sign-in specifically to leave insight feedback or save a repo (i.e., there's a stored "return-to" URL from before the redirect) → redirect back to that exact prior screen/state and complete the originally-attempted action automatically (e.g., submit the pending thumbs-up).
3. **Error (user denied OAuth, or exchange fails):** redirect to `/` with an error toast: **"Sign-in was cancelled or failed. Please try again."** No session is created.

**States:** This screen shows only a brief centered loading spinner with text **"Signing you in…"** while the exchange completes (typically <1s) — Loading is effectively its only visible state; Success/Error both result in immediate redirect away from this route.

---

## 5. S-03 — Analysis Progress

**Purpose:** Show real-time progress while a repo is cloned/parsed (server-side) or parsed in-browser (local/WASM), before the workspace is ready.

**Entry points:** From S-01 ("Visualize" or "Choose Folder…"), or by directly visiting a shared `/analyze/:jobId` link for a job that hasn't finished yet.

**Layout:**
- Centered card: repo name/owner (or local folder name) as heading.
- Progress indicator: a stepper or progress bar reflecting discrete stages (see below), not a generic spinner — users should see *what* is happening, not just that something is happening.
- Stage list, each with a status icon (pending / in-progress / done):
  1. **Connecting** (validating repo / resolving default branch)
  2. **Cloning** (server path only; local path skips this stage entirely — it should not appear in the stepper for local jobs)
  3. **Parsing history** (commit/file/diff extraction)
  4. **Computing statistics** (churn, hotspots)
  5. **Generating insights** (AI narration — see note below)
- Below the stepper: small text showing live counters where available, e.g., "Parsed 640 / ~1,000 commits."
- "Cancel" text link, subdued styling (not a primary button).

**Actions table:**

| Element | Label | Enabled when | On click | Result |
|---|---|---|---|---|
| "Cancel" link | "Cancel" | always while status ≠ done | click | Abort the job (cancel server job or stop local WASM parse), navigate back to `/` (S-01) |
| (auto) | — | status becomes `done` | — | Auto-navigate to `/repo/:jobId/timeline` (S-04a) after a brief (≈500ms) success flash on the stepper, so the transition doesn't feel abrupt |

**State: Loading** — the stepper UI itself, described above, driven by SSE progress events (server jobs) or local progress callbacks (WASM jobs).

**State: Success** — N/A as a resting state; success immediately transitions to S-04 (see auto-navigate above). There is a momentary "all steps complete" visual (checkmarks filled in) before the redirect fires.

**State: Empty** — N/A.

**State: Error** (each renders the stepper frozen at the failed stage, with the failed step marked in an error color, plus a message card below and two actions: "Try Again" (re-submits the same input, returns to step 1) and "Back to Home"):
- **Repo not found / private repo:** **"This repository is private or doesn't exist. Git-History Time Traveller currently supports public repositories only."**
- **Repo too large / timeout exceeded:** **"This repository is taking longer than expected to analyze. Very large repositories may take additional time — you can keep waiting or try again later."** (This case offers a third action, "Keep Waiting," which simply keeps the stepper open rather than erroring out permanently — distinguish a hard failure from a slow-but-progressing job.)
- **Malformed/corrupted git data:** **"We couldn't parse this repository's history. It may be corrupted or use an unsupported Git feature."**
- **AI insight generation fails specifically** (stages 1–4 succeeded, stage 5 failed): this is **not** treated as a fatal error. The job still transitions to `done` and navigates to S-04; the Insights Panel (S-04d) instead shows its own scoped error/empty state (see §9). Insight generation failure must never block access to the visualizations, which are the core value even without AI narration.
- **Local (WASM) parse — browser runs out of memory / crashes:** **"Your browser ran out of memory analyzing this repository locally. Try a smaller repository, or analyze it via its public GitHub URL instead if it has one."**
- **Network error (server path only):** **"Connection lost while analyzing. Please check your connection and try again."**

---

## 6. S-04 — Analysis Workspace (parent shell)

**Purpose:** The core product experience — the container for the three visualization tabs, the persistent filter bar, and access to insights.

**Entry points:** Auto-navigation from S-03 on completion; direct visit to any `/repo/:jobId/*` URL (shared link) if that job's results are still cached; selecting a repo from S-06.

**Layout:**
- **Sub-header** (below global header): tab bar with three tabs — **Timeline**, **Heatmap**, **Contributors** — plus a persistent **Filter Bar** below or beside the tabs (implementer's choice of exact placement; must remain visible/accessible regardless of active tab, either always-visible or collapsible-but-one-click-away).
- **Insights toggle**: a button/icon, label **"Insights"**, typically top-right of the sub-header, opens/closes S-04d as a side drawer.
- Main canvas area: renders the active tab's visualization (S-04a/b/c).

**Filter Bar — Actions table** (persistent across all three tabs; changing a filter re-queries/re-renders all three tabs, not just the active one, so switching tabs never shows stale-filtered data):

| Element | Label | Enabled when | On change | Result |
|---|---|---|---|---|
| Date range picker | default: full repo history | always | select new range | All visualizations re-render scoped to the new range immediately (no separate "Apply" button — filters are live) |
| Author multi-select | default: all authors | always | toggle one or more authors | Live re-render scoped to selected authors; if zero authors selected, treat as "all" (prevent an accidental fully-empty state from a stray deselect-all) |
| File path/type filter | placeholder: "Filter by path or extension…" | always | type (debounced ~300ms) | Live re-render scoped to matching paths |
| Branch selector | default: repository's default branch | only enabled if repo has >1 branch detected; otherwise hidden entirely | select | Re-triggers a fresh parse scoped to that branch (this is heavier than the other filters — show a small inline loading indicator on the visualization canvas, not a full navigation back to S-03) |
| "Clear filters" link | "Clear filters" | only visible when at least one filter differs from default | click | Reset all filters to default, live re-render |

**Tab bar — Actions table:**

| Element | Label | Enabled when | On click | Result |
|---|---|---|---|---|
| Timeline tab | "Timeline" | always | click | Navigate to `/repo/:jobId/timeline`, render S-04a. Filter state persists across tab switches |
| Heatmap tab | "Heatmap" | always | click | Navigate to `/repo/:jobId/heatmap`, render S-04b |
| Contributors tab | "Contributors" | always | click | Navigate to `/repo/:jobId/contributors`, render S-04c |
| Insights toggle | "Insights" | always | click | Open S-04d drawer (overlay, does not navigate/change route) |

---

### 6a. S-04a — Timeline Tab

**Purpose:** Cinematic playback of the file tree evolving over time.

**Layout:**
- Full-canvas WebGL/Canvas rendering of the file tree at the current point in history.
- Playback control bar (bottom, fixed):
  - Jump-to-start button (icon: `|◀`)
  - Play/Pause toggle button (icon: `▶` / `⏸`)
  - Jump-to-end button (icon: `▶|`)
  - Scrub bar (draggable handle + click-anywhere-to-seek), spanning the filtered date range
  - Current position label: commit date + short SHA + author (e.g., "Mar 14, 2024 · a1b2c3d · @octocat")
  - Speed selector dropdown: options **0.5x, 1x (default), 2x, 4x**

**Actions table:**

| Element | Label | Enabled when | On click/drag | Result |
|---|---|---|---|---|
| Play/Pause | ▶ / ⏸ | data loaded | click | Toggle playback; icon swaps between the two states; canvas animates forward through commits at the selected speed |
| Jump-to-start | \|◀ | current position ≠ start | click | Pause if playing; seek to first commit in range |
| Jump-to-end | ▶\| | current position ≠ end | click | Pause if playing; seek to last commit in range |
| Scrub bar | — | data loaded | drag / click | Pause if playing; seek canvas to the corresponding point in history in real time as the user drags |
| Speed selector | 0.5x/1x/2x/4x | data loaded | select | Change playback speed; takes effect immediately, including mid-playback |
| File node (in canvas) | — | data loaded | click | Open S-04e File Detail Drawer scoped to that file, pausing playback if active |

**State: Loading** — skeleton/placeholder canvas with a centered spinner and text "Rendering timeline…" (distinct from the S-03 parse progress — this is the client-side render setup, should be near-instant since data is already fetched, but shown defensively for large datasets).

**State: Success** — the populated, interactive canvas described above, playback paused at the start position by default on first load.

**State: Empty** — if the current filter combination yields zero commits (e.g., an author filter + narrow date range that excludes all activity): canvas replaced with centered message: **"No commits match the current filters."** + a **"Clear filters"** button (same behavior as the filter bar's clear-filters action).

**State: Error** — if timeline data specifically fails to load/render (but the job itself succeeded): centered message **"Couldn't load the timeline view."** + **"Retry"** button that re-fetches just this tab's data without affecting Heatmap/Contributors.

---

### 6b. S-04b — Heatmap Tab

**Purpose:** Show churn/risk concentration across files and directories at a glance.

**Layout:**
- Treemap or grid-based heatmap of the file tree, cell size proportional to file size or commit count (implementer's choice, but must be documented in a visible legend), cell color intensity proportional to churn.
- Legend (fixed corner): color scale from low → high churn, with a granularity toggle: **"By file" / "By folder"** (default: by file).
- Hover tooltip on any cell: file/folder path, total commits, last modified date, primary author.

**Actions table:**

| Element | Label | Enabled when | On hover | On click | Result |
|---|---|---|---|---|---|
| Heatmap cell | — | data loaded | show tooltip (path, commit count, last modified, primary author) | click | Open S-04e File Detail Drawer scoped to that file/folder |
| Granularity toggle | "By file" / "By folder" | data loaded | — | click | Re-render heatmap at the selected granularity; live, no page reload |

**State: Loading** — skeleton grid placeholder with shimmer effect, text "Calculating churn…".

**State: Success** — populated heatmap as described.

**State: Empty** — same trigger and same treatment as S-04a's empty state (filtered to zero commits): **"No commits match the current filters."** + "Clear filters" button.

**State: Error** — same pattern as S-04a: **"Couldn't load the heatmap view."** + "Retry" button scoped to this tab only.

---

### 6c. S-04c — Contributor Graph Tab

**Purpose:** Visualize contributor-to-file relationships, ownership concentration, and collaboration patterns.

**Layout:**
- Force-directed graph: contributor nodes (sized by commit count) connected to file/module nodes they've touched.
- Pan/zoom enabled on the canvas (scroll to zoom, drag background to pan).
- Sidebar-free by default; selecting a node reveals detail inline (see below) rather than opening a separate drawer, since the graph itself is the primary content.

**Actions table:**

| Element | Label | Enabled when | On hover | On click | Result |
|---|---|---|---|---|---|
| Contributor node | — | data loaded | highlight all connected file edges/nodes, dim the rest | click | Filter all three tabs (Timeline, Heatmap, this graph) to that contributor's commits only — this is equivalent to programmatically setting the Filter Bar's author filter to just this person, so the active filter chip updates to reflect it and the change persists across tabs |
| File/module node | — | data loaded | highlight connected contributors, dim the rest | click | Open S-04e File Detail Drawer scoped to that file |
| Canvas background | — | data loaded | — | click | Deselect / clear any hover-highlight state (does not clear the author filter — that requires the explicit "Clear filters" action) |

**State: Loading** — centered spinner, text "Mapping contributors…".

**State: Success** — populated, interactive graph as described.

**State: Empty** — same pattern: filtered-to-zero-commits case shows **"No commits match the current filters."** + "Clear filters." Additionally, a **distinct** empty case: a repository with a single contributor and no meaningful graph to show renders: **"This repository has a single contributor — nothing to compare yet."** (no "Clear filters" button in this case, since filters aren't the cause).

**State: Error** — same pattern: **"Couldn't load the contributor graph."** + "Retry" button scoped to this tab.

---

## 7. S-04d — Insights Panel (drawer)

**Purpose:** Surface AI-generated hotspot/technical-debt narration.

**Entry points:** "Insights" toggle in the workspace sub-header (§6); opened automatically is *not* the default — users opt in to see it.

**Layout:** Right-side slide-in drawer, overlays the current tab without navigating away from it. Contains a list of insight cards, most-significant-first. Each card:
- File/module path (clickable, opens S-04e for that file)
- Plain-language AI summary (e.g., "This module has changed 3x more than the repository average in the last 90 days, with no accompanying test file changes.")
- Two feedback buttons: thumbs-up icon, thumbs-down icon (mutually exclusive toggle — selecting one deselects the other if previously set)
- Close button (X) at the top of the drawer, or click-outside-to-close

**Actions table:**

| Element | Label | Enabled when | On click | Result |
|---|---|---|---|---|
| Insight card path | (file path text) | always | click | Close drawer, open S-04e File Detail Drawer for that file |
| Thumbs-up | — | user is logged in | click | If not logged in: redirect to GitHub OAuth (S-02) with a return-to pointer back to this exact drawer/card state, then auto-submit the vote on return (per S-02 behavior). If logged in: submit feedback immediately, icon fills to indicate selected state, brief toast: "Thanks for the feedback." |
| Thumbs-down | — | user is logged in | click | Same behavior as thumbs-up, opposite vote value |
| Close (X) | — | always | click | Close drawer, no navigation change |

**State: Loading** — if the drawer is opened before insight generation has finished (edge case: user opens it very quickly after landing on S-04, or the async insight job is still running post-navigation per S-03's note that insight failure/delay doesn't block workspace access): skeleton cards with shimmer, text "Generating insights…" with a live-updating status if available.

**State: Success** — populated list of insight cards as described, ordered by severity/significance.

**State: Empty** — repository has no meaningful hotspots (e.g., very small/young repo, or uniformly low churn): **"No significant hotspots detected — this repository's change activity looks evenly distributed."** No feedback buttons shown (nothing to rate).

**State: Error** — AI insight generation failed (per S-03's note, this doesn't block the rest of the app): **"AI insights aren't available right now."** followed by a **fallback**, not just an apology: a plain, non-narrated list of the top files by raw churn count (computed statistics only, no LLM narration) with a small label **"Showing raw churn data instead."** This ensures the panel is never simply broken — it degrades to the underlying data.

---

## 8. S-04e — File Detail Drawer

**Purpose:** Focused view of a single file's history, reachable from any tab.

**Entry points:** clicking a file node in Timeline, a cell in Heatmap, a file node in Contributors, or an insight card path in S-04d.

**Layout:** Left or right slide-in drawer (should not be the same side as the Insights panel if both could theoretically be triggered in sequence — Insights should auto-close if File Detail opens, and vice versa, since only one drawer is open at a time per §12.2's "one overlay at a time" rule extended to drawers).
- File path as heading, with breadcrumb-style path segments.
- Mini commit-frequency sparkline across the filtered date range.
- List of commits touching this file (most recent first): date, short SHA, author, commit message (truncated to one line).
- "View full history" link if the list is truncated (paginated, 20 at a time — "Load more" button at bottom rather than infinite scroll, so behavior is deterministic).

**Actions table:**

| Element | Label | Enabled when | On click | Result |
|---|---|---|---|---|
| Close (X) | — | always | click | Close drawer |
| Commit row | — | always | click | Copy commit SHA to clipboard, toast: "Commit a1b2c3d copied." (v1 does not deep-link into GitHub's own commit view automatically to avoid implying an integration that isn't built — copying the SHA is the safe, explicit action) |
| "Load more" | "Load more" | more commits exist beyond current page | click | Append next 20 commits to the list; button shows a brief inline loading state, then disappears once all commits are loaded |

**State: Loading** — skeleton rows, text "Loading file history…".

**State: Success** — populated as described.

**State: Empty** — N/A in practice (a file only appears in this drawer because it was clicked from a visualization that already proves it has history); if somehow zero commits resolve (edge case, e.g., filter changed between click and load): **"No commits found for this file in the current filter range."** + "Clear filters" button.

**State: Error** — **"Couldn't load history for this file."** + "Retry" button.

---

## 9. S-05 — Export Modal

**Purpose:** Produce a shareable GIF or video of the current (filtered) visualization.

**Entry points:** "Export" button in the global header (visible only on S-04 routes, per §2).

**Layout:**
- Modal title: "Export Timeline"
- Format selector (radio buttons): **"GIF"** (default) / **"Video (WebM)"**
- Scope toggle: **"Current filtered view"** (default, if any filters are active) / **"Full history"**
- Note text: "Export captures the Timeline tab's playback. Switch to Timeline before exporting if you're on another tab." — if the user is currently on Heatmap or Contributors when opening this modal, this note is shown with slightly stronger emphasis (not an error, just guidance, since v1 only exports the timeline animation)
- Primary button: **"Start Export"**
- Secondary button: **"Cancel"**

**Actions table:**

| Element | Label | Enabled when | On click | Result |
|---|---|---|---|---|
| Format radio | GIF / Video | always | select | Updates selected format, no other effect until "Start Export" |
| Scope toggle | Current filtered view / Full history | always | select | Updates selected scope |
| "Start Export" | "Start Export" | always (unless browser lacks MediaRecorder support — see Error state) | click | Modal content swaps to an in-progress state: progress bar reflecting frame-capture progress (0–100%), "Cancel Export" button replaces "Start Export." On completion, modal content swaps again to show a preview thumbnail/loop + **"Download"** button + **"Close"** button |
| "Cancel" (pre-export) | "Cancel" | always | click | Close modal, no action taken |
| "Cancel Export" (mid-export) | "Cancel Export" | while exporting | click | Abort capture, modal returns to the initial pre-export state (not closed, so the user can retry without re-opening) |
| "Download" (post-export) | "Download" | export completed | click | Trigger browser file download of the generated GIF/WebM; modal remains open in case the user wants to also copy a share link |
| "Close" (post-export) | "Close" | export completed | click | Close modal |

**State: Loading** — the "in-progress" capture state described above (progress bar).

**State: Success** — the completed-with-preview state described above.

**State: Empty** — N/A (this modal has no data-fetch empty state; it operates on already-loaded visualization data).

**State: Error:**
- Browser lacks MediaRecorder support (older/unsupported browsers): "Start Export" is disabled, with helper text: **"Export isn't supported in this browser. Try Chrome, Edge, or Firefox."**
- Capture fails mid-process (e.g., tab backgrounded, resource exhaustion): modal returns to pre-export state with an inline error line above the buttons: **"Export failed. Please try again — keeping this tab in the foreground during export helps."**

---

## 10. S-06 — My Repos / History

**Purpose:** Let a logged-in user revisit previously analyzed repositories.

**Entry points:** header "My Repos" link/nav item (visible only when logged in), S-01's "View my past repos →" link, S-07 Account Menu.

**Layout:**
- Page heading: "My Repos"
- List/grid of cards, each representing a past analysis: repo name/owner (or local folder name), thumbnail (static snapshot of the heatmap, if feasible — otherwise a generic icon), date analyzed, "View" button, overflow menu with "Remove from history."

**Actions table:**

| Element | Label | Enabled when | On click | Result |
|---|---|---|---|---|
| Repo card / "View" | "View" | always | click | Navigate to `/repo/:jobId/timeline` (S-04a) for that saved analysis. If the cached result has since expired server-side (per TRD §4 TTL policy), this instead behaves like visiting an expired shared link — see S-04's expired-link handling in the Error state below |
| Overflow → "Remove from history" | "Remove from history" | always | click | Open a confirmation dialog (per §12.3): "Remove {repo name} from your history? This won't delete the analysis for other viewers with the link, only from your list." Confirm → remove the entry, toast "Removed from history." Cancel → dialog closes, no change |

**State: Loading** — skeleton list of 3–4 placeholder cards.

**State: Success** — populated list as described, most recent first.

**State: Empty** — **"You haven't analyzed any repos yet."** + primary button **"Analyze a repo"** linking back to `/` (S-01).

**State: Error** — failed to load history list: **"Couldn't load your repo history."** + "Retry" button.

**Auth guard:** if an unauthenticated user reaches `/my-repos` directly (typed URL, stale bookmark), redirect to `/` and show a toast: **"Sign in to view your saved repos."** — do not show an empty/broken version of this page to logged-out users.

---

## 11. S-07 — Account Menu (dropdown)

**Purpose:** Quick access to account-scoped destinations and sign-out.

**Entry points:** click on avatar/username in the global header (only rendered when logged in, per §2).

**Layout:** simple dropdown anchored below the avatar:
- Username display (non-interactive)
- "My Repos" link
- "Settings" link
- Divider
- "Sign out"

**Actions table:**

| Element | Label | Enabled when | On click | Result |
|---|---|---|---|---|
| "My Repos" | "My Repos" | always | click | Close menu, navigate to `/my-repos` (S-06) |
| "Settings" | "Settings" | always | click | Close menu, navigate to `/settings` (S-08) |
| "Sign out" | "Sign out" | always | click | Close menu, clear session (invalidate JWT/refresh cookie), navigate to `/` (S-01), toast: "Signed out." |
| Click outside menu | — | menu open | click | Close menu, no other effect |

**States:** No Loading/Empty/Error states — this is a static, locally-rendered dropdown with no data fetch.

---

## 12. S-08 — Settings & Privacy

**Purpose:** Minimal account and data-control surface for v1 — intentionally small scope, matching the PRD's v1 boundaries (no team/org settings, no notification preferences).

**Entry points:** S-07 Account Menu "Settings" link.

**Layout:**
- "Account" section: connected GitHub identity (read-only display, avatar + username), "Sign out" button (duplicate of the account-menu action, provided here for discoverability).
- "Data & Privacy" section: explanation text that cached analysis data expires automatically (referencing the TTL policy in plain language, e.g., "Analyses are automatically deleted after 30 days"), plus a button **"Delete all my saved repo history now"**.

**Actions table:**

| Element | Label | Enabled when | On click | Result |
|---|---|---|---|---|
| "Sign out" | "Sign out" | always | click | Same behavior as S-07's sign-out |
| "Delete all my saved repo history now" | "Delete all my saved repo history now" | user has ≥1 saved repo | click | Open confirmation dialog (§12.3): "This will permanently remove all repos from your history. This can't be undone." Confirm → delete, toast "History cleared," "My Repos" (S-06) will now show its Empty state. Cancel → no change |

**State: Loading** — brief skeleton while account info loads.

**State: Success** — populated as described.

**State: Empty** — N/A (page always shows the same structure; "Delete all" is simply disabled if there's nothing to delete, per the Actions table's enabled condition).

**State: Error** — failed to load account info: **"Couldn't load your account settings."** + "Retry" button.

---

## 13. S-09 — 404 / Not Found

**Purpose:** Handle any unmatched route.

**Layout:** Centered message: **"Page not found."** + button **"Back to Home"** → navigates to `/`.

**States:** This screen has no data dependency — it has only one state, described above.

---

## 14. S-10 — Fatal Error Screen

**Purpose:** Last-resort fallback for unrecoverable errors (e.g., a JS runtime exception caught by a top-level error boundary), distinct from the scoped, in-place errors defined per-screen above.

**Layout:** Centered message: **"Something went wrong."** + short reassurance line: "Your analyzed repos are safe — this was a temporary problem." + button **"Reload"** (does a full page reload) and a secondary text link **"Back to Home."**

**Trigger:** any uncaught exception in the render tree, caught by a top-level error boundary component wrapping S-00.

---

## 15. Cross-Cutting Global States

These apply across every screen and are not repeated per-screen above.

| Condition | Behavior |
|---|---|
| **Session expired mid-use (401 from API)** | Silent attempt to refresh the session via the refresh cookie. If refresh also fails: clear local auth state, show toast **"Your session expired — please sign in again."** Do not force-navigate away from the current screen if the current screen doesn't require auth (e.g., stay on S-04 workspace, just drop to logged-out header state); if the current screen requires auth (S-06, S-08), redirect to `/` |
| **Rate limited (429)** | Toast, type=warning: **"You're doing that a bit too fast — please wait a moment and try again."** No navigation change. The specific triggering action (button/input) returns to its normal enabled state so the user can retry once ready, rather than staying stuck in a loading state |
| **Server error (5xx) on any data fetch** | Handled per-screen via each screen's own Error state defined above; there is no separate global 5xx screen — the goal is always to fail in place, scoped to the smallest possible unit (a single tab, a single drawer), not to blow away the whole workspace |
| **Offline (no network)** | Toast, type=warning, persistent until connection restores: **"You're offline — some features may not work."** Local-repo (WASM) analysis continues to function offline since it requires no server; server-dependent actions (submitting a URL, loading a saved repo, exporting insight feedback) queue their error state normally when attempted while offline |
| **Shared link to an expired/expunged analysis** (`/repo/:jobId/*` where the jobId's cached data has passed its TTL) | Render in place of the workspace: **"This analysis has expired and is no longer available."** + button **"Re-analyze this repo"** (only shown if the original source was a public GitHub URL — the system stores the source URL alongside the job, so it can pre-fill and re-trigger S-03 without asking the user to remember/re-paste it). If the original source was a local repo, show the same expired message without a re-analyze button, since local sources can't be re-fetched by the server: **"This analysis has expired. Local repo analyses aren't stored — please re-select the folder to view it again."** |

---

## 16. Global Reusable Components

### 16.1 Toast Notification System
- Position: fixed top-right.
- Types: `success` (used for confirmations), `info` (neutral status), `warning` (rate limits, offline), `error` (failed actions).
- Auto-dismiss: 5 seconds for `success`/`info`; `warning`/`error` persist until manually dismissed or superseded, since they often indicate the user should take a different action rather than just acknowledge and move on.
- Manual dismiss: small "×" on every toast regardless of type.
- Stacking: multiple toasts stack vertically, newest on top; max 3 visible at once, older ones collapse into a "+N more" summary toast.

### 16.2 Modal System
- Centered overlay, dimmed backdrop (click-outside closes the modal **unless** an action is mid-flight, e.g., mid-export in S-05, in which case click-outside is disabled to prevent accidental loss of progress).
- Only one modal open at a time app-wide; opening a second closes the first.
- Escape key closes the active modal (same mid-flight exception as above).

### 16.3 Confirmation Dialog
- Used for destructive/irreversible actions only (removing history items, deleting all history). Never used for reversible actions (e.g., clearing filters, which needs no confirmation since it's instantly undoable by re-selecting filters).
- Pattern: title + one-sentence consequence description + "Cancel" (secondary, left) + destructive action button (primary, right, labeled with the specific action, e.g., "Remove" or "Delete All" — never a generic "OK").

### 16.4 Drawers (Insights, File Detail)
- Only one drawer open at a time; opening a second closes the first (same rule as modals, applied to the drawer layer).
- Close via explicit "X" button or click-outside; Escape key also closes.

---

## 17. Traceability to PRD Features

| PRD feature | Screens/flows implementing it |
|---|---|
| Repository ingestion (local + GitHub URL) | S-01, S-03 |
| Animated timeline view | S-04a |
| Code churn heatmap | S-04b |
| Contributor network graph | S-04c |
| AI-powered insights & hotspot detection | S-04d, with graceful degradation on failure |
| Filtering controls | Filter Bar in S-04 (§6), applies across S-04a/b/c |
| Export & sharing | S-05 (export), Share icon in S-00 header (link sharing) |

---

## Appendix: Inputs to This Document

This app flow implements the feature set defined in `Git-History-Time-Traveller-PRD.md` (v1.0) using the architecture and constraints defined in `Git-History-Time-Traveller-TRD.md` (v1.0) — notably: background job processing (reflected in S-03's stepper design), client-side parsing for local repos (reflected in S-01/S-03's local-folder path and its distinct error states), SSE-based progress updates (reflected in S-03's live counters), and the decision that AI insight failure must not block core visualization access (reflected in S-04d's degrade-gracefully error state).
