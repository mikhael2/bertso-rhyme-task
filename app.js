/**
 * Bertso Rhyme Judgment Task - Web Demo
 * Speeded 750 ms Rhyme Judgment Paradigm (Knoop et al., 2021 adaptation)
 * UIUC Basque Psycholinguistics Lab
 */

// --- 1. Stimuli & Conditions Configuration ---
const PRACTICE_TRIALS = [
  {
    audio_file: "stimuli/src_A_1_d3_perfect_p10.mp3",
    correct_key: "b",
    depth: "3",
    rhyme_type: "perfect",
    puntua1: "ona",
    puntua2: "birramona",
    bertsolari: "Eli Pagola",
    neurri: "lau_puntuko_txikia",
    is_practice: true
  },
  {
    audio_file: "stimuli/src_A_1_catch_p17.mp3",
    correct_key: "e",
    depth: "catch",
    rhyme_type: "catch",
    puntua1: "nadila",
    puntua2: "ezkero",
    bertsolari: "Eli Pagola",
    neurri: "lau_puntuko_txikia",
    is_practice: true
  }
];

const EXPERIMENTAL_TRIALS = [
  {
    audio_file: "stimuli/src_A_1_d4_perfect_p13.mp3",
    correct_key: "b",
    depth: "4",
    rhyme_type: "perfect",
    puntua1: "antzeman",
    puntua2: "deman",
    bertsolari: "Miren Amuriza",
    neurri: "lau_puntuko_txikia",
    is_practice: false
  },
  {
    audio_file: "stimuli/src_A_1_d5_perfect_p21.mp3",
    correct_key: "b",
    depth: "5",
    rhyme_type: "perfect",
    puntua1: "horrekin",
    puntua2: "berrekin",
    bertsolari: "Miren Amuriza",
    neurri: "lau_puntuko_txikia",
    is_practice: false
  },
  {
    audio_file: "stimuli/src_A_1_d4_place0_p07.mp3",
    correct_key: "b",
    depth: "4",
    rhyme_type: "place0",
    puntua1: "etzan hor",
    puntua2: "nator",
    bertsolari: "Miren Amuriza",
    neurri: "lau_puntuko_txikia",
    is_practice: false
  },
  {
    audio_file: "stimuli/src_A_1_d3_place0_p11.mp3",
    correct_key: "b",
    depth: "3",
    rhyme_type: "place0",
    puntua1: "birramona",
    puntua2: "forma",
    bertsolari: "Eli Pagola",
    neurri: "lau_puntuko_txikia",
    is_practice: false
  },
  {
    audio_file: "stimuli/src_A_1_d3_place_p01.mp3",
    correct_key: "e",
    depth: "3",
    rhyme_type: "place",
    puntua1: "jota",
    puntua2: "opa",
    bertsolari: "Eli Pagola",
    neurri: "lau_puntuko_txikia",
    is_practice: false
  },
  {
    audio_file: "stimuli/src_A_1_d4_place_p17.mp3",
    correct_key: "e",
    depth: "4",
    rhyme_type: "place",
    puntua1: "nadila",
    puntua2: "borobila",
    bertsolari: "Eli Pagola",
    neurri: "lau_puntuko_txikia",
    is_practice: false
  },
  {
    audio_file: "stimuli/src_A_1_d5_manner_p22.mp3",
    correct_key: "e",
    depth: "5",
    rhyme_type: "manner",
    puntua1: "berrekin",
    puntua2: "zurekin",
    bertsolari: "Miren Amuriza",
    neurri: "lau_puntuko_txikia",
    is_practice: false
  },
  {
    audio_file: "stimuli/src_A_1_catch_p24.mp3",
    correct_key: "e",
    depth: "catch",
    rhyme_type: "catch",
    puntua1: "haurrekin",
    puntua2: "balego",
    bertsolari: "Miren Amuriza",
    neurri: "lau_puntuko_txikia",
    is_practice: false
  }
];

// Combine into total trial flow
let allTrials = [];

