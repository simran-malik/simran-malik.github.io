---
layout: ../../layouts/CaseStudy.astro
title: Law-monade
summary: 'A hackathon build that gets an attorney up to speed on a personal-injury case in two minutes, and gives treating providers a safe, limited view. It reads the case live from Clio and links every fact to its source.'
stack: Python · Streamlit · FastAPI · Claude · SQLite · n8n · Clio API
cover: LAW
image: ''
order: 5
facts:
  - label: Built at
    value: Swans Applied AI Hackathon · Law-Di-Gras
  - label: When
    value: Oct 2026
links:
  - label: Event
    href: https://law-di-gras.com/applied-ai-hackathon/
video:
  title: Demo
  src: /projects/lawmonade-demo.mp4
  poster: /projects/lawmonade-demo-poster.jpg
  caption: 'A walkthrough on the hackathon''s shared case, read live from Clio: opening the case, the case brief and where each number comes from, every entry by date, and sharing an approved update with a medical provider.'
  note: 3:51 · no audio
problem:
  title: The Problem
  text: 'A personal-injury case in Clio holds hundreds of notes, emails, tasks and documents. Attorneys click tab by tab, or ask a colleague, just to learn what the case is worth and what''s overdue. Treating medical providers keep calling the paralegal to ask whether the case is still alive. The challenge came from a real trial firm: solve both sides, reading the case live from Clio without writing anything back.'
spanned:
  - Product management
  - Grounded LLM outputs
  - Hallucination checks
  - Structured outputs
  - Secure link sharing
  - Scheduled workflows
  - Retries & idempotency
  - LLM caching & cost control
stats:
  - value: 2 min
    label: 'to get up to speed on a case: worth vs. coverage, what''s overdue, what changed'
  - value: 160+
    label: Clio entries in one searchable timeline, each linked to its source
  - value: '0'
    suffix: writes
    label: 'to Clio: GET requests only, with read-only app permissions'
steps:
  title: From Clio to a Brief
  items:
    - label: 01 · Read
      value: Clio
      note: 5 timed steps · GET only · retry with backoff
    - label: 02 · Save
      value: Snapshot
      note: dated JSON copy · fallback when Clio is down
    - label: 03 · Compute
      value: Code
      note: money, dates, deadlines and risks
    - label: 04 · Summarize
      value: AI, checked
      note: every sentence must quote its source
    - label: 05 · Deliver
      value: 3 outputs
      note: case brief · daily digest · provider link
  note: Data moves one way, from Clio to the screen. Everything the app creates lives in its own storage.
findings:
  title: Design Decisions
  items:
    - label: Code does the math
      text: 'Dates, deadlines and money are computed in code. The AI only reads free text.'
    - label: AI must quote its source
      text: 'Each AI sentence quotes Clio word for word, or it''s dropped'
    - label: Every number shows its source
      text: 'Money cards link to the Clio tab and track who reviewed them'
    - label: Providers get a frozen copy
      text: 'The attorney picks and approves; the email carries only an expiring link'
    - label: Bills as a range
      text: 'Providers never see the billed amount, which keeps negotiation room'
    - label: Pay only for change
      text: 'AI answers are cached by input, so an unchanged case costs $0'
    - label: Fail safe, not silent
      text: 'Clio down: show the last saved copy and its age; too old: don''t send'
    - label: Never send twice
      text: 'One digest per case per day, even with retries or double clicks'
limitation:
  label: Limitation
  text: 'This is a one-day prototype. It runs for a single user with no login, on localhost, and was demoed on the organizers'' sample case. Real client data would need sign-in, https hosting, encrypted storage and a zero-retention agreement with the AI vendor.'
back: /#projects
backLabel: All projects
construction: false
repo: https://github.com/simran-malik/lawmonade
---

## What I'd Do Next

* **Ask providers for a one-time code** before showing the page, so a forwarded link alone isn't enough.
* **Sync in the background** with Clio's `updated_since` and webhooks, instead of loading a case on click.
* **Write back to Clio** (with permission): log each share on the matter and file the provider's uploaded records.
* **Add the other case stages** to the risk signals. Today only Litigation is covered.
