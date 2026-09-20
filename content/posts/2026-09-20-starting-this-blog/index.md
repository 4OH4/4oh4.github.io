---
title: "Starting This Blog"
date: 2026-09-20
tags: ["meta"]
math: true
summary: "Why I'm keeping a public lab notebook, and how it's built."
---

I work in AI engineering full-time, but most of what I do there stays behind closed doors. This blog is a separate, personal lab notebook: a place to pick up a new model or technique, actually run it, and write down what happened — including the parts that didn't work.

The goal isn't polished tutorials. It's closer to a running log:

- what I tried
- what broke, and why
- what I'd do differently next time

## How this is built

Static site with [Hugo](https://gohugo.io/) and the [PaperMod](https://github.com/adityatelange/hugo-PaperMod) theme, deployed to GitHub Pages via GitHub Actions on every push to `main`. Each post is a self-contained folder under `content/posts/`, so code output and images from an experiment can be dropped in alongside the write-up.

A code block, to confirm syntax highlighting works:

```python
from transformers import pipeline

generator = pipeline("text-generation", model="gpt2")
print(generator("The best way to learn a new model is", max_new_tokens=20))
```

And inline math, to confirm KaTeX renders: the attention weights in a transformer are computed as

$$
\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V
$$

If both of those rendered correctly, the scaffolding works. Real experiment write-ups start next.
