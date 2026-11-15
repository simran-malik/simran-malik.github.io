---
layout: ../../layouts/CaseStudy.astro
title: Applied AI Researcher
summary: 'Evaluating whether AI answers cite quality web sources. The work behind SourceBench, accepted at NeurIPS 2026.'
org: WukLab · UCSD
dates: 1+ year · Sep 2025 – Nov 2026
points:
  - 'Built the evaluation pipeline behind SourceBench (NeurIPS 2026), measuring the quality of sources cited by 12 AI systems.'
logo: ucsd
stack: ''
links:
  - label: Publication
    href: 'https://neurips.cc/virtual/2026/loc/atlanta/poster/139217'
  - label: Code
    href: 'https://github.com/CSE291A-GEO/anti-geo'
spanned:
  - Research Proposal
  - AI Evaluation
  - LLM-as-Judge Evaluation
  - Experiment Design
  - Prompt Design
  - Prompt Bias Detection
  - Co-Authoring the Paper
  - Google Search Study Lead
highlights:
  - metric: '3,996'
    label: cited sources scored across 12 AI systems
    text: 'Proposed and built the evaluation pipeline for SourceBench, a NeurIPS 2026 benchmark of how well AI search retrieves sources.'
  - metric: 12 of 12
    label: systems' results saved from a bias bug
    text: 'Caught a prompt-bias bug that would have invalidated every system''s results, forcing a full re-run that made SourceBench publishable.'
  - metric: 16% vs 55%
    label: GPT-5 vs Tavily overlap with Google's top results
    text: 'Led the Google vs. AI-search retrieval study and built the Google collection pipeline, showing GPT-5 cites sources Google rarely ranks at the top.'
  - metric: DeepSeek
    label: controlled retrieval vs. reasoning experiment
    text: 'Designed an experiment separating the effect of retrieval quality from model reasoning, showing better sources can narrow the gap between reasoning and non-reasoning models.'
order: 2
facts: []
construction: false
repo: 'https://github.com/CSE291A-GEO/anti-geo'
back: /#work
backLabel: All work
---

## What We Concluded

* **The best AI search checks who is behind a source.** GPT-5 scored highest overall because it picked sources with clear owners, credible authors and accurate facts, not just pages that matched the question's keywords.
* **Good sources can matter more than reasoning.** In our DeepSeek experiment, a simpler non-reasoning model given high-quality search results beat a reasoning model given weaker ones.
* **AI search finds sources Google buries.** Only 16% of GPT-5's sources appeared in Google's first five pages of results, compared with 55% for Tavily, the lowest-scoring system.
* **Answer-only benchmarks miss what people care about.** AI systems often give correct answers while citing outdated, biased or untrustworthy pages. Signals like author credibility and page clarity shape whether people trust an answer, yet most benchmarks ignore them.
