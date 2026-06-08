---
title: 3M Cartridge Service-Life Tool
tagline: Batch-automates 3M's respirator cartridge service-life calculator — CSV in, PDF reports out.
description: A Playwright automation tool that drives 3M's Service Life Software for many chemicals at once, with automatic PubChem unit conversion and PDF report capture.
status: Stable · v2.3
order: 2
featured: true
stack:
  - Python
  - Playwright
  - PubChem API
  - CSV
repo: https://github.com/DravenYe/3m-sls-tool
---

## The problem

Respirator cartridge selection requires estimating **service life** — how long a chemical cartridge protects against breakthrough under given exposure, humidity, temperature, and work-rate conditions. 3M publishes an excellent web-based Service Life Software calculator, but it's one chemical at a time, click by click. For an industrial hygienist assessing dozens of substances, that's hours of repetitive form-filling.

## What it does

You fill in a `tasks.csv` — one row per chemical — and the tool drives the 3M website end-to-end for every row:

- Searches each substance by **CAS number**, selects the cartridge, and enters exposure, humidity, temperature, and work intensity.
- Converts units automatically: **mg/m³ → ppm** via a PubChem molecular-weight lookup (`ppm = mg/m³ × 24.45 ÷ MW`).
- Falls back to the substance's OEL when no exposure value is given.
- Downloads one **PDF report per chemical** plus a consolidated `summary.csv` of all service-life values.
- Handles the website's quirks gracefully — cookie banners, chemicals with no breakthrough field, substances limited to specific temperatures.

Run it silently in the background, or in visible-browser mode to watch and debug. On failure it captures a screenshot for diagnosis.

## Why it's interesting

It's a small tool with an honest scope: take a tedious, error-prone manual workflow and make it a one-click batch job — while staying resilient to a third-party site that changes its layout (v2.3 adapted to 3M's May 2026 redesign). Practical industrial-hygiene automation, open-sourced.

→ **[View the tool on GitHub](https://github.com/DravenYe/3m-sls-tool)**
