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
content/{archives,search}.md         fixed pages — don't delete; archives/search use theme layouts
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

Plain, honest lab-notebook tone. Not marketing, not tutorial-polished. Include what failed and what surprised. State the setup precisely enough to reproduce (model + version/revision, hardware, library versions, seeds, dataset) and be upfront about limits (single run, small sample, no significance testing). Don't overclaim.

Default shape (drop sections that don't apply): **TL;DR** → **Motivation** (why try this) → **Setup** → **Results** (tables/plots, actual numbers) → **What broke / surprises** → **Takeaways** → **Reproduce** (repo link, commit, commands). Typical length 600–1500 words.

Tag vocabulary so far: `meta`. Add new tags sparingly and reuse (e.g. `llm`, `inference`, `fine-tuning`, `evals`, `agents`, `rag`, `embeddings`, `vision`, `benchmarks`, `tooling`).

### Purpose and reader
The reader is a technically competent peer: an engineer or technical lead who knows the fundamentals and wants to know what I did, what I found, and how far to trust it. Do not explain basic concepts. Do explain anything specific to the experiment that a competent reader could not infer.

### Voice
- First person, singular ("I ran", "I expected"). Plain, measured and slightly dry. Opinions are allowed but must be earned by the evidence in the post.
- Write as one engineer talking to another, not as a vendor, journalist or influencer.
- Confidence matches evidence. Say "this suggests" when the result suggests, "this shows" only when it does. Where a result is small-sample, single-run or unreplicated, say so at the point it is reported, not in a disclaimer at the end.
- Understatement over enthusiasm. If something worked well, give the number and let it stand.

### Language
- British English throughout: spelling (behaviour, optimise, calibre, analyse, labelled, modelling), punctuation (single quotation marks for quotes, with punctuation placed outside unless part of the quoted text) and vocabulary. Dates as 2 October 2026.
- No corporate jargon or hype. Avoid: leverage, unlock, game-changer, revolutionary, cutting-edge, state-of-the-art (unless citing a specific benchmark claim), paradigm shift, supercharge, seamless, robust (unless used in its statistical sense), deep dive, journey, landscape, ecosystem, "in today's fast-moving world".
- Use technical terms where they are the precise term (calibration, ECE, context window, zero-shot), and define an experiment-specific term once, briefly, on first use. Spell out an acronym once if the reader might not know it.
- Prefer concrete nouns and verbs. Prefer "costs 4x less" to "dramatically more cost-effective".

### Length and density
- Middle ground. More than the minimum technically required: give enough context that a reader arriving cold understands why the experiment was run, what was compared and under what conditions. Stop short of narrating every step or restating the obvious.
- Typical paragraph: three to five sentences. One idea per paragraph. If a sentence only restates the previous one, delete it.
- Include the detail that would let someone reproduce or sanity-check the work: exact model identifiers and versions, dataset and split, sample size, seeds, metric definitions, dates run. Put these inline or in a short 'Method' section, not scattered.
- Skip sections that do not earn their place. Not every post needs a conclusion that re-summarises it.

### Structure
- Open with the question or motivation in one or two paragraphs, not a thesis statement or a hook. Say what I wanted to find out and why it seemed worth testing.
- Then: method (what was done, and what was deliberately not done), results, interpretation, limitations, and a short closing thought.
- Use headings sparingly (a short post may need only three or four). Plain, descriptive headings, not clever ones.
- Use a table or figure when it conveys results more clearly than prose, and say in the text what the reader should notice in it. Do not use bullet lists as a substitute for reasoning; use them for genuinely parallel items (configurations, caveats, steps).
- Use bold rarely, mainly for a key term at first definition. No emoji. No decorative formatting.

### Content principles
1. **Report what happened, including the awkward parts.** Null, mixed or surprising results are as publishable as clean ones. Do not tidy the narrative.
2. **State the limitations plainly and specifically.** For example: the sample was 300 rows per dataset, so confidence intervals are wide; it was a single run, not repeated; the comparison arms differ in size or architecture. Do not imply more rigour than was applied (for instance, do not suggest independent replication if responses were cached or run once).
3. **Be fair to the thing being tested and to the baseline.** Describe what the setup might have favoured. If a comparison is not like for like, say how.
4. **Separate observation from explanation.** Say what was measured; then, separately, offer a mechanism and flag it as a hypothesis unless tested. Be precise about the distinction between architecture, training method and the mechanism causing an effect.
5. **Hold two things at once.** Where the honest picture is nuanced (it is cheaper and faster, but untested on messy real-world data), say both rather than collapsing to a clean story.
6. **Say what it means in practice, modestly.** One or two sentences on what an engineer building a real system might take from this, and where the result would not transfer. Avoid grand claims about the future of the field.
7. **Disclose context.** If I had early access, or a relationship with a vendor, or the model was days old at the time of testing, say so.
8. **No unsupported claims about third parties.** Attribute vendor claims to the vendor ('the vendor reports...') and distinguish them from what I measured.

### Things that make writing sound machine-generated: avoid
- Opening with a sweeping statement about AI or the pace of change.
- The 'It's not X, it's Y' construction and its variants; rhetorical questions followed immediately by their answers.
- Lists of exactly three adjectives or examples used for rhythm.
- Heavy use of em dashes. Use commas, brackets or full stops instead; at most one or two in a whole post.
- Sentences that announce what is about to be said ('Here's the thing', 'Let's dive in', 'It's worth noting that', 'Importantly,').
- Signposted wrap-ups ('In conclusion', 'Ultimately', 'The takeaway?') and neat aphoristic closing lines.
- Uniform sentence length and parallel structure repeated paragraph after paragraph. Vary length naturally; allow the occasional short sentence or mild aside.
- Over-hedging every sentence, and the opposite: false certainty. Hedge only where there is a real reason.
- Inflated verbs and adjectives (crucial, pivotal, vital, remarkable, fascinating, intriguing).

### Process
- If any key fact, number, model name, date or result is missing, ask me for it. Never invent figures, quotations, citations or experimental details. Mark gaps as [TO CONFIRM] in the draft.
- If my request is ambiguous, ask one clarifying question before drafting rather than guessing.
- Give me the draft first, then a brief list of any claims you were unsure of or any places where the evidence seems thinner than the prose implies.

## Workflow

- Write a post from an experiment repo: `/new-post <path-to-experiment-repo> [notes]`
- Ship it: `/publish-post <slug>` (build check → draft false → commit → asks before pushing)
