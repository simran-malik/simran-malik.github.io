---
layout: ../../layouts/CaseStudy.astro
title: Pupper Potter
summary: A Harry Potter–themed game played with a four-legged robot.
back: /#projects
backLabel: All projects
facts:
  When: Winter 2026
  Course: UCSD CSE 276
  Stack: ROS2 · Python · Piper TTS · GPIO
construction: true
repo: https://github.com/Kehiio/Triwizard_Pupper
---

## What it is

An interactive game on the Pupper quadruped robot: the robot navigates, talks and shows puzzle states on its screen as players progress.

## How it works

A distributed ROS2 architecture with a finite state machine — a game controller, a puzzle node and a navigator — coordinating movement, speech (Piper text-to-speech) and the LCD display.

## A detail I liked

The touch sensors registered one tap as two. I wrote a GPIO sensor node that polls at 10 Hz and caches state to filter out the double-touch noise, and tested it on the physical robot.
