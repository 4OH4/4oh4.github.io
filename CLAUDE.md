# 4oh4.github.io — personal AI engineering blog

Hugo + PaperMod (git submodule), deployed to GitHub Pages by `.github/workflows/hugo.yml` on every push to `main`.

**Purpose:** Rupert works full-time in AI engineering but can't discuss most of that publicly. This blog is a lab notebook for things tried on personal time — new models, techniques, tools — written up to support career development and engagement with the open-source/research community. Experiments are run in **separate repos**; this repo holds only the write-ups.

## Hard rules

1. **Never publish anything from the employer.** No internal data, code, prompts, model names, customer/project names, or hints of them. Posts are about personal-time experiments on public models/data only. If source material looks like it might be work-derived, stop and ask.
2. **Pushing to `main` publishes the site.** Never `git push` without explicit confirmation in the current conversation. Committing locally is fine when asked.
3. **New posts are `draft: true`.** Only flip to `false` via the `/publish-post` flow or when explicitly told.
4. **Never invent results.** Every number, table, chart and quote must come from the experiment repo's actual outputs. If something is missing, leave a visible `<!-- TODO: ... -->` and tell the user.

## Commands

```
hugo new content posts/YYYY-MM-DD-slug   # scaffold a post bundle from archetypes/posts/
hugo server -D                           # local preview incl. drafts, http://localhost:1313
hugo --gc --minify -d "$TMPDIR/hugo-out" # production-style build check (don't build into public/)
hugo list drafts                         # what's still unpublished
```

- CI pins Hugo **extended 0.166.0** (`HUGO_VERSION` in the workflow). Keep the local version in sync; bump both together. PaperMod needs ≥ 0.146.
- On this Windows machine Hugo is installed via winget. If `hugo` isn't on PATH in a shell, use `C:\Users\rst\AppData\Local\Microsoft\WinGet\Packages\Hugo.Hugo.Extended_Microsoft.Winget.Source_8wekyb3d8bbwe\hugo.exe`.
- After cloning: `git submodule update --init --recursive` (theme lives in `themes/PaperMod`).
- Two `.Language.*` deprecation warnings come from the theme; ignore them unless the build fails.

## Layout

```
hugo.toml                       site config (menu, params, search output, markup)
content/posts/<date>-<slug>/    one page bundle per post: index.md + images/data beside it
content/{about,archives,search}.md   fixed pages — don't delete; archives/search use theme layouts
archetypes/posts/index.md       post scaffold (YAML front matter)
layouts/partials/extend_head.html    loads KaTeX only on posts with `math: true`
.claude/skills/                 new-post, publish-post workflows
```

Don't edit `themes/PaperMod` (submodule). Override via files in `layouts/` or `assets/css/extended/`.

## Post conventions

- Folder: `content/posts/YYYY-MM-DD-short-kebab-slug/index.md`, date = day of creation.
- Front matter is **YAML** (`---`), matching existing posts:
  ```yaml
  title: "Concrete, specific title"     # say what was tried, e.g. "Running Qwen3 locally with llama.cpp"
  date: 2026-09-20
  draft: true
  tags: ["llm", "inference"]            # 1–4, lowercase, reuse existing tags (grep content/posts)
  summary: "One or two sentences shown in listings and link previews."
  math: true                            # only if the post has LaTeX
  ```
- Optional: `cover: {image: cover.png, alt: "..."}`, `ShowToc: false` for short posts.
- Images/data go in the post's own folder and are referenced relatively: `![alt](results.png)`. Always write alt text. Keep images < 1 MB (compress/resize); never commit model weights, datasets or large raw logs — link to the experiment repo instead.
- Math: KaTeX auto-render with `$…$` and `$$…$$`. A literal dollar sign in prose in a `math: true` post must be written `\$`. Prefer `math: false` unless needed.
- Code: fenced blocks with a language tag. Trim outputs to the informative part.
- Links to the experiment repo: use a full GitHub URL, ideally pinned to a commit/tag so results stay reproducible.
- Emoji shortcodes are enabled; use sparingly.

## Voice and structure

First person, plain, honest lab-notebook tone. Not marketing, not tutorial-polished. Include what failed and what surprised. State the setup precisely enough to reproduce (model + version/revision, hardware, library versions, seeds, dataset) and be upfront about limits (single run, small sample, no significance testing). Don't overclaim.

Default shape (drop sections that don't apply): **TL;DR** → **Motivation** (why try this) → **Setup** → **Results** (tables/plots, actual numbers) → **What broke / surprises** → **Takeaways** → **Reproduce** (repo link, commit, commands). Typical length 600–1500 words.

Tag vocabulary so far: `meta`. Add new tags sparingly and reuse (e.g. `llm`, `inference`, `fine-tuning`, `evals`, `agents`, `rag`, `embeddings`, `vision`, `benchmarks`, `tooling`).

## Workflow

- Write a post from an experiment repo: `/new-post <path-to-experiment-repo> [notes]`
- Ship it: `/publish-post <slug>` (build check → draft false → commit → asks before pushing)
