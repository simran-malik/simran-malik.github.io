---
layout: ../../layouts/CaseStudy.astro
title: Intern · Software Engineering
summary: 'Six months on the Apple Search Ads platform team, building the portal that replaced hand-written database queries for managing Apple product data.'
org: Apple · India
dates: 6 months · Jan – Jul 2021
points:
  - Designed and built a reference data management portal for the Apple Ads platform, replacing manual database queries and saving 10+ engineering hours per week.
logo: apple
stack: Angular · TypeScript · SCSS · Jest · Java
spanned:
  - Requirements gathering
  - UI design & mocks
  - Stakeholder reviews
  - Front-end development
  - Backend integration
  - Authorization design
  - Data validation
  - Unit testing
highlights:
  - metric: 10+ hours
    label: engineering time saved per week
    text: 'Ads Platform teams kept Apple product data (devices, OS versions) up to date with hand-written database queries, passed back and forth between teams. I designed and built a self-serve portal to replace that.'
  - metric: 5 entities
    label: 'Device OS, Class, Model, Family, Group'
    text: 'Each one needed a dashboard, a create page and an edit page. I mocked all three, got them approved by stakeholders, then built them in Angular and wired them into the Search Ads Java backend.'
  - metric: 5 safeguards
    label: against bad data
    text: 'Ads are targeted using this data, so mistakes are costly. I designed checks, warnings and validations: fields that lock after creation, rules tying Targetable to Public, a review step and a final confirmation before submitting.'
  - metric: Roles & permissions
    label: for the new portal
    text: 'I learned the Search Ads authorization flow end to end, then proposed the read and write permissions for each entity and the user roles built on them.'
order: 5
facts: []
construction: false
back: /#work
backLabel: All work
---

## How I Worked

* **Choosing the harder option on purpose.** We could build a new portal or reuse an internal tool the users already knew. Reusing it was faster, but it meant users had to know every API's inputs, outputs and field relationships. We chose the portal because ease of use and correct data mattered more than build time.
* **Designing with users before they were decided.** Early on, nobody had settled who would use the portal. I joined discussions with potential users, presented my mocks and folded their feedback into the design.
* **Mocks before code.** I had the mocks reviewed, changed and approved by the project's stakeholders before I built anything, so features and design were agreed up front.
* **Shipping one entity at a time.** Device OS (UI and backend) was done in May and Device Class in early June. The rest followed the same pattern, ending with integration with the RDMS API service.

## How I Grew

* **My first front-end work.** Coming from backend, I learned what makes a UI good, and how to build one in Angular.
* **Build the guardrails into the UI.** The best way to keep data correct is to make the wrong input hard to enter in the first place.
* **Speak up on open decisions.** Starting and joining discussions about decisions that hadn't been made yet improved my communication and collaboration more than anything else that year.
* **Thinking in permissions.** Designing roles taught me what a good authorization architecture looks like, not just how to call one.