// --- 2. Internationalization / Bilingual Strings ---
const I18N = {
  eu: {
    langBtn: "English",
    appHeader: "Errima Epaite Lana",
    introBadge: "Iparraldeko Bertsolaritza Paradigma",
    introTitle: "Errima Epaite Lana",
    introSubtitle: "Knoop et al. (2021) paradigmaren egokitzapena bertso kupletetarako (<em>lau puntuko txikia</em>).",
    instructions: `
      <h3>🎯 Argibideak:</h3>
      <ul>
        <li>Bertso kuplet labur bat entzungo duzu (~15 segundo).</li>
        <li>Ziurtatu <strong>bolumena/audioa piztuta</strong> duzula!</li>
        <li>Audioa amaitu bezain laster, erabaki bi lerroen azken hitzek <strong>errima egiten duten ala ez</strong>.</li>
        <li><strong>Garrantzitsua:</strong> Azkar erantzun behar duzu (<strong>750 ms</strong> erantzun-leihoa)!</li>
        <li>Lehenik <strong>2 praktika-entsegu</strong> egingo dituzu berehalako itzuliarekin (feedback).</li>
      </ul>
    `,
    labelPid: "Parte-hartzailea / Participant ID:",
    labelGroup: "Kontra-oreka / Response Key Mapping:",
    groupA_desc: "[Ezker Shift] = Bai  |  [Eskuin Shift] = Ez",
    groupB_desc: "[Ezker Shift] = Ez  |  [Eskuin Shift] = Bai",
    startPractice: "HASI PRAKTIKA",
    pressSpaceOrClick: "(Sakatu Hemen edo Zuriunea)",
    listeningTitle: "♪   Entzuten…   ♫",
    listeningSub: "Bertsoa entzuten ari da (~15 s)... Arreta jarri azken hitzetan!",
    decisionPrompt: "Errima egin dute?",
    deadlineLabel: "⏱ 750 ms erantzun-leihoa",
    practiceFeedbackCorrect: "Ondo!",
    practiceFeedbackIncorrect: "Oker!",
    practiceFeedbackTimeout: "Denboraz kanpo! (750 ms)",
    practiceMeta: (cur, tot) => `Praktika ${cur} / ${tot}`,
    trialMeta: (cur, tot) => `Entsegua ${cur} / ${tot}`,
    intermissionTitle: "Oso ongi!",
    intermissionSubtitle: "Orain esperimentu nagusia hasiko da (8 entsegu).<br>Hemendik aurrera ez da itzulirik (feedbackik) izango.",
    reminderHeading: "Gogoratu zure teklak:",
    startExp: "HASI ESPERIMENTUA",
    resultsTitle: "Emaitzak / Results",
    resultsSubtitle: "Datuak arrakastaz grabatu dira. Ikus behean laburpena:",
    statAccuracy: "Zehaztasuna",
    statRt: "Batez besteko RT",
    statTimeouts: "Iraungipenak (Timeouts)",
    colNum: "#",
    colAudio: "Audio",
    colWords: "Puntuak",
    colCond: "Baldintza",
    colResp: "Erantzuna",
    colRt: "RT",
    colCorrect: "Zuzena",
    downloadCsv: "Deskargatu CSV",
    restart: "Berriro Hasi"
  },
  en: {
    langBtn: "Euskara",
    appHeader: "Bertso Rhyme Judgment Task",
    introBadge: "Basque Oral Poetry Psycholinguistic Paradigm",
    introTitle: "Rhyme Judgment Task",
    introSubtitle: "Adaptation of Knoop et al. (2021) speeded paradigm for sung bertso couplets (<em>lau puntuko txikia</em>).",
    instructions: `
      <h3>🎯 Instructions:</h3>
      <ul>
        <li>You will listen to a sung bertso couplet (~15 seconds).</li>
        <li>Make sure your <strong>sound/volume is turned on</strong>!</li>
        <li>As soon as the audio ends, decide whether the final words of the two lines <strong>rhyme or do not rhyme</strong>.</li>
        <li><strong>Important:</strong> Respond as quickly as possible (strict <strong>750 ms</strong> deadline)!</li>
        <li>First, you will complete <strong>2 practice trials</strong> with immediate feedback.</li>
      </ul>
    `,
    labelPid: "Participant ID:",
    labelGroup: "Counterbalancing / Response Key Mapping:",
    groupA_desc: "[Left Shift] = Rhyme (Yes)  |  [Right Shift] = Non-Rhyme (No)",
    groupB_desc: "[Left Shift] = Non-Rhyme (No)  |  [Right Shift] = Rhyme (Yes)",
    startPractice: "START PRACTICE",
    pressSpaceOrClick: "(Click Here or Press Space)",
    listeningTitle: "♪   Listening…   ♫",
    listeningSub: "Listening to sung couplet (~15 s)... Attend to the rhyming positions!",
    decisionPrompt: "Did they rhyme?",
    deadlineLabel: "⏱ 750 ms decision window",
    practiceFeedbackCorrect: "Correct!",
    practiceFeedbackIncorrect: "Incorrect!",
    practiceFeedbackTimeout: "Too Slow! (750 ms limit)",
    practiceMeta: (cur, tot) => `Practice ${cur} / ${tot}`,
    trialMeta: (cur, tot) => `Trial ${cur} / ${tot}`,
    intermissionTitle: "Great job!",
    intermissionSubtitle: "Now the main experimental block begins (8 trials).<br>No trial feedback will be provided from this point forward.",
    reminderHeading: "Remember your keys:",
    startExp: "START EXPERIMENT",
    resultsTitle: "Results Summary",
    resultsSubtitle: "Demo complete! Data recorded below:",
    statAccuracy: "Accuracy",
    statRt: "Mean RT",
    statTimeouts: "Timeouts (>750ms)",
    colNum: "#",
    colAudio: "Audio",
    colWords: "Rhyme Words",
    colCond: "Condition",
    colResp: "Response",
    colRt: "RT",
    colCorrect: "Correct",
    downloadCsv: "Download CSV",
    restart: "Restart Demo"
  }
};

