---
layout: ../../layouts/CaseStudy.astro
title: Law-monade
summary: A hackathon build that turns a live personal-injury case into a one-screen brief, with every fact linked back to its source.
back: /#projects
backLabel: All projects
facts:
  Built at: Swans Applied AI Hackathon
  Stack: Python · Streamlit · FastAPI · Claude / Gemini · Clio API
construction: true
repo: https://github.com/simran-malik/lawmonade
---

## What it is

Law-monade reads a case from Clio Manage (read-only) and produces a one-screen case brief, a daily email digest for the firm, and a secure update for treating providers. Every fact links back to where it came from in Clio, and three small AI calls per case keep the cost to a few cents, or nothing when the case hasn't changed.
