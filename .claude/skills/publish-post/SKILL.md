---
name: publish-post
description: Finalise a draft post and publish it (build check, flip draft to false, commit, then push after confirmation). Only run when the user explicitly asks to publish.
argument-hint: <post-slug-or-folder>
disable-model-invocation: true
---

Publish an existing draft post. Pushing to `main` deploys the public site, so the final step needs explicit confirmation.

1. **Locate the post**: `content/posts/*<argument>*/index.md` (if ambiguous or no argument, run `hugo list drafts` and ask).
2. **Pre-flight review** — read the post fully and check:
   - front matter complete: title, date, tags (1–4, reused), summary, `math` only if needed
   - no leftover `TODO` comments or placeholder text
   - no employer-derived or confidential content (CLAUDE.md rule 1); no secrets/tokens/absolute local paths in code output or logs
   - all images exist, have alt text, are < 1 MB; no weights/datasets/huge logs in the folder
   - numbers in the text match the tables/figures; claims match the evidence
   - repo links resolve (pinned commit/tag preferred)
   Report any issues and fix the trivial ones; ask about the rest.
3. **Finalise**: set `draft: false` and `date:` to today's date (the folder name may keep its original date).
4. **Build check**: `hugo --gc --minify -d "$TMPDIR/hugo-out"` succeeds; confirm the post appears in the output (`posts/<folder>/index.html`) and drafts aren't leaking.
5. **Commit** only this post's changes: `git add content/posts/<folder>` plus any intentional site changes, message like `Add post: <title>`, with the standard attribution trailer.
6. **Ask before pushing.** Show the commit and state that pushing will deploy publicly. Only run `git push` after a clear yes, then offer `gh run watch` to follow the deployment.
