# Jesse Documentation Repository Guide for AI Agents

## Skills

This repo stores shared **Agent Skills** in `.claude/skills/` — focused, task-specific playbooks used by Claude Code and Codex. Codex also discovers them through the repository-relative `.agents/skills` symlink.

Before starting a task, scan the YAML frontmatter of every `.claude/skills/*/SKILL.md`. When a skill's `description` matches the task, read that `SKILL.md` completely before acting. A matching skill is the authoritative reference for what it covers, and its details are deliberately kept out of this file. This scan is the cross-platform fallback if native skill discovery or symlink support is unavailable.

- **`update-changelog`** — safe release-bucket selection, changelog wording, branching, and push workflow.
