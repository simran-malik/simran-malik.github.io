---
layout: ../../layouts/CaseStudy.astro
title: Supervised Fine-Tuning for Natural Language Schema Linking
summary: Four-stage pipeline of fine-tuned adapters on Qwen2.5-Coder, raising schema-linking score from 0.097 to 0.627.
stack: PyTorch · PEFT · Qwen2.5
cover: SFT
image: ''
order: 2
facts:
  - label: When
    value: Spring 2026
  - label: Course
    value: UCSD CSE 234
  - label: Result
    value: 0.097 → 0.627
back: /#projects
backLabel: All projects
construction: true
repo: https://github.com/simran-malik/fetch
---

## The problem

Given a question in plain English and a database schema, name the tables and columns the SQL would use. It's a core step in natural-language-to-SQL, and useful on its own for routing queries and grounding AI agents. The data came from SNAILS, a UCSD suite of real-world databases spanning national-park biodiversity, crash statistics, education data and business planning.

## What I built

A four-stage inference pipeline — question decomposition, table and column extraction, then schema refinement — each stage a LoRA adapter fine-tuned on Qwen2.5-Coder. Training data for the decomposition stage was synthesised with few-shot prompting of Gemma-9B.

## Results

- Schema-linking score up from **0.097 to 0.627**.
- Writing the schema in natural language added **+54%**.
- A deterministic foreign-key join post-processor added **+7% recall**.
