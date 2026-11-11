---
layout: ../../layouts/CaseStudy.astro
title: Law-monade
summary: Hackathon build that turns a live personal-injury case into a one-screen brief, with every fact linked to its source.
stack: Python · FastAPI · Claude / Gemini
cover: LAW
image: ''
order: 5
facts:
  - label: Built at
    value: Swans Applied AI Hackathon
back: /#projects
backLabel: All projects
construction: true
repo: https://github.com/simran-malik/lawmonade
---

## What it is

Law-monade reads a case from Clio Manage (read-only) and produces a one-screen case brief, a daily email digest for the firm, and a secure update for treating providers. Every fact links back to where it came from in Clio, and three small AI calls per case keep the cost to a few cents, or nothing when the case hasn't changed.
