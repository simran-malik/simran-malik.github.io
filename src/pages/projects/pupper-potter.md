---
layout: ../../layouts/CaseStudy.astro
title: 'Pupper Potter: An interactive trivia with the Mini Pupper robot'
summary: A Harry Potter–themed game on a quadruped robot, coordinated by a distributed ROS2 state machine.
stack: ROS2 · Python · Piper TTS
cover: ROS2
image: ''
order: 6
facts:
  - label: When
    value: Winter 2026
  - label: Course
    value: UCSD CSE 276
back: /#projects
backLabel: All projects
construction: true
repo: https://github.com/Kehiio/Triwizard_Pupper
---

## What it is

An interactive game on the Pupper quadruped robot: the robot navigates, talks and shows puzzle states on its screen as players progress.

## How it works

A distributed ROS2 architecture with a finite state machine — a game controller, a puzzle node and a navigator — coordinating movement, speech (Piper text-to-speech) and the LCD display.

## A detail I liked

The touch sensors registered one tap as two. I wrote a GPIO sensor node that polls at 10 Hz and caches state to filter out the double-touch noise, and tested it on the physical robot.
