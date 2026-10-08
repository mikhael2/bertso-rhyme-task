# Bertso Rhyme Judgment Task (Errima Epaite Lana)

**Speeded Auditory Rhyme Judgment Paradigm for Sung Bertso Couplets**  
*Adaptation of Knoop et al. (2021) for Basque Oral Poetry (*Bertsolaritza*)*  
**Author:** Mikhael Hayes (`mikhael2@illinois.edu`)  
**Affiliation:** University of Illinois Urbana-Champaign (UIUC) & Chateaubriand Fellowship  

---

## 🎯 Overview
This web application implements a speeded rhyme judgment paradigm testing whether native and proficient Basque speakers perceive various types of rhymes (perfect rhymes, coronal place0 slant rhymes, non-coronal place slant rhymes, manner slants, and catch controls) in natural sung bertsolaritza couplets (*lau puntuko txikia* meter).

### Key Features
- **Speeded Decision Window:** Strict **750 ms** response deadline (with 50 ms post-stimulus buffer) following audio offset, directly mirroring Knoop et al. (2021).
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

## 🚀 Live Demo
Access the live experiment directly in your browser:  
👉 **[https://mikhael2.github.io/bertso-rhyme-task/](https://mikhael2.github.io/bertso-rhyme-task/)**

---

## 📂 Repository Structure
```
.
├── index.html       # Single-page experiment interface
├── style.css        # Responsive dark UI & animations
├── app.js           # Timing engine, trial loop, and CSV exporter
└── stimuli/         # Audio clips of sung bertso couplets (MP3)
```

---

## 📚 References
- Knoop, C. A., Wagner, V., Jacobsen, T., & Menninghaus, W. (2021). *Mapping the Semantic and Aesthetic Dimensions of Rhyme in Poetry*.
- Basque Bertsolaritza Audio Corpus (Miren Amuriza & Eli Pagola, *lau puntuko txikia*).
