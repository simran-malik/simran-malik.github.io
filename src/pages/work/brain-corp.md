---
layout: ../../layouts/CaseStudy.astro
title: Robotics Software Engineering Intern, Brain Corp
summary: Two systems for autonomous store robots — a map you can ask questions, and job-time estimates learned from real runs.
back: /#work
backLabel: All work
facts:
  Role: Robotics Software Engineering Intern
  When: Summer 2026, San Diego
  Stack: Python · Go · SQL · GCP
---

## Store-map Q&A: a knowledge graph and the agent that walks it

Robots drive through a store and build a 3D map from thousands of camera frames. I made that map answer plain questions — *where is the bleach*, *what cleaning products do we have*, *do you stock oat milk* — with answers grounded in what the cameras actually saw, and an honest "I can't tell" when they didn't.

The store is cut into small pieces, each described from its best photograph by a vision-language model, then organised into two trees over the same pieces: one by geometry, one by category. An agent walks those trees, keeping a shortlist that covers the store exactly once, and three separate checkers grade completeness, grounding and any claim that something isn't stocked before an answer goes out.

- Owned it end to end: architecture, construction pipeline, retrieval agent, evaluation layer and a live mode that lights up the shelves on the 3D map as the agent searches — 68 commits, ~47,000 lines and 859 passing tests in a two-week workstream.
- Found a failure where the system confidently said "not stocked" for *dishwasher tablets* because the shelf was recorded as *dishwasher tabs* — and every automated check passed, because they all relied on the same exact-string index. Added a model-based check that fires only on absence claims, and shipped it in v1.
- Computed spatial relations from geometry instead of asking a language model, saving an estimated 64 million input tokens and producing exact relations prose could never give.

## Job-time estimates learned from real runs

Operators need to know how long a robot's job will take. The old estimate was pure geometry — path length divided by speed — and couldn't see the pauses, assists and congestion that eat time in a real building.

I built the learned replacement: a scheduled cloud job reads completed runs, computes a robust per-job estimate with an uncertainty band, stores its full history, and delivers it to each robot, where the operator screen shows a plain-language range with a confidence indicator. With no history, it quietly falls back to the old estimate.

- Designed and shipped it end to end in Go, SQL and Python — 11 pull requests across the cloud and robot codebases in ten weeks, validated on physical robots.
- Replaced a mean with a median plus a confidence band after showing how outliers skewed it, and blended estimates smoothly so they don't jump as data accumulates.
- Checked the assumed delivery path before building on it, found it wouldn't reach robots, and implemented a per-task delivery that reuses existing machinery.
