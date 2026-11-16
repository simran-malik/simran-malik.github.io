---
layout: ../../layouts/CaseStudy.astro
title: Growth rate predictor
summary: I trained an MLP and a 2-D CNN to predict a population's exponential growth rate from simulated genetic data. A CNN fused with the allele frequency spectrum reached Pearson r = 0.813 after a single epoch.
stack: Python · PyTorch · msprime
cover: CV
image: ''
links:
  - label: Technical Report
    href: /projects/growth-rate-report.pdf
problem:
  text: 'How fast a population has been growing leaves a mark on its DNA. Fast growth creates an excess of rare variants, and the classic way to estimate the growth rate α uses the allele frequency spectrum (AFS), which counts how common each variant is. But the AFS throws away where variants sit along the genome, and that layout (linkage disequilibrium) also changes with growth. I wanted to know whether a CNN that sees the full SNP matrix predicts α better than a model that sees only the AFS, and when each one fails.'
spanned:
  - Coalescent simulation (msprime)
  - SNP matrix preprocessing
  - Allele frequency spectrum
  - MLP hyperparameter sweeps
  - 2-D CNN with AFS fusion
  - Ablation studies
  - Configurable experiment pipeline
stats:
  - value: '0.813'
    label: 'Pearson r on the test set after one training epoch (CNN + AFS), vs. 0.761 for the best MLP after 83'
  - value: −20%
    label: 'test MSE vs. the best MLP, 0.865 → 0.698'
  - value: 18K
    label: 'simulated populations · n 500–2,000 haplotypes · α in [0, 0.005]'
ladder:
  title: Which Signal Predicts Growth
  intro: 'Best test-set Pearson correlation for each model on the same 18,000-simulation dataset (higher is better).'
  rows:
    - label: 1-layer CNN · SNP matrix only
      value: '0.711'
    - label: 3-layer CNN · SNP matrix only
      value: '0.751'
    - label: MLP · allele frequency spectrum
      value: '0.761'
    - label: 3-layer CNN + AFS fusion
      value: '0.813'
steps:
  title: The CNN + AFS Model
  note: The CNN and AFS branches output the same size (128-d) so neither overshadows the other.
  items:
    - label: Input
      value: 2000×600
      note: 'SNP matrix, rows sorted, zero-padded'
    - label: 3 conv blocks
      value: 32→128
      note: 3×3 kernels · BatchNorm · spatial dropout
    - label: Masked pooling
      value: 128-d
      note: 'averages only real rows, not padding'
    - label: AFS branch
      value: 128-d
      note: 2001-d spectrum → FC 512 → 128
    - label: Predict αlpha
      value: 256→1
      note: concat · FC 512 · linear output
findings:
  title: What the Experiments Showed
  items:
    - label: SNP layout adds signal
      text: 'The CNN + AFS model beat the best AFS-only MLP: r 0.761 → 0.813'
    - label: One epoch was enough
      text: r 0.813 after 1 epoch; validation loss rose after that
    - label: AFS fusion matters
      text: Removing the AFS branch dropped r 0.812 → 0.751
    - label: Depth matters
      text: A 1-layer CNN reached only r 0.711
    - label: MLP overfits
      text: Best MLP needed 0.8 dropout (21-config sweep of depth × dropout)
    - label: Fewer epochs ≠ faster
      text: CNN trained 2h 23m vs. 70s for the MLP
    - label: Wider α range needs larger n
      text: 'Widening α to [0, 0.1] at the same n: MLP r 0.761 → 0.701, CNN 0.812 → 0.728'
    - label: CNN degrades more
      text: 'Likely because at very high growth, LD blocks shrink and leave little spatial structure to learn'
limitation:
  label: Limitation
  text: 'Each configuration was trained once, with a single seed, so the gaps between models haven''t been tested for statistical significance. The CNN sweep was smaller than the MLP''s because of compute limits on my machine. All data is simulated: a single haploid population, a 100 kb region, and binarized multi-allelic sites.'
order: 4
facts:
  - label: Course
    value: UCSD CSE 280
  - label: Role
    value: Solo
  - label: When
    value: Winter 2026
  - label: Result
    value: Pearson r 0.813 on held-out test set
construction: false
repo: 'https://github.com/simran-malik/growth-rate-predictor'
back: /#projects
backLabel: All projects
---

## What I Learned

* **The SNP matrix's layout carries signal the AFS misses.** Linkage disequilibrium patterns lift accuracy beyond the frequency spectrum alone.
* **The two signals work best together.** Neither the AFS alone nor the raw matrix alone gave the best estimates.
* **MSE and Pearson r catch different failures.** A model that always predicts the mean gets a passable MSE but r = 0, so I tracked both.
* **Data must scale with the target range.** A wider α range without more haplotypes left both models unable to resolve high growth rates.

## What I'd Do Next

* **Repeat runs over 5+ seeds** and test whether the gaps between models are significant.
* **Map a scaling law** for how many haplotypes a given α range needs, and validate the proposed SNP-count sufficiency check.
* **Replace average pooling with attention** over SNP positions.
* **Train on larger n** (5,000–10,000 haplotypes) and move to real sequencing data.
