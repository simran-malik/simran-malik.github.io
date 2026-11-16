---
layout: ../../layouts/CaseStudy.astro
title: RAG-based Q&A
summary: 'Multi-stage retrieval for technical documentation under a 2,000-token context budget; ranked 1st of 141 teams on retrieval and 3rd overall on the hidden test set as a solo entrant.'
stack: LangChain · FAISS · HuggingFace · RapidFire AI
cover: RAG
image: ''
links:
  - label: Technical Report
    href: /projects/rag-project-report.pdf
problem:
  title: The Problem
  text: 'Answer single-turn questions about the RapidFire AI platform from its documentation, while passing the model no more than 2,000 tokens per query, prompt included. Real document collections are far larger than any context window, so the budget forces real retrieval engineering instead of putting everything in the prompt.'
spanned:
  - Golden Q&A dataset
  - Document cleaning & chunking
  - Dense retrieval (FAISS)
  - Cross-encoder reranking
  - LLM context filtering
  - '2,000-token budget design'
  - Grid searches on RapidFire AI
  - Prompt engineering
  - Generator model selection
  - LLM-as-judge evaluation
stats:
  - value: Rank 1
    suffix: / 141
    label: 'retrieval score · 0.953 on the hidden test set'
  - value: Rank 3
    suffix: / 141
    label: 'overall · leaderboard score 0.889'
  - value: '0.967'
    label: 'precision@5 · recall@5 0.946 · F1@5 0.947 on the hidden test set'
  - value: '1.00'
    label: 'correctness · faithfulness 1.00 on the hidden test set (LLM judge)'
  - value: '4.84'
    suffix: / 5
    label: 'completeness on the hidden test set (LLM judge)'
  - value: 0.74 → 0.90
    label: 'validation completeness, through prompt engineering alone'
ladder:
  title: Precision from 0.73 to 0.94
  intro: 'Retrieval precision@5 on the 45-question validation set: the share of chunks passed to the model that were actually needed. Each step kept what the last one proved.'
  rows:
    - label: Baseline · bge reranker + LLM filter
      value: '0.73'
    - label: Strict LLM-filter prompt
      value: '0.84'
    - label: 'Plain chunking, BGE embeddings, k = 80'
      value: '0.93'
    - label: 'gte-ModernBERT reranker, top 7'
      value: '0.94'
steps:
  title: The Final Pipeline
  note: 'Each query fits the 2,000-token budget, system prompt included. Hidden test set: retrieval score 0.953 · precision@5 0.967 · recall@5 0.946 · F1@5 0.947 · correctness 1.00 · faithfulness 1.00 · completeness 4.84 / 5.'
  items:
    - label: Chunk
      value: '2,000'
      note: characters · 500 overlap · RST markup stripped
    - label: Retrieve
      value: Top 80
      note: bge-small-en-v1.5 · FAISS · cosine
    - label: Rerank
      value: Top 7
      note: gte-reranker-modernbert-base
    - label: Filter
      value: LLM
      note: Gemma 4 26B keeps only the chunks the answer needs
    - label: Generate
      value: ≤ 2K
      note: tokens · Claude Sonnet 4.6
findings:
  title: What Each Knob Did
  items:
    - label: Chunk size
      text: '2,000-character chunks beat 4,000 on every metric (F1@5 0.74–0.76 vs. 0.67–0.68)'
    - label: Search depth
      text: Retrieving 80 chunks instead of 40 raised precision ~4% at equal recall
    - label: Search type
      text: 'Plain similarity beat MMR: F1@5 0.95 vs. 0.93 at k = 80, and 0.90 for MMR at k = 40'
    - label: Reranker model
      text: 'gte-ModernBERT over bge-reranker-v2-m3: recall 0.96 vs. 0.89, correctness 0.98 vs. 0.93'
    - label: LLM filter prompt
      text: A strict filtering prompt lifted precision 0.73 → 0.84 for a small recall cost
    - label: Stronger filter LLM
      text: 'Claude Sonnet as the filter kept extra supporting chunks: precision 0.94 → 0.91, correctness 0.98 → 0.93'
    - label: Bigger generator
      text: 'gpt-oss-120b: completeness +6%, but faithfulness 1.0 → 0.91 as it drew on outside knowledge'
    - label: Prompting
      text: 'Chain-of-thought barely helped (0.74 → 0.76); emphatic directives took it to 0.85, examples of missed details to 0.90'
limitation:
  label: Limitation
  text: 'Every configuration was tuned and selected on the same 45-question validation set, which rewards passing exactly the necessary chunks over extra relevant ones. Scores also varied between runs: gpt-oss-120b once reached 0.93 completeness, but I kept Claude Sonnet 4.6 because it was steadier across repeated runs. Ambiguous questions remain the weakest case.'
order: 1
facts:
  - label: Course
    value: UCSD CSE 234
  - label: Role
    value: Solo
  - label: When
    value: Spring 2026
  - label: Result
    value: 3rd of 141 teams
construction: false
repo: 'https://github.com/simran-malik/ask'
back: /#projects
backLabel: All projects
---

## What I Built

A five-stage pipeline: clean and chunk the docs, retrieve 80 candidates with dense embeddings, narrow them to 7 with a cross-encoder, have an LLM keep only the chunks the answer needs, then generate. I tuned it in three phases: manual experiments where I traced each low-scoring question to its root cause, grid searches on RapidFire AI over chunking, retrieval, reranking and generator models, and finally prompt engineering aimed at completeness.

## The Evaluation Set

I built golden Q\&A pairs by crossing three personas (non-technical user, new developer, experienced developer), six question types (from platform concepts to API usage and debugging) and three scenarios (well-specified, ambiguous, invalid). I kept only questions that need the docs to answer, spread them across the corpus, and grounded each answer in exact line spans from one or two source files. Answers were scored by an LLM judge for correctness, faithfulness and completeness.

## What I Learned

* **Precision mattered as much as recall.** Once recall was high, the gains came from passing the model less, not more.
* **A bigger model isn't automatically better.** It added completeness but lost faithfulness, and as a reranker it let in noise.
* **Cleaner prompts weren't better prompts.** Emphasis and concrete examples of what to include did more than tidy wording or chain-of-thought.

## What I'd Do Next

* **Handle ambiguous questions** by storing LLM-written summaries and likely questions for each chunk at ingestion.
* **Answer across files** and over the images in the docs.
* **Test out-of-distribution questions** to find new retrieval failures.