let currentLang = "eu"; // 'eu' or 'en'
let selectedGroup = "A"; // 'A' or 'B'

// --- 3. Experiment State Variables ---
let currentTrialIndex = -1;
let currentTrial = null;
let trialStartTime = null;
let deadlineTimeoutId = null;
let deadlineAnimFrameId = null;
let isAcceptingResponse = false;
let recordedData = [];
let audioPlayer = new Audio();

// --- 4. DOM Elements ---
const screens = {
  intro: document.getElementById("screenIntro"),
  listening: document.getElementById("screenListening"),
  decision: document.getElementById("screenDecision"),
  feedback: document.getElementById("screenFeedback"),
  intermission: document.getElementById("screenIntermission"),
  results: document.getElementById("screenResults")
};

const elLangToggle = document.getElementById("langToggleBtn");
const elLangLabel = document.getElementById("langLabel");
const elParticipantId = document.getElementById("participantId");
const elGroupBtnA = document.getElementById("groupToggleBtn");
const elGroupBtnB = document.getElementById("groupToggleBtnB");
const elBtnStartPractice = document.getElementById("btnStartPractice");
const elBtnStartExperiment = document.getElementById("btnStartExperiment");
const elBtnRestart = document.getElementById("btnRestart");
const elBtnDownloadCsv = document.getElementById("btnDownloadCsv");

// Trial visual elements
const elListeningTrialMeta = document.getElementById("listeningTrialMeta");
const elDecisionTrialMeta = document.getElementById("decisionTrialMeta");
const elAudioProgressBar = document.getElementById("audioProgressBar");
const elDeadlineTimerBar = document.getElementById("deadlineTimerBar");
const elLeftKeyBadge = document.getElementById("leftKeyBadge");
const elLeftKeyMeaning = document.getElementById("leftKeyMeaning");
const elRightKeyBadge = document.getElementById("rightKeyBadge");
const elRightKeyMeaning = document.getElementById("rightKeyMeaning");
const elBtnLeft = document.getElementById("btnLeft");
const elBtnRight = document.getElementById("btnRight");

