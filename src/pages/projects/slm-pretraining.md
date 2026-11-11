---
layout: ../../layouts/CaseStudy.astro
title: Small language model from scratch
summary: Pretraining a decoder-only Transformer on 10B tokens, and making the GPU work four times harder.
back: /#projects
backLabel: All projects
facts:
  When: Winter 2026
  Course: UCSD CSE 251B
  Stack: PyTorch · nanoGPT · RTX 5090
  Result: Rank 5 · perplexity 20.03
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
