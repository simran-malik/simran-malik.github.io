---
layout: ../../layouts/CaseStudy.astro
title: Schema linking with LoRA fine-tuning
summary: Teaching a small model which tables and columns a question needs — the first step of natural-language-to-SQL.
back: /#projects
backLabel: All projects
facts:
  When: Spring 2026
  Course: UCSD CSE 234
  Stack: PyTorch · HuggingFace PEFT · Qwen2.5
  Result: 0.097 → 0.627
---

## The problem

Given a question in plain English and a database schema, name the tables and columns the SQL would use. It's a core step in natural-language-to-SQL, and useful on its own for routing queries and grounding AI agents. The data came from SNAILS, a UCSD suite of real-world databases spanning national-park biodiversity, crash statistics, education data and business planning.

## What I built

A four-stage inference pipeline — question decomposition, table and column extraction, then schema refinement — each stage a LoRA adapter fine-tuned on Qwen2.5-Coder. Training data for the decomposition stage was synthesised with few-shot prompting of Gemma-9B.

## Results

- Schema-linking score up from **0.097 to 0.627**.
- Writing the schema in natural language added **+54%**.
- A deterministic foreign-key join post-processor added **+7% recall**.