// Feedback elements
const elFeedbackIcon = document.getElementById("feedbackIcon");
const elFeedbackTitle = document.getElementById("feedbackTitle");
const elFeedbackDetails = document.getElementById("feedbackDetails");

// Results elements
const elStatAccuracy = document.getElementById("statAccuracy");
const elStatMeanRt = document.getElementById("statMeanRt");
const elStatTimeouts = document.getElementById("statTimeouts");
const elResultsTableBody = document.getElementById("resultsTableBody");
const elReminderKeysText = document.getElementById("reminderKeysText");

// --- 5. Helper Functions ---
function setScreen(screenName) {
  Object.values(screens).forEach(screen => screen.classList.remove("active"));
  if (screens[screenName]) {
    screens[screenName].classList.add("active");
  }
}

function updateKeyLabels() {
  const t = I18N[currentLang];
  if (selectedGroup === "A") {
    // Left: Bai (Rhyme), Right: Ez (No rhyme)
    elLeftKeyMeaning.textContent = currentLang === "eu" ? "Bai (Errima)" : "Yes (Rhyme)";
    elRightKeyMeaning.textContent = currentLang === "eu" ? "Ez (Ez du errimarik)" : "No (No Rhyme)";
    elReminderKeysText.innerHTML = `
      <div><span class="key-chip">[${currentLang === "eu" ? "Ezker Shift" : "Left Shift"}]</span> → ${currentLang === "eu" ? "Bai, errima dute" : "Yes, they rhyme"}</div>
      <div><span class="key-chip">[${currentLang === "eu" ? "Eskuin Shift" : "Right Shift"}]</span> → ${currentLang === "eu" ? "Ez, ez dute errimarik" : "No, they do not rhyme"}</div>
    `;
  } else {
    // Left: Ez (No rhyme), Right: Bai (Rhyme)
    elLeftKeyMeaning.textContent = currentLang === "eu" ? "Ez (Ez du errimarik)" : "No (No Rhyme)";
    elRightKeyMeaning.textContent = currentLang === "eu" ? "Bai (Errima)" : "Yes (Rhyme)";
    elReminderKeysText.innerHTML = `
      <div><span class="key-chip">[${currentLang === "eu" ? "Ezker Shift" : "Left Shift"}]</span> → ${currentLang === "eu" ? "Ez, ez dute errimarik" : "No, they do not rhyme"}</div>
      <div><span class="key-chip">[${currentLang === "eu" ? "Eskuin Shift" : "Right Shift"}]</span> → ${currentLang === "eu" ? "Bai, errima dute" : "Yes, they rhyme"}</div>
    `;
  }
  elLeftKeyBadge.textContent = currentLang === "eu" ? "Ezker Shift" : "Left Shift";
  elRightKeyBadge.textContent = currentLang === "eu" ? "Eskuin Shift" : "Right Shift";
}

function updateLanguage(lang) {
  currentLang = lang;
  const t = I18N[lang];
  elLangLabel.textContent = t.langBtn;
  document.getElementById("appHeaderTitle").textContent = t.appHeader;
  document.getElementById("introBadge").textContent = t.introBadge;
  document.getElementById("introTitle").textContent = t.introTitle;
  document.getElementById("introSubtitle").innerHTML = t.introSubtitle;
  document.getElementById("introInstructions").innerHTML = t.instructions;
  document.getElementById("labelPid").textContent = t.labelPid;
  document.getElementById("labelGroup").textContent = t.labelGroup;
  document.getElementById("startPracticeLabel").textContent = t.startPractice;
  document.querySelector("#btnStartPractice .btn-subtext").textContent = t.pressSpaceOrClick;
  
  document.getElementById("listeningTitle").textContent = t.listeningTitle;
  document.getElementById("listeningSub").textContent = t.listeningSub;
  document.getElementById("decisionPrompt").textContent = t.decisionPrompt;
  document.getElementById("deadlineLabel").textContent = t.deadlineLabel;
  
  document.getElementById("intermissionTitle").textContent = t.intermissionTitle;
  document.getElementById("intermissionSubtitle").innerHTML = t.intermissionSubtitle;
  document.getElementById("reminderHeading").textContent = t.reminderHeading;
  document.getElementById("startExpLabel").textContent = t.startExp;
  document.querySelector("#btnStartExperiment .btn-subtext").textContent = t.pressSpaceOrClick;

  document.getElementById("resultsTitle").textContent = t.resultsTitle;
  document.getElementById("resultsSubtitle").textContent = t.resultsSubtitle;
  document.getElementById("statAccuracyLabel").textContent = t.statAccuracy;
  document.getElementById("statRtLabel").textContent = t.statRt;
  document.getElementById("statTimeoutsLabel").textContent = t.statTimeouts;
  document.getElementById("downloadCsvLabel").textContent = t.downloadCsv;
  document.getElementById("restartLabel").textContent = t.restart;

  updateKeyLabels();
}

