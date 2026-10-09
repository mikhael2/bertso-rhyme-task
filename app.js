/**
 * Bertso Errima-erabaki Lana - Web Demoa
 * 1000 ms-ko errima-erabaki azkarraren paradigma (Knoop et al., 2021 egokitzapena)
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
const fixedGroup = "A"; // Ezker Shift = Bai / Eskuin Shift = Ez
const DECISION_DEADLINE_MS = 1000; // 1 segundo (1000 ms)

// --- 2. Experiment State Variables ---
let currentTrialIndex = -1;
let currentTrial = null;
let trialStartTime = null;
let deadlineTimeoutId = null;
let isAcceptingResponse = false;
let isPostAudioBuffer = false;
let pendingBufferedResponse = null;
let recordedData = [];
let audioPlayer = new Audio();

// --- 3. DOM Elements ---
const screens = {
  intro: document.getElementById("screenIntro"),
  practiceInstructions: document.getElementById("screenPracticeInstructions"),
  listening: document.getElementById("screenListening"),
  decision: document.getElementById("screenDecision"),
  feedback: document.getElementById("screenFeedback"),
  intermission: document.getElementById("screenIntermission"),
  results: document.getElementById("screenResults")
};

const elParticipantId = document.getElementById("participantId");
const elBtnToIntroInstructions = document.getElementById("btnToIntroInstructions");
const elBtnStartPractice = document.getElementById("btnStartPractice");
const elBtnStartExperiment = document.getElementById("btnStartExperiment");
const elBtnRestart = document.getElementById("btnRestart");
const elBtnDownloadCsv = document.getElementById("btnDownloadCsv");

// Trial visual elements
const elListeningTrialMeta = document.getElementById("listeningTrialMeta");
const elDecisionTrialMeta = document.getElementById("decisionTrialMeta");
const elAudioProgressBar = document.getElementById("audioProgressBar");
const elDeadlineTimerBar = document.getElementById("deadlineTimerBar");
const elBtnLeft = document.getElementById("btnLeft");
const elBtnRight = document.getElementById("btnRight");

// Feedback elements
const elFeedbackTitle = document.getElementById("feedbackTitle");
const elFeedbackDetails = document.getElementById("feedbackDetails");

// Results elements
const elStatTrialsCount = document.getElementById("statTrialsCount");
const elStatMeanRt = document.getElementById("statMeanRt");
const elStatTimeouts = document.getElementById("statTimeouts");
const elResultsTableBody = document.getElementById("resultsTableBody");

// --- 4. Helper Functions ---
function setScreen(screenName) {
  Object.values(screens).forEach(screen => screen.classList.remove("active"));
  if (screens[screenName]) {
    screens[screenName].classList.add("active");
  }
}

function getParticipantNumber() {
  const digits = elParticipantId.value.replace(/\D/g, "");
  if (!digits) return "01";
  return digits.padStart(2, "0").slice(-2);
}

function isLeftShiftKey(e) {
  return e.code === "ShiftLeft" || (e.key === "Shift" && e.location === 1);
}

function isRightShiftKey(e) {
  return e.code === "ShiftRight" || (e.key === "Shift" && e.location === 2);
}

// --- 5. Trial Execution Flow ---
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
  isAcceptingResponse = false;
  isPostAudioBuffer = false;
  pendingBufferedResponse = null;

  const metaText = currentTrial.is_practice 
    ? `Praktika ${currentTrial.practice_index} / ${PRACTICE_TRIALS.length}`
    : `Entsegua ${currentTrial.exp_index} / ${EXPERIMENTAL_TRIALS.length}`;
  
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
    isPostAudioBuffer = true;
    setTimeout(() => {
      isPostAudioBuffer = false;
      startDecisionWindow();
    }, 50);
  };

  audioPlayer.onerror = (e) => {
    console.error("Audio playback error:", e);
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

  // If a response was pressed during the 50ms buffer right at audio offset, handle immediately
  if (pendingBufferedResponse) {
    const bufferedKey = pendingBufferedResponse;
    pendingBufferedResponse = null;
    handleResponse(bufferedKey, false, 20);
    return;
  }

  elDeadlineTimerBar.style.transition = "none";
  elDeadlineTimerBar.style.transform = "scaleX(1)";
  void elDeadlineTimerBar.offsetWidth;
  elDeadlineTimerBar.style.transition = `transform ${DECISION_DEADLINE_MS}ms linear`;
  elDeadlineTimerBar.style.transform = "scaleX(0)";

  clearTimeout(deadlineTimeoutId);
  deadlineTimeoutId = setTimeout(() => {
    if (isAcceptingResponse) {
      handleResponse(null, true);
    }
  }, DECISION_DEADLINE_MS);
}

function handleResponse(chosenKeyMeaning, timedOut = false, forcedRt = null) {
  if (!isAcceptingResponse) return;
  isAcceptingResponse = false;
  clearTimeout(deadlineTimeoutId);

  const rt = timedOut 
    ? DECISION_DEADLINE_MS 
    : (forcedRt !== null ? forcedRt : Math.round(performance.now() - trialStartTime));

  const correctKey = currentTrial.correct_key;
  const isCorrect = (!timedOut) && (chosenKeyMeaning === correctKey);

  const participantIdVal = getParticipantNumber();

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

  // In Practice: Give feedback on the 2 anchor trials
  if (currentTrial.is_practice) {
    showPracticeFeedback(isCorrect, timedOut, rt);
  } else {
    // In Experimental trials: 400ms blank ISI, no trial feedback
    setTimeout(() => {
      advanceTrial();
    }, 400);
  }
}

function showPracticeFeedback(isCorrect, timedOut, rt) {
  setScreen("feedback");

  if (timedOut) {
    elFeedbackTitle.className = "feedback-text-title timeout";
    elFeedbackTitle.textContent = "DENBORAZ KANPO (>1000 ms)";
    elFeedbackDetails.textContent = "Erantzun 1000 ms baino lehen!";
  } else if (isCorrect) {
    elFeedbackTitle.className = "feedback-text-title correct";
    elFeedbackTitle.textContent = "ZUZENA";
    elFeedbackDetails.textContent = `RT: ${rt} ms`;
  } else {
    elFeedbackTitle.className = "feedback-text-title incorrect";
    elFeedbackTitle.textContent = "OKERRA";
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

// --- 6. Results & CSV Export ---
function showResults() {
  setScreen("results");

  const expData = recordedData.filter(d => d.is_practice === 0);
  const validExpTrials = expData.length > 0 ? expData : recordedData;

  const timeoutCount = validExpTrials.filter(d => d.timed_out === 1).length;
  const validRts = validExpTrials.filter(d => d.timed_out === 0).map(d => d.rt);
  const meanRt = validRts.length > 0 ? Math.round(validRts.reduce((a, b) => a + b, 0) / validRts.length) : 0;

  // Show only neutral metrics: count, mean RT, and timeouts (no accuracy percentage!)
  elStatTrialsCount.textContent = `${validExpTrials.length}`;
  elStatMeanRt.textContent = `${meanRt} ms`;
  elStatTimeouts.textContent = `${timeoutCount}`;

  // Populate results table WITHOUT any correctness column (no checkmarks or crosses)
  elResultsTableBody.innerHTML = "";
  recordedData.forEach((row) => {
    const tr = document.createElement("tr");
    const audioName = row.audio_file.split("/").pop();
    const isPracticeTag = row.is_practice ? "P" : "E";
    const respText = row.response_key === "b" ? "Bai" : row.response_key === "e" ? "Ez" : "TIMEOUT";

    tr.innerHTML = `
      <td>${isPracticeTag}${row.trial_index}</td>
      <td title="${audioName}">${audioName.substring(0, 18)}…</td>
      <td>${row.puntua1} / ${row.puntua2}</td>
      <td>${row.rhyme_type} (d${row.depth})</td>
      <td>${respText}</td>
      <td>${row.rt} ms</td>
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
  const pid = getParticipantNumber();
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `bertso_rhyme_${pid}_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// --- 7. Event Listeners & Keyboard Handling ---
function goToPracticeInstructions() {
  setScreen("practiceInstructions");
}

window.addEventListener("keydown", (e) => {
  if (screens.intro.classList.contains("active") && (e.code === "Space" || e.code === "Enter")) {
    if (document.activeElement === elParticipantId && e.code === "Space") {
      return;
    }
    e.preventDefault();
    goToPracticeInstructions();
    return;
  }

  if (screens.practiceInstructions.classList.contains("active") && (e.code === "Space" || e.code === "Enter")) {
    e.preventDefault();
    startPractice();
    return;
  }

  if (screens.intermission.classList.contains("active") && (e.code === "Space" || e.code === "Enter")) {
    e.preventDefault();
    startExperiment();
    return;
  }

  // Handle anticipatory key buffering during post-audio buffer (50 ms)
  if (isPostAudioBuffer) {
    if (isLeftShiftKey(e)) {
      e.preventDefault();
      pendingBufferedResponse = "b";
      return;
    } else if (isRightShiftKey(e)) {
      e.preventDefault();
      pendingBufferedResponse = "e";
      return;
    }
  }

  // Handle active decision window response
  if (isAcceptingResponse) {
    if (isLeftShiftKey(e)) {
      e.preventDefault();
      handleResponse("b", false); // Ezker Shift = Bai
    } else if (isRightShiftKey(e)) {
      e.preventDefault();
      handleResponse("e", false); // Eskuin Shift = Ez
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

if (elBtnToIntroInstructions) {
  elBtnToIntroInstructions.addEventListener("click", goToPracticeInstructions);
}
elBtnStartPractice.addEventListener("click", startPractice);
elBtnStartExperiment.addEventListener("click", startExperiment);
elBtnRestart.addEventListener("click", () => {
  audioPlayer.pause();
  setScreen("intro");
});
elBtnDownloadCsv.addEventListener("click", downloadCsv);

elParticipantId.addEventListener("input", () => {
  elParticipantId.value = elParticipantId.value.replace(/\D/g, "").slice(0, 2);
});
