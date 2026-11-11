---
layout: ../../layouts/CaseStudy.astro
title: Growth rate predictor
summary: Predicting a population's exponential growth rate from genetic data, with neural networks trained on simulated populations.
back: /#projects
backLabel: All projects
facts:
  Stack: Python · PyTorch · msprime
construction: true
repo: https://github.com/simran-malik/growth-rate-predictor
---

## What it is

A pipeline that simulates populations with the msprime coalescent simulator, turns each one into a matrix of genetic variants (SNPs), and trains two models to predict how fast the population was growing: a small MLP on summary statistics (the site frequency spectrum) and a 2-D CNN on the full SNP matrix.