// --- 6. Trial Execution Flow ---
function buildTrialList() {
  allTrials = [
    ...PRACTICE_TRIALS.map((t, i) => ({ ...t, practice_index: i + 1 })),
    ...EXPERIMENTAL_TRIALS.map((t, i) => ({ ...t, exp_index: i + 1 }))
  ];
}

function startPractice() {
  buildTrialList();
  recordedData = [];
  currentTrialIndex = 0;
  runTrial(currentTrialIndex);
}

function startExperiment() {
  currentTrialIndex = PRACTICE_TRIALS.length; // Jump to trial 2 (0-indexed = trial 3)
  runTrial(currentTrialIndex);
}

function runTrial(index) {
  if (index >= allTrials.length) {
    showResults();
    return;
  }

  currentTrial = allTrials[index];
  const t = I18N[currentLang];

  // Update trial pill
  const metaText = currentTrial.is_practice 
    ? t.practiceMeta(currentTrial.practice_index, PRACTICE_TRIALS.length)
    : t.trialMeta(currentTrial.exp_index, EXPERIMENTAL_TRIALS.length);
  
  elListeningTrialMeta.textContent = metaText;
  elDecisionTrialMeta.textContent = metaText;

  // Switch to listening screen
  setScreen("listening");
  elAudioProgressBar.style.width = "0%";

  // Play audio
  audioPlayer.src = currentTrial.audio_file;
  audioPlayer.currentTime = 0;

  audioPlayer.ontimeupdate = () => {
    if (audioPlayer.duration) {
      const pct = (audioPlayer.currentTime / audioPlayer.duration) * 100;
      elAudioProgressBar.style.width = `${pct}%`;
    }
  };

  audioPlayer.onended = () => {
    elAudioProgressBar.style.width = "100%";
    // 50 ms post-stimulus buffer as in Knoop et al. replication
    setTimeout(() => {
      startDecisionWindow();
    }, 50);
  };

  audioPlayer.onerror = (e) => {
    console.error("Audio playback error:", e);
    // Fallback if audio fails to load
    setTimeout(() => {
      startDecisionWindow();
    }, 1500);
  };

  audioPlayer.play().catch(err => {
    console.warn("Autoplay prevented or interrupted:", err);
    // User might need a gesture
  });
}

function startDecisionWindow() {
  setScreen("decision");
  isAcceptingResponse = true;
  trialStartTime = performance.now();

  // Reset deadline animation bar
  elDeadlineTimerBar.style.transition = "none";
  elDeadlineTimerBar.style.transform = "scaleX(1)";
  // Force reflow
  void elDeadlineTimerBar.offsetWidth;
  // Animate over 750ms to 0
  elDeadlineTimerBar.style.transition = "transform 750ms linear";
  elDeadlineTimerBar.style.transform = "scaleX(0)";

  // Strict 750 ms deadline timer
  clearTimeout(deadlineTimeoutId);
  deadlineTimeoutId = setTimeout(() => {
    if (isAcceptingResponse) {
      handleResponse(null, true);
    }
  }, 750);
}

