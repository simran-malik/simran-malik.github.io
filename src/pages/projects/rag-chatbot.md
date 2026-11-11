---
layout: ../../layouts/CaseStudy.astro
title: RAG chatbot for RapidFire AI docs
summary: A question-answering system over technical documentation, built to work inside a tight 2,000-token context budget.
back: /#projects
backLabel: All projects
facts:
  When: Spring 2026
  Course: UCSD CSE 234
  Stack: LangChain · FAISS · HuggingFace
  Result: 3rd of 141 teams
construction: true
repo: https://github.com/simran-malik/ask
---

## The problem

Answer single-turn questions about the RapidFire AI platform from its documentation — but pass the model no more than 2,000 tokens per query, prompt included. Real document collections are far larger than any context window, so the constraint forces real retrieval engineering rather than stuffing everything into the prompt.

## What I built

A multi-stage pipeline: dense retrieval with FAISS, then a cross-encoder reranker, then an LLM filter that keeps only the context that matters. I used grid searches over chunk sizes and generator models to tune it, and chain-of-thought prompts to improve completeness.

## Results

- **Rank 3 of 141 teams** on the leaderboard.
- **Correctness 0.978, faithfulness 1.0, completeness 0.902.**
- Retrieval F1@5 up from **0.74 to 0.95**; completeness up **16%** from the prompting changes.
