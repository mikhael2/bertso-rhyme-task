# Errima-erabaki Lana

---

## Overview
This web application implements a speeded rhyme decision paradigm testing whether native and proficient Basque speakers perceive rhyme in sung bertso couplets (*kupletak*).

### Key Features
- **Speeded Decision Window:** A **1000 ms** response deadline (with 50 ms post-stimulus buffer) following audio offset, adapted from Knoop et al. (2021).
- **Keyboard & Click Input:**
  - Response keys: **Ezker Shift** = Bai (Errima) vs. **Eskuin Shift** = Ez (Ez du errimarik).
  - Also responsive to mouse/touch input on mobile and desktop.
- **10 Balanced Trials:**
  - 2 Practice anchors (1 Perfect Rhyme + 1 Catch Non-Rhyme) with immediate feedback and reaction time.
  - Intermission instructions screen.
  - 8 Experimental trials (4 Rhyme / Bai, 4 Non-Rhyme / Ez) covering rhyme depth levels 3, 4, 5, and phonetic slant categories.
- **Exportable Data:** Generates timestamped CSV files with millisecond reaction times and trial metadata matching standard PsychoPy output format.

---

## Live Demo
Access the live experiment directly in your browser:  
👉 **[https://mikhael2.github.io/bertso-rhyme-task/](https://mikhael2.github.io/bertso-rhyme-task/)**