function handleResponse(chosenKeyMeaning, timedOut = false) {
  if (!isAcceptingResponse) return;
  isAcceptingResponse = false;
  clearTimeout(deadlineTimeoutId);

  const rt = timedOut ? 750 : Math.round(performance.now() - trialStartTime);
  const correctKey = currentTrial.correct_key; // 'b' (rhyme) or 'e' (no rhyme)
  const isCorrect = (!timedOut) && (chosenKeyMeaning === correctKey);

  const trialRecord = {
    trial_index: currentTrialIndex + 1,
    is_practice: currentTrial.is_practice ? 1 : 0,
    participant: elParticipantId.value || "Anonymous",
    group: selectedGroup,
    audio_file: currentTrial.audio_file,
    depth: currentTrial.depth,
    rhyme_type: currentTrial.rhyme_type,
    puntua1: currentTrial.puntua1,
    puntua2: currentTrial.puntua2,
    bertsolari: currentTrial.bertsolari,
    neurri: currentTrial.neurri,
    correct_key: correctKey,
    response_key: chosenKeyMeaning || "TIMEOUT",
    rt: rt,
    timed_out: timedOut ? 1 : 0,
    is_correct: isCorrect ? 1 : 0
  };

  recordedData.push(trialRecord);

  // If Practice Trial: Show 1200 ms feedback
  if (currentTrial.is_practice) {
    showPracticeFeedback(isCorrect, timedOut, rt);
  } else {
    // Experimental trial: 400 ms ISI blank fixation then next
    setTimeout(() => {
      advanceTrial();
    }, 400);
  }
}

function showPracticeFeedback(isCorrect, timedOut, rt) {
  setScreen("feedback");
  const t = I18N[currentLang];

  if (timedOut) {
    elFeedbackIcon.textContent = "⏱";
    elFeedbackIcon.className = "feedback-icon timeout";
    elFeedbackTitle.textContent = t.practiceFeedbackTimeout;
    elFeedbackDetails.textContent = currentLang === "eu" ? "Erantzun 750 ms baino lehen!" : "Respond before the 750 ms deadline!";
  } else if (isCorrect) {
    elFeedbackIcon.textContent = "✓";
    elFeedbackIcon.className = "feedback-icon correct";
    elFeedbackTitle.textContent = t.practiceFeedbackCorrect;
    elFeedbackDetails.textContent = `${currentLang === "eu" ? "Erantzun-denbora" : "Reaction Time"}: ${rt} ms`;
  } else {
    elFeedbackIcon.textContent = "✗";
    elFeedbackIcon.className = "feedback-icon incorrect";
    elFeedbackTitle.textContent = t.practiceFeedbackIncorrect;
    elFeedbackDetails.textContent = `${currentLang === "eu" ? "Erantzun-denbora" : "Reaction Time"}: ${rt} ms`;
  }

  setTimeout(() => {
    advanceTrial();
  }, 1300);
}

function advanceTrial() {
  currentTrialIndex++;
  // If we just finished practice trials (2 trials total), show intermission
  if (currentTrialIndex === PRACTICE_TRIALS.length) {
    setScreen("intermission");
  } else {
    runTrial(currentTrialIndex);
  }
}

// --- 7. Results & CSV Export ---
function showResults() {
  setScreen("results");
  const t = I18N[currentLang];

  const expData = recordedData.filter(d => d.is_practice === 0);
  const validExpTrials = expData.length > 0 ? expData : recordedData;

  const correctCount = validExpTrials.filter(d => d.is_correct === 1).length;
  const timeoutCount = validExpTrials.filter(d => d.timed_out === 1).length;
  const validRts = validExpTrials.filter(d => d.timed_out === 0).map(d => d.rt);
  const meanRt = validRts.length > 0 ? Math.round(validRts.reduce((a, b) => a + b, 0) / validRts.length) : 0;
  const accuracyPct = Math.round((correctCount / validExpTrials.length) * 100);

  elStatAccuracy.textContent = `${accuracyPct}%`;
  elStatMeanRt.textContent = `${meanRt} ms`;
  elStatTimeouts.textContent = `${timeoutCount}`;

  // Populate Table
  elResultsTableBody.innerHTML = "";
  recordedData.forEach((row, i) => {
    const tr = document.createElement("tr");
    const audioName = row.audio_file.split("/").pop();
    const isPracticeTag = row.is_practice ? "(P) " : "";
    
    let respText = row.response_key === "b" ? "Bai" : row.response_key === "e" ? "Ez" : "TIMEOUT";
    let corrClass = row.is_correct === 1 ? "corr-yes" : "corr-no";
    let corrSymbol = row.is_correct === 1 ? "✓" : "✗";

    tr.innerHTML = `
      <td>${isPracticeTag}${row.trial_index}</td>
      <td title="${audioName}">${audioName.substring(0, 16)}…</td>
      <td><strong>${row.puntua1}</strong> / <strong>${row.puntua2}</strong></td>
      <td><span class="cond-pill cond-${row.rhyme_type}">${row.rhyme_type} (d${row.depth})</span></td>
      <td>${respText}</td>
      <td>${row.rt} ms</td>
      <td class="${corrClass}">${corrSymbol}</td>
    `;
    elResultsTableBody.appendChild(tr);
  });
}

