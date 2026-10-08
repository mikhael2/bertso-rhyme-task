/**
 * Bertso Rhyme Judgment Task - Web Demo
 * Speeded 750 ms Rhyme Judgment Paradigm (Knoop et al., 2021 adaptation)
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

let allTrials = [];

// --- 2. Internationalization / Bilingual Strings ---
const I18N = {
  eu: {
    langBtn: "English",
    appHeader: "Errima Epaite Lana",
    introTitle: "Errima Epaite Lana",
    introSubtitle: "Bertso-pareen entzutezko errima-erabaki lana (<em>lau puntuko txikia</em>).",
    instructions: `
      <h3>Argibideak:</h3>
      <ul>
        <li>Bertso-kuplet bat entzungo duzu (~15 segundo). Ziurtatu audioa piztuta duzula.</li>
        <li>Audioa amaitu bezain pronto, pantailan galdera agertuko da.</li>
        <li>Erabaki bi lerroen amaierako hitzek <strong>errima egiten duten ala ez</strong>.</li>
        <li><strong>Garrantzitsua:</strong> Erantzun ahal bezain azkar (<strong>750 ms</strong> erantzun-leihoa).</li>
        <li>Lehenengo <strong>2 praktika-entsegu</strong> egingo dituzu zure erantzunaren itzuliarekin (feedback).</li>
      </ul>
    `,
    labelPid: "Parte-hartzaile zenbakia / Participant ID:",
    labelGroup: "Erantzun-teklak / Response keys:",
    keysDisplayHtml: "<span><strong>[Ezker Shift]</strong> = Bai (Errima)</span><span><strong>[Eskuin Shift]</strong> = Ez (Ez du errimarik)</span>",
    startPractice: "HASI PRAKTIKA",
    listeningStatus: "Entzuten... / Listening...",
    decisionPrompt: "Errima egin dute?",
    deadlineLabel: "750 ms",
    practiceFeedbackCorrect: "ZUZENA",
    practiceFeedbackIncorrect: "OKERRA",
    practiceFeedbackTimeout: "DENBORAZ KANPO (>750 ms)",
    practiceMeta: (cur, tot) => `Praktika ${cur} / ${tot}`,
    trialMeta: (cur, tot) => `Entsegua ${cur} / ${tot}`,
    intermissionTitle: "Praktika Amaitu Da",
    intermissionSubtitle: "Orain esperimentu nagusia hasiko da (8 entsegu).<br>Hemendik aurrera ez da itzulirik (feedbackik) emango.",
    reminderHeading: "Teklen konfigurazioa:",
    startExp: "HASI ESPERIMENTUA",
    resultsTitle: "Emaitzak / Results",
    resultsSubtitle: "Entseguen laburpena:",
    statAccuracy: "Zehaztasuna",
    statRt: "Batez besteko RT",
    statTimeouts: "Timeouts (>750ms)",
    colNum: "#",
    colAudio: "Audio",
    colWords: "Puntuak",
    colCond: "Mota",
    colResp: "Erantzuna",
    colRt: "RT",
    colCorrect: "Zuzena",
    downloadCsv: "Deskargatu CSV",
    restart: "Berriro Hasi"
  },
  en: {
    langBtn: "Euskara",
    appHeader: "Bertso Rhyme Judgment Task",
    introTitle: "Rhyme Judgment Task",
    introSubtitle: "Auditory speeded rhyme judgment for sung bertso couplets (<em>lau puntuko txikia</em>).",
    instructions: `
      <h3>Instructions:</h3>
      <ul>
        <li>You will listen to a sung bertso couplet (~15 seconds). Make sure audio is on.</li>
        <li>As soon as the audio ends, the decision prompt will appear on screen.</li>
        <li>Decide whether the final words of the two lines <strong>rhyme or do not rhyme</strong>.</li>
        <li><strong>Important:</strong> Respond as quickly as possible (strict <strong>750 ms</strong> deadline).</li>
        <li>First, you will complete <strong>2 practice trials</strong> with immediate feedback.</li>
      </ul>
    `,
    labelPid: "Participant ID:",
    labelGroup: "Response keys:",
    keysDisplayHtml: "<span><strong>[Left Shift]</strong> = Yes (Rhyme)</span><span><strong>[Right Shift]</strong> = No (No rhyme)</span>",
    startPractice: "START PRACTICE",
    listeningStatus: "Listening...",
    decisionPrompt: "Did they rhyme?",
    deadlineLabel: "750 ms",
    practiceFeedbackCorrect: "CORRECT",
    practiceFeedbackIncorrect: "INCORRECT",
    practiceFeedbackTimeout: "TIMEOUT (>750 ms)",
    practiceMeta: (cur, tot) => `Practice ${cur} / ${tot}`,
    trialMeta: (cur, tot) => `Trial ${cur} / ${tot}`,
    intermissionTitle: "Practice Completed",
    intermissionSubtitle: "Now the experimental block begins (8 trials).<br>No feedback will be provided during this phase.",
    reminderHeading: "Key configuration:",
    startExp: "START EXPERIMENT",
    resultsTitle: "Results Summary",
    resultsSubtitle: "Summary of experimental session:",
    statAccuracy: "Accuracy",
    statRt: "Mean RT",
    statTimeouts: "Timeouts (>750ms)",
    colNum: "#",
    colAudio: "Audio",
    colWords: "Rhyme Words",
    colCond: "Type",
    colResp: "Response",
    colRt: "RT",
    colCorrect: "Correct",
    downloadCsv: "Download CSV",
    restart: "Restart"
  }
};

let currentLang = "eu";
const fixedGroup = "A"; // Left Shift = Bai / Right Shift = Ez

// --- 3. Experiment State Variables ---
let currentTrialIndex = -1;
let currentTrial = null;
let trialStartTime = null;
let deadlineTimeoutId = null;
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
const elKeysDisplay = document.getElementById("keysDisplay");
const elBtnStartPractice = document.getElementById("btnStartPractice");
const elBtnStartExperiment = document.getElementById("btnStartExperiment");
const elBtnRestart = document.getElementById("btnRestart");
const elBtnDownloadCsv = document.getElementById("btnDownloadCsv");

// Trial visual elements
const elListeningTrialMeta = document.getElementById("listeningTrialMeta");
const elDecisionTrialMeta = document.getElementById("decisionTrialMeta");
const elListeningStatus = document.getElementById("listeningStatus");
const elAudioProgressBar = document.getElementById("audioProgressBar");
const elDeadlineTimerBar = document.getElementById("deadlineTimerBar");
const elLeftKeyBadge = document.getElementById("leftKeyBadge");
const elLeftKeyMeaning = document.getElementById("leftKeyMeaning");
const elRightKeyBadge = document.getElementById("rightKeyBadge");
const elRightKeyMeaning = document.getElementById("rightKeyMeaning");
const elBtnLeft = document.getElementById("btnLeft");
const elBtnRight = document.getElementById("btnRight");

// Feedback elements
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
  elLeftKeyMeaning.textContent = currentLang === "eu" ? "Bai (Errima)" : "Yes (Rhyme)";
  elRightKeyMeaning.textContent = currentLang === "eu" ? "Ez (Ez du errimarik)" : "No (No Rhyme)";
  elLeftKeyBadge.textContent = currentLang === "eu" ? "Ezker Shift" : "Left Shift";
  elRightKeyBadge.textContent = currentLang === "eu" ? "Eskuin Shift" : "Right Shift";

  elReminderKeysText.innerHTML = `
    <div>[${currentLang === "eu" ? "Ezker Shift" : "Left Shift"}] → ${currentLang === "eu" ? "Bai, errima dute" : "Yes, rhyme"}</div>
    <div>[${currentLang === "eu" ? "Eskuin Shift" : "Right Shift"}] → ${currentLang === "eu" ? "Ez, ez dute errimarik" : "No, do not rhyme"}</div>
  `;

  if (elKeysDisplay) {
    elKeysDisplay.innerHTML = t.keysDisplayHtml;
  }
}

function updateLanguage(lang) {
  currentLang = lang;
  const t = I18N[lang];
  elLangLabel.textContent = t.langBtn;
  document.getElementById("appHeaderTitle").textContent = t.appHeader;
  document.getElementById("introTitle").textContent = t.introTitle;
  document.getElementById("introSubtitle").innerHTML = t.introSubtitle;
  document.getElementById("introInstructions").innerHTML = t.instructions;
  document.getElementById("labelPid").textContent = t.labelPid;
  document.getElementById("labelGroup").textContent = t.labelGroup;
  document.getElementById("startPracticeLabel").textContent = t.startPractice;
  
  if (elListeningStatus) elListeningStatus.textContent = t.listeningStatus;
  document.getElementById("decisionPrompt").textContent = t.decisionPrompt;
  document.getElementById("deadlineLabel").textContent = t.deadlineLabel;
  
  document.getElementById("intermissionTitle").textContent = t.intermissionTitle;
  document.getElementById("intermissionSubtitle").innerHTML = t.intermissionSubtitle;
  document.getElementById("reminderHeading").textContent = t.reminderHeading;
  document.getElementById("startExpLabel").textContent = t.startExp;

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
  currentTrialIndex = PRACTICE_TRIALS.length;
  runTrial(currentTrialIndex);
}

function runTrial(index) {
  if (index >= allTrials.length) {
    showResults();
    return;
  }

  currentTrial = allTrials[index];
  const t = I18N[currentLang];

  const metaText = currentTrial.is_practice 
    ? t.practiceMeta(currentTrial.practice_index, PRACTICE_TRIALS.length)
    : t.trialMeta(currentTrial.exp_index, EXPERIMENTAL_TRIALS.length);
  
  elListeningTrialMeta.textContent = metaText;
  elDecisionTrialMeta.textContent = metaText;

  setScreen("listening");
  elAudioProgressBar.style.width = "0%";

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
    setTimeout(() => {
      startDecisionWindow();
    }, 50);
  };

  audioPlayer.onerror = (e) => {
    console.error("Audio error:", e);
    setTimeout(() => {
      startDecisionWindow();
    }, 1500);
  };

  audioPlayer.play().catch(err => {
    console.warn("Audio play prevented:", err);
  });
}

function startDecisionWindow() {
  setScreen("decision");
  isAcceptingResponse = true;
  trialStartTime = performance.now();

  elDeadlineTimerBar.style.transition = "none";
  elDeadlineTimerBar.style.transform = "scaleX(1)";
  void elDeadlineTimerBar.offsetWidth;
  elDeadlineTimerBar.style.transition = "transform 750ms linear";
  elDeadlineTimerBar.style.transform = "scaleX(0)";

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
  const correctKey = currentTrial.correct_key;
  const isCorrect = (!timedOut) && (chosenKeyMeaning === correctKey);

  const participantIdVal = elParticipantId.value.trim() || "P01";

  const trialRecord = {
    trial_index: currentTrialIndex + 1,
    is_practice: currentTrial.is_practice ? 1 : 0,
    participant: participantIdVal,
    group: fixedGroup,
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

  if (currentTrial.is_practice) {
    showPracticeFeedback(isCorrect, timedOut, rt);
  } else {
    setTimeout(() => {
      advanceTrial();
    }, 400);
  }
}

function showPracticeFeedback(isCorrect, timedOut, rt) {
  setScreen("feedback");
  const t = I18N[currentLang];

  if (timedOut) {
    elFeedbackTitle.className = "feedback-text-title timeout";
    elFeedbackTitle.textContent = t.practiceFeedbackTimeout;
    elFeedbackDetails.textContent = currentLang === "eu" ? "Erantzun 750 ms baino lehen!" : "Respond before the 750 ms deadline!";
  } else if (isCorrect) {
    elFeedbackTitle.className = "feedback-text-title correct";
    elFeedbackTitle.textContent = t.practiceFeedbackCorrect;
    elFeedbackDetails.textContent = `RT: ${rt} ms`;
  } else {
    elFeedbackTitle.className = "feedback-text-title incorrect";
    elFeedbackTitle.textContent = t.practiceFeedbackIncorrect;
    elFeedbackDetails.textContent = `RT: ${rt} ms`;
  }

  setTimeout(() => {
    advanceTrial();
  }, 1200);
}

function advanceTrial() {
  currentTrialIndex++;
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

  elResultsTableBody.innerHTML = "";
  recordedData.forEach((row) => {
    const tr = document.createElement("tr");
    const audioName = row.audio_file.split("/").pop();
    const isPracticeTag = row.is_practice ? "P" : "E";
    
    let respText = row.response_key === "b" ? "Bai" : row.response_key === "e" ? "Ez" : "TIMEOUT";
    let corrClass = row.is_correct === 1 ? "corr-yes" : "corr-no";
    let corrSymbol = row.is_correct === 1 ? "✓" : "✗";

    tr.innerHTML = `
      <td>${isPracticeTag}${row.trial_index}</td>
      <td title="${audioName}">${audioName.substring(0, 18)}…</td>
      <td>${row.puntua1} / ${row.puntua2}</td>
      <td>${row.rhyme_type} (d${row.depth})</td>
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
  const pid = (elParticipantId.value.trim() || "P01").replace(/[^a-zA-Z0-9_-]/g, "_");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `bertso_rhyme_${pid}_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// --- 8. Event Listeners & Keyboard Handling ---
window.addEventListener("keydown", (e) => {
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

  if (isAcceptingResponse) {
    if (e.code === "ShiftLeft") {
      e.preventDefault();
      handleResponse("b", false); // Left Shift = Bai (Rhyme)
    } else if (e.code === "ShiftRight") {
      e.preventDefault();
      handleResponse("e", false); // Right Shift = Ez (No Rhyme)
    }
  }
});

elBtnLeft.addEventListener("click", () => {
  if (isAcceptingResponse) {
    handleResponse("b", false);
  }
});

elBtnRight.addEventListener("click", () => {
  if (isAcceptingResponse) {
    handleResponse("e", false);
  }
});

elBtnStartPractice.addEventListener("click", startPractice);
elBtnStartExperiment.addEventListener("click", startExperiment);
elBtnRestart.addEventListener("click", () => {
  audioPlayer.pause();
  setScreen("intro");
});
elBtnDownloadCsv.addEventListener("click", downloadCsv);

elLangToggle.addEventListener("click", () => {
  const nextLang = currentLang === "eu" ? "en" : "eu";
  updateLanguage(nextLang);
});

// Initialize
updateLanguage("eu");
updateKeyLabels();
