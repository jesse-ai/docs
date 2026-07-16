---
name: update-changelog
description: >-
  Add entries to the Jesse changelog (docs/docs/docs/changelog.md). Use whenever
  Saleh asks to "add logs / changelog entries for the changes we made". Encodes
  the append-vs-new-version rule and an explicit-authorization boundary: edit
  only by default, with no branch, stage, commit, push, merge, or deploy action
  unless Saleh specifically requests it.
---

# Updating the Jesse changelog

The changelog lives at **`docs/docs/docs/changelog.md`** in this repo (`jesse-ai/docs`).
Resolve the repository root with `git rev-parse --show-toplevel`; never assume a
device-specific workspace path. It is rendered on the public docs website.

## Authorization boundary

A request to add, edit, or update changelog entries authorizes **only the file
edit**. Do not create or switch branches, stage files, commit, push, merge, or
deploy unless Saleh explicitly requests that action. Do not infer permission
from wording such as "add", "update", "finish", "ship", or "done".

Pushing to `master` **deploys to the website**. Never push to `master` or merge
into it unless Saleh explicitly asks to deploy. If a push is requested while the
current branch is `master`, stop and ask whether to create or switch to a
non-deploy branch; do not create or switch branches without that authorization.

If Saleh asks for a commit but not a push, commit locally only. If he asks for a
push but not a merge or deployment, push only the explicitly approved
non-`master` branch.

## Append to the current version, or start a new one?

The changelog lists versions newest-first as `## X.Y.Z (D Month YYYY)`.

- **If the top version is still unreleased** — i.e. it exists only on a working
  branch and has **not** been merged/pushed to `master` (not deployed yet) — then
  **append** your new bullets to that top version. We keep accumulating logs under
  the same version until it actually ships.
- **If the top version is already on `master`** (released / deployed), then
  **create a new version section** above it.

How to tell: check whether the top version block is already in `origin/master`
(`git show origin/master:docs/docs/docs/changelog.md | head`). If the latest entry
there matches the file's top entry, the top version is released → start a new one.
If your branch's top version isn't in `origin/master` yet, keep appending to it.

## Version number for a new version

Use the next version after the Jesse package's current version. Resolve the workspace
from this repository rather than assuming a home-directory layout:

```bash
DOCS_ROOT="$(git rev-parse --show-toplevel)"
WORKSPACE_ROOT="$(dirname "$DOCS_ROOT")"
```

Then read `"$WORKSPACE_ROOT/jesse/jesse/version.py"` (`__version__`). If the changelog
has fallen behind the package version, surface that to Saleh rather than silently
guessing — the release number is ultimately his call, and he can adjust it in review.

## Entry format

```
## 2.3.4 (4 June 2026)

- **[NEW]** A user-facing description of a new capability.
- **[FIX]** What was broken and what it means for the user.
- **[IMPROVEMENT]** A refinement to existing behavior.
```

Tags: `**[NEW]**`, `**[FIX]**`, `**[IMPROVEMENT]**`. Date format: `D Month YYYY`.

**Keep every entry simple and non-technical — this is for everyday users, not
developers.** One short sentence each. Say what changed in plain language, no
internals (no function names, error classes, stack traces, "worker process",
"endpoint", etc.). Prefer terse: e.g. "Added optimization mode over MCP." Fold
related internal fixes into one user-facing line rather than listing each
technical cause. Credit external contributors with a GitHub link when applicable,
the way existing entries do.

## Workflow

### Default: edit only

1. Resolve the repository root and inspect the current branch, worktree, and
   relevant release section without changing git state.
2. Edit `docs/docs/docs/changelog.md` — append to the top version, or insert a new
   version block right under the `# Jesse Changelog` intro.
3. Run `git diff --check` and review the changelog diff.
4. Tell Saleh what changed and explicitly state that it remains uncommitted and
   unpushed.

### Git follow-through: only when explicitly requested

- Create or switch branches only when Saleh explicitly requests it.
- Stage only the requested changelog or skill files; preserve unrelated work.
- Commit only when Saleh explicitly requests a commit.
- Push only when Saleh explicitly requests a push, and never push `master`
  unless he explicitly asks to deploy.
- Merge or deploy only when Saleh explicitly requests that specific action.
