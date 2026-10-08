# Errima Epaite Lana

---

## Overview
This web application implements a speeded rhyme judgment paradigm testing whether native and proficient Basque speakers perceive rhyme in bertsolaritza.

### Key Features
- **Speeded Decision Window:** A **750 ms** response deadline (with 50 ms post-stimulus buffer) following audio offset, directly mirroring Knoop et al. (2021).
- **Keyboard & Click Input:**
  - Counterbalanced Shift keys: **Left Shift** vs. **Right Shift** (Group A vs. Group B).
  - Also responsive to mouse/touch input on mobile and desktop.
- **Bilingual Interface:** Instant real-time toggle between **Euskara** and **English** for international collaborators and participants.
- **10 Balanced Trials:**
  - 2 Practice anchors (1 Perfect Rhyme + 1 Catch Non-Rhyme) with immediate feedback and reaction time.
  - Intermission instructions screen.
  - 8 Experimental trials (4 Rhyme / Bai, 4 Non-Rhyme / Ez) covering rhyme depth levels 3, 4, 5, and phonetic slant categories.
- **Exportable Data:** Generates timestamped CSV files with millisecond reaction times, accuracy, and trial metadata matching standard PsychoPy output format.

---

## Live Demo
Access the live experiment directly in your browser:  
 **[https://mikhael2.github.io/bertso-rhyme-task/](https://mikhael2.github.io/bertso-rhyme-task/)**
