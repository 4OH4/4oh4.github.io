---
name: new-post
description: Draft a new blog post from an experiment repo, results, or rough notes. Use when the user wants to write up an experiment, model trial, or technique for the blog.
argument-hint: <path-to-experiment-repo-or-notes> [topic/angle]
---

Draft a blog post in this repo from the user's experiment. Read `CLAUDE.md` first — its hard rules and conventions apply (especially: no employer-derived content, never invent results, draft only, no push).

## 1. Gather source material (read-only)

The argument is a path to an experiment repo, a results folder, or a notes file (ask if none was given). In that source, look at, in order: README, notebooks/scripts, result files (json/csv/logs/metrics), figures, `requirements`/lockfile, `git log -5` and current commit hash. Do not modify the experiment repo.

Collect the facts you need: what was tried and why, exact models/versions/revisions, hardware, library versions, dataset, key numbers, failures and surprises, and the repo URL (`git remote -v`) + commit for the Reproduce section. If a necessary fact is absent, ask the user or leave a `<!-- TODO -->` — don't guess.

Confidentiality scan: if anything looks work-related (internal hostnames, company/customer names, private datasets, proprietary prompts), stop and ask before using it.

## 2. Scaffold

Pick a short kebab-case slug, then:

```
hugo new content posts/$(date +%F)-<slug>
```

(If `hugo` isn't on PATH, see CLAUDE.md for the binary location.) This creates `content/posts/<date>-<slug>/index.md` from `archetypes/posts/`.

## 3. Write

- Fill front matter: specific `title`, 1–4 reused `tags` (check existing posts with grep), a 1–2 sentence `summary`, `math: true` only if LaTeX is used. Leave `draft: true`.
- Follow the structure and voice in CLAUDE.md. Lead with a TL;DR containing the actual finding. Report numbers exactly as in the source outputs; say how many runs, and don't claim significance you didn't measure.
- Copy only the needed figures into the post folder (< 1 MB each, descriptive filenames, alt text). Generate tables in Markdown from the real result files. If a chart would help and none exists, propose one rather than fabricating data.
- Include a Reproduce section: repo link pinned to the commit, key commands, environment.
- Aim for 600–1500 words unless the material demands more. Cut filler and hype.

## 4. Verify

1. Build check: `hugo --gc --minify -d "$TMPDIR/hugo-out"` — must succeed with no new warnings/errors.
2. Confirm every image/link path in the post resolves, and no `TODO` remains unmentioned.
3. Tell the user to preview with `hugo server -D` (or start it in the background if they ask).

## 5. Hand off

Report: the post path, the main claim, any TODOs/gaps and facts you couldn't verify, and anything you excluded for confidentiality reasons. Do not commit, and do not set `draft: false` — that's `/publish-post`.
