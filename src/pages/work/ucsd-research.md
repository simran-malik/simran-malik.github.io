---
layout: ../../layouts/CaseStudy.astro
title: Applied AI Researcher
summary: 'Teaching robots to answer natural-language questions about the places they have mapped, in Prof. Nikolai Atanasov''s lab.'
org: Existential Robotics Lab · UCSD
dates: Oct 2026 – Present
points:
  - Enabling robots to answer natural language questions about the world around them.
logo: ucsd
spanned:
  - Research Proposal
  - Semantic Knowledge Graphs
  - Agentic Systems
  - Prompt Design
highlights:
  - metric: Up to 3.5x
    label: higher F1
    text: 'Redesigned the prompts for an agentic system that answers questions over robot-built maps.'
  - metric: Top-down
    label: map Q&A over a semantic knowledge graph
    text: 'Proposed answering questions by moving through a knowledge graph of the map from broad areas down to specific objects, instead of grounding each question bottom-up in the raw 3D scene.'
order: 1
facts: []
construction: true
constructionNote: "I'm still working on this one and will share more once I have results."
back: /#work
backLabel: All work
---

## How I'm Working

* **Building on what I shipped in industry.** At Brain Corp I built a knowledge graph and an agent that answer questions about robot-built store maps. This research takes that idea further, aiming for a first-author paper.
* **Fixing the prompts before the architecture.** Before changing how the system is built, I redesigned the prompts of the existing agentic system and measured the effect on F1.