function downloadCsv() {
  if (recordedData.length === 0) return;
  const headers = Object.keys(recordedData[0]).join(",");
  const rows = recordedData.map(r => Object.values(r).map(v => typeof v === "string" && v.includes(",") ? `"${v}"` : v).join(","));
  const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
  
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  const pid = (elParticipantId.value || "demo").replace(/[^a-zA-Z0-9_-]/g, "_");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `bertso_rhyme_${pid}_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// --- 8. Event Listeners & Keyboard Handling ---
// Key event handler
window.addEventListener("keydown", (e) => {
  // Allow spacebar to advance on Intro or Intermission screens
  if (screens.intro.classList.contains("active") && (e.code === "Space" || e.code === "Enter")) {
    if (document.activeElement !== elParticipantId) {
      e.preventDefault();
      startPractice();
      return;
    }
  }

  if (screens.intermission.classList.contains("active") && (e.code === "Space" || e.code === "Enter")) {
    e.preventDefault();
    startExperiment();
    return;
  }

  // Shift Key Handling on Decision Screen
  if (isAcceptingResponse) {
    if (e.code === "ShiftLeft") {
      e.preventDefault();
      // If Group A: Left = 'b' (Bai), If Group B: Left = 'e' (Ez)
      const meaning = selectedGroup === "A" ? "b" : "e";
      handleResponse(meaning, false);
    } else if (e.code === "ShiftRight") {
      e.preventDefault();
      // If Group A: Right = 'e' (Ez), If Group B: Right = 'b' (Bai)
      const meaning = selectedGroup === "A" ? "e" : "b";
      handleResponse(meaning, false);
    }
  }
});

// Click handlers for UI buttons
elBtnLeft.addEventListener("click", () => {
  if (isAcceptingResponse) {
    const meaning = selectedGroup === "A" ? "b" : "e";
    handleResponse(meaning, false);
  }
});

elBtnRight.addEventListener("click", () => {
  if (isAcceptingResponse) {
    const meaning = selectedGroup === "A" ? "e" : "b";
    handleResponse(meaning, false);
  }
});

elBtnStartPractice.addEventListener("click", startPractice);
elBtnStartExperiment.addEventListener("click", startExperiment);
elBtnRestart.addEventListener("click", () => {
  audioPlayer.pause();
  setScreen("intro");
});
elBtnDownloadCsv.addEventListener("click", downloadCsv);

// Language toggle
elLangToggle.addEventListener("click", () => {
  const nextLang = currentLang === "eu" ? "en" : "eu";
  updateLanguage(nextLang);
});

// Group selection toggle
elGroupBtnA.addEventListener("click", () => {
  selectedGroup = "A";
  elGroupBtnA.classList.add("active");
  elGroupBtnB.classList.remove("active");
  updateKeyLabels();
});

elGroupBtnB.addEventListener("click", () => {
  selectedGroup = "B";
  elGroupBtnB.classList.add("active");
  elGroupBtnA.classList.remove("active");
  updateKeyLabels();
});

// Initial Setup
updateLanguage("eu");
updateKeyLabels();
