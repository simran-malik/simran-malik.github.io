---
layout: ../../layouts/CaseStudy.astro
title: 'Pupper Potter: A Trivia Maze Game on the Mini Pupper Robot'
summary: 'A Harry Potter–themed game where players steer a quadruped robot through a physical maze while it asks trivia, keeps score and times the run. I built the robot''s voice, screen, data layer and puzzle logic, and we tested the game with four players.'
stack: ROS2 · Python · Piper TTS · Mini Pupper
cover: ROS2
image: ''
links:
  - label: Technical Report
    href: /projects/pupper-potter-project-report.pdf
spanned:
  - Robotics
  - Text-to-speech pipeline
  - Audio playback
  - LCD display rendering
  - Data layer design
  - HRI / UX design
  - Touch sensing
  - Testing on hardware
stats:
  - value: '3.95'
    suffix: / 5
    label: average enjoyment and engagement rating across 4 players
  - value: '3.83'
    suffix: / 5
    label: average robot-acceptance rating
  - value: '+1.75'
    suffix: / 20
    label: 'average quiz gain after one game (10 → 11.75), smaller than we aimed for'
ladder:
  title: What Players Said
  intro: 'Average agreement with selected survey statements (1–5, four participants), highest to lowest.'
  rows:
    - label: I felt motivated to answer correctly
      value: '4.75'
    - label: The robot's movements and sounds added to my enjoyment
      value: '4.5'
    - label: I felt comfortable interacting with the robot
      value: '4.5'
    - label: The robot made the game more fun than a regular quiz
      value: '4.25'
    - label: I would play this game again
      value: '3.25'
    - label: I trust robots to guide me through tasks
      value: '3.0'
steps:
  title: Pre- vs. Post-Game Quiz
  note: 'Same 20-question Harry Potter quiz before and after one playthrough. P1 scored 20/20 both times, so had no room to improve.'
  items:
    - label: P1
      value: '+0'
      note: 20 → 20
    - label: P2
      value: '+2'
      note: 10 → 12
    - label: P3
      value: '+2'
      note: 5 → 7
    - label: P4
      value: '+3'
      note: 5 → 8
findings:
  title: What I Built
  items:
    - label: Text-to-speech
      text: 'Offline Piper pipeline that bulk-generates every dialogue clip, in a British voice chosen to sound like Dumbledore'
    - label: Audio playback
      text: Blocking playback so lines never overlap; volume turned down after close-range tests on the robot
    - label: LCD display
      text: 'Questions and choices drawn on the 320×240 screen, so players don''t have to remember them'
    - label: Shared data layer
      text: 'JSON store for scores, time penalties and asked questions, read by every node; no question repeats'
    - label: Puzzle state machine
      text: '30-second ROS2 answer timer; right, left and front touch sensors map to A, B and C'
    - label: Teaching on a miss
      text: The robot says the correct answer after a wrong answer or a timeout
    - label: Touch sensing · with Kelly
      text: 'Polls every 0.1 s and caches each sensor''s state, so a long press counts once'
    - label: Hiding latency
      text: 'Final-score speech is generated during the celebration music and dance, removing an awkward silence'
figure:
  title: Designing the Puzzle Interaction
  image: /projects/pupper-potter-puzzle-flow.jpg
  alt: 'Sketch of the puzzle flow on the robot''s screen, with a Dumbledore face on each panel. The robot asks if the player is ready and waits; asks the question; says there are 30 seconds to answer. A correct answer gets positive reinforcement. A wrong answer or timeout gets empathy, then the correct answer, then the time penalty, then encouragement.'
  caption: 'I designed the flow at each puzzle point by building it, playing through it and refining it. A correct answer gets praise; a wrong answer or a timeout gets empathy, the correct answer, the time penalty and then encouragement.'
limitation:
  label: Limitations
  text: 'Four participants, all UCSD students recruited in the CSE building, who may already be comfortable with technology. We couldn''t get access to the validated ERAS and ARM scales, so the surveys were our own. The results are early signals, not conclusions.'
order: 6
facts:
  - label: Course
    value: UCSD CSE 276
  - label: Role
    value: Team of 3
  - label: When
    value: Winter 2026
construction: false
repo: 'https://github.com/Kehiio/Triwizard_Pupper'
back: /#projects
backLabel: All projects
---

## How It Works

The robot greets the player and explains the rules, then walks to a puzzle point and asks a multiple-choice question. Question difficulty (easy, medium or hard) depends on the puzzle point. A correct answer adds points; a wrong answer or a timeout adds a time penalty. At forks the player picks the next path by touch. At the end, the robot announces the final score and total time.

Three ROS2 nodes run the game: a **game controller** that tracks the game state, a **puzzle service** for the trivia and a **navigator** for movement. They talk through services and topics. Kelly led navigation and the game controller, and Shruti led the greeting.

## What We Found

* **Players enjoyed it.** Many were touching a robot for the first time. They hesitated at first, then relaxed and needed little help.
* **One playthrough taught little.** Scores rose by 1.75 points out of 20 on average, matching our pilot.
* **Comfort didn't mean trust.** Players were comfortable with the robot in the game (4.5), but rated trusting robots to guide them through tasks 3.0.

## What I'd Do Next

* **Design for learning.** Repeat playthroughs and add explanations of answers.
* **Test with younger students,** who may benefit more than college students.
* **Run a bigger study** with validated scales and more hardware testing beforehand.
* **Generate quizzes with an LLM** on topics each player picks.
