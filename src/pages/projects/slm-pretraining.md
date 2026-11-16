---
layout: ../../layouts/CaseStudy.astro
title: Small Language Model Training
summary: 'I pretrained a 98M-parameter GPT-style model from scratch on 10B tokens, ran 10 controlled ablations, and placed 5th of 40 teams as a solo entrant.'
stack: PyTorch · nanoGPT · Muon · RTX 5090
cover: SLM
image: ''
links:
  - label: Technical Report
    href: /projects/slm-report.pdf
spanned:
  - Training optimization
  - GPU profiling (MFU)
  - Architecture ablations
  - Optimizers & LR schedules
  - Multi-domain data mixing
  - Continued pretraining
  - Scaling to 10B tokens
  - Experimentation
stats:
  - value: 5th
    suffix: / 40
    label: teams on the private Kaggle leaderboard · test perplexity 20.03
  - value: −86%
    label: 'perplexity, 147 → 19.88, across the project'
  - value: 5×
    label: 'GPU utilization, 9% → 47% MFU · 171K tokens/sec'
ladder:
  title: From 147 to 19.88
  intro: Each step kept what the last ablation proved. Bars show validation perplexity (lower is better).
  rows:
    - label: Deep baseline · 512d-23L
      value: '147.1'
    - label: Go wider · 768d-8L
      value: '108.3'
    - label: Switch to Muon
      value: '71.7'
    - label: RoPE + tuned data mix
      value: '55.7'
    - label: 5× data · 500M tokens
      value: '33.4'
    - label: 2B tokens · stable evals
      value: '23.5'
    - label: 'Final · 10B tokens, 16L-640d'
      value: '19.88'
steps:
  title: Making Training Fast
  note: 'Starting point: 9% MFU, 17K tokens/sec.'
  items:
    - label: bf16
      value: 28%
      note: MFU · batch 4 → 16
    - label: torch.compile
      value: 33%
      note: VRAM 79% → 54%
    - label: Fused AdamW
      value: 35%
      note: faster steps
    - label: Memory tuning
      value: 37%
      note: batch 32 · 93% VRAM
    - label: RTX 5090
      value: 47%
      note: 171K tok/s · 1.6× faster
findings:
  title: 'Ten Ablations, One Variable Each'
  items:
    - label: Data size
      text: 5× tokens cut perplexity 147 → 55
    - label: LR schedule
      text: WSD beats cosine; decay over the last 20%
    - label: Depth vs. width
      text: Wide & shallow wins at small data
    - label: Optimizer
      text: 'Muon over AdamW: perplexity 108 → 72'
    - label: Initialization
      text: 'Xavier for AdamW, Gaussian for Muon'
    - label: Activation
      text: SwiGLU ≈ GeLU at equal parameters
    - label: Positional encoding
      text: 'RoPE generalizes better: perplexity 72 → 68'
    - label: Data domains
      text: 'Wikipedia & research helped most, code didn''t*'
    - label: Data mix · 18 configs
      text: Tuned mix beats copying the test set (perplexity 61 vs. 67)
    - label: Batch-size schedule
      text: 'Smoother training, worse generalization'
figure:
  title: The Final Run
  image: /projects/slm-loss-curve.png
  alt: 'Training and validation loss over one epoch of 10B tokens. Both fall from about 11 to under 4 in the first few percent of training, then settle slowly to about 2.9 (train) and 3.0 (validation).'
  caption: 'Loss drops from 11 to under 4 within the first few percent of the 10B tokens, then keeps improving slowly. Validation loss stays close to training loss throughout (3.0 vs. 2.9), so the model wasn''t overfitting.'
  note: 20.3 hours on one RTX 5090 · 97.9M parameters · SwiGLU + RoPE + Muon
limitation:
  label: '*Limitation'
  text: 'The competition provided a fixed validation set, and every result on this page, including model selection and the data-mix search, was measured against it. The findings may not carry over to text from other domains, but the core concepts and experimentation rigor do.'
order: 3
facts:
  - label: Course
    value: UCSD CSE 251B
  - label: Role
    value: Solo
  - label: When
    value: Winter 2026
  - label: Result
    value: 5th of 40 teams · perplexity 20.03
construction: false
repo: 'https://github.com/simran-malik/nano-gpt-contest'
back: /#projects
backLabel: All projects
---

## What I Learned

* **Whether depth or width wins depends on data.** Width won at 100M tokens; at 10B, the deeper model won.
* **Don't copy the test distribution.** Domains differ in how much a model can learn from them.
* **Lower training loss ≠ better generalization.**
* **Noisy evals mislead.** 1 → 40 eval iterations fixed model selection.

## What I'd Do Next

* **Automate the data mix** with DoReMi.
* **Try Mixture-of-Experts** within the same budget.
* **Find new high-signal data.** More of the same mix stopped helping.
