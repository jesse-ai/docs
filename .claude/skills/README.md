# Shared Agent Skills

This directory holds project-level Agent Skills for the Jesse documentation repository. Claude Code discovers them directly from this directory; Codex discovers the same canonical files through `.agents/skills`. Both load a skill's full body on demand when its `description` matches the task.

## Skills in this repo

- `update-changelog/` — safe workflow and formatting rules for Jesse changelog updates.
