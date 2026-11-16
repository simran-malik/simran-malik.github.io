---
layout: ../../layouts/CaseStudy.astro
title: Supervised Fine-Tuning for Natural Language Schema Linking
summary: 'A four-stage pipeline of LoRA adapters on a 1.5B coder model that maps plain-English questions to database tables and columns, raising the schema-linking score from 0.097 to 0.627 over 15 runs.'
stack: PyTorch · PEFT · Qwen2.5-Coder
cover: SFT
image: ''
links:
  - label: Technical Report
    href: /projects/schema-linking-project-report.pdf
problem:
  text: 'Given a question in plain English and a database schema, name the tables and columns the SQL would use, as JSON. It''s a core step in natural-language-to-SQL, and useful on its own for routing queries and grounding AI agents. The data came from SNAILS, a UCSD suite of real-world databases spanning national-park biodiversity, crash statistics, New York education data and SAP business planning. The SAP schema was split into 9 business-area modules so each fits in a small model''s prompt.'
spanned:
  - Task decomposition
  - LoRA fine-tuning
  - Synthetic training data
  - Negative sampling
  - Schema serialization
  - Prompt design
  - Foreign-key post-processing
  - Ablations
stats:
  - value: 0.097 → 0.627
    label: 'schema-linking score, the average of table (0.739) and column (0.515) scores'
  - value: '+0.17'
    label: 'score from readable schemas and distractor sampling (0.317 → 0.490), the biggest single jump'
  - value: 1.5B
    label: 'parameter base model with three LoRA adapters, built to run locally on one GPU'
ladder:
  title: From 0.097 to 0.627
  intro: The best score after each change that stuck. Score is the average of table and column scores (higher is better).
  rows:
    - label: One adapter · Qwen3-0.6B
      value: '0.097'
    - label: Separate table & column adapters
      value: '0.317'
    - label: Readable schema + distractors
      value: '0.490'
    - label: Coder base model
      value: '0.567'
    - label: Grounded decomposition + refinement
      value: '0.591'
    - label: Final · batch size 4
      value: '0.627'
steps:
  title: Making Decomposition Pay Off
  note: 'Without decomposition, the two-stage pipeline scored 0.567. Every decomposition variant trailed it until the refinement stage.'
  items:
    - label: Decompose every question
      value: '0.525'
      note: 'more recall, less precision'
    - label: Only when > 2 sub-questions
      value: '0.531'
      note: selective decomposition
    - label: Name the table in each sub-question
      value: '0.539'
      note: full now beats selective (0.527)
    - label: Refine against the original question
      value: '0.591'
      note: first to beat no decomposition
findings:
  title: What Each Experiment Showed
  items:
    - label: Split the task
      text: One adapter for tables and columns scored 0.097; separate adapters scored 0.317 (the base model also changed)
    - label: Readable schemas
      text: 'Natural-language names, lowercasing, sorting and distractor sampling: 0.317 → 0.490'
    - label: Coder base model
      text: Qwen2.5-Coder lifted the two-stage pipeline from 0.490 to 0.567
    - label: Decomposition alone
      text: 'Found more of the right columns, and more wrong ones: 0.567 → 0.525'
    - label: Grounded sub-questions
      text: Naming the target table stopped vague sub-questions from matching distractors
    - label: Refinement stage
      text: 'Re-checking the candidates against the original question: 0.539 → 0.591'
    - label: Joins in code
      text: 'Implied-key fallback: +7% column recall where metadata was missing, −9% precision when tables were wrong'
    - label: LoRA rank
      text: Rank 32 didn't help tables and hurt columns (0.591 → 0.538); rank 16 stayed
    - label: Batch size
      text: 'Batch 4 in the first two stages: 0.591 → 0.627, with fewer empty intermediate outputs'
limitation:
  label: Limitation
  text: 'The dataset is small: 503 questions across 17 databases, with 301 for training and about 100 for evaluation. Every run was scored on the same evaluation questions, so differences of a point or two between runs may be noise. The batch-size gain was observed, not fully explained.'
order: 2
facts:
  - label: Course
    value: UCSD CSE 234
  - label: Role
    value: Solo
  - label: When
    value: Spring 2026
  - label: Result
    value: 0.097 → 0.627
construction: false
repo: 'https://github.com/simran-malik/fetch'
back: /#projects
backLabel: All projects
---

## Why a Small Model

A few-shot prompt to a frontier model would also do this well. The point was a specialist that fits production constraints: it runs locally on one GPU with no API calls, costs far less per query, emits the exact JSON format it was trained on, and keeps schemas and queries in-house.

## What I Built

A four-stage pipeline on Qwen2.5-Coder-1.5B-Instruct, with one LoRA adapter per sub-task:

* **Decompose** the question into single-column sub-questions, each naming its table (rank 32).
* **Select tables** for each sub-question: the top 1–3 from the schema (rank 16).
* **Select columns** from those tables, allowing a table with no columns, e.g. for `COUNT(*)` (rank 16).
* **Refine**: pass the combined candidates back through the column adapter with the original question.

Training data was built with negative sampling: the table adapter saw the gold tables plus random distractors (3–10 tables in all); the column adapter saw 1–5 tables with 1–5 distractor columns each, mirroring what it gets at inference. Schemas were written compactly as `table(col1, col2)`, with natural-language names, lowercase, in alphabetical order. Decomposition training data was synthesised with few-shot prompting of Gemma-2-9B.

After the model, code takes over: predicted names not in the schema are removed, failed or empty outputs are retried, and join columns are added from a graph of declared foreign keys plus same-named columns across tables.

## What I Learned

* **Data representation beat model capacity.** Readable schema names moved the score more than a bigger LoRA rank did.
* **Decomposition needs a precision check.** Splitting questions finds more, but only paid off once the original question had the final say.
* **Deterministic work belongs in code.** Once the tables are right, join columns follow from the schema.
* **Check the evaluation code.** One run lost precision because the filter compared readable names against raw identifiers.
