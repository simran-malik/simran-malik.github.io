---
layout: ../../layouts/CaseStudy.astro
title: Small Language Model Training
summary: Trained a 98M-parameter Transformer on 10B tokens; ranked 5th, and quadrupled GPU utilization to 47%.
stack: PyTorch · nanoGPT · RTX 5090
cover: SLM
image: ''
order: 3
facts:
  - label: When
    value: Winter 2026
  - label: Course
    value: UCSD CSE 251B
  - label: Result
    value: Rank 5 · perplexity 20.03
back: /#projects
backLabel: All projects
construction: true
repo: https://github.com/simran-malik/nano-gpt-contest
---

## The problem

Starting from a basic nanoGPT, train the best small language model possible on a single GPU, judged on a hidden test set.

## What I built

A high-throughput pretraining pipeline and ten structured ablations covering width versus depth, modern building blocks (SwiGLU, RoPE), optimizers and schedules (Muon, AdamW, WSD), and data strategy, including a five-domain data mix. Scaling from 100M to 10B tokens showed that width helps at small scales but depth wins as data grows: a 16-layer, 640-dimension model beat a wider 10-layer one at 10B tokens.

## Results

- Final model: **97.9M parameters**, validation perplexity **19.88**.
- **Rank 5** on the private leaderboard with a hidden-test perplexity of **20.03**.
- GPU utilization (MFU) up from **9% to 47%** — **171K tokens/sec** — using BF16 mixed precision, `torch.compile`, Flash Attention and fused AdamW.
