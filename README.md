# 4oh4.github.io

Personal blog on AI models and techniques — hands-on write-ups of experiments. Live at https://4oh4.github.io/ once GitHub Pages is enabled.

Built with [Hugo](https://gohugo.io/) (extended, v0.166.0) and [PaperMod](https://github.com/adityatelange/hugo-PaperMod). Deployed by GitHub Actions on push to `main`.

## Local development

```bash
git clone --recurse-submodules https://github.com/4OH4/4oh4.github.io.git
cd 4oh4.github.io
hugo server -D        # http://localhost:1313, includes drafts
```

## Writing a post

```bash
hugo new content posts/2026-01-31-my-experiment
# edit content/posts/2026-01-31-my-experiment/index.md, set draft: false when ready
```

With Claude Code: `/new-post <path-to-experiment-repo>` drafts a post from an experiment's results, and `/publish-post <slug>` runs the checks and ships it. Conventions live in [CLAUDE.md](CLAUDE.md).
