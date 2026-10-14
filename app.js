/**
 * Bertso Errima-erabaki Lana - Web Demoa
 * 750 ms-ko errima-erabaki azkarraren paradigma (Knoop et al., 2021 egokitzapena)
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
const DECISION_DEADLINE_MS = 750; // 750 ms-ko epea

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
  Object.values(screens).forEach(screen => {
    if (screen) screen.classList.remove("active");
  });
  if (screens[screenName]) {
    screens[screenName].classList.add("active");
  } else {
    console.error("Unknown screen:", screenName);
  }
  const elTopBar = document.querySelector(".top-bar");
  if (elTopBar) {
    if (["listening", "decision", "feedback"].includes(screenName)) {
      elTopBar.classList.add("hidden");
    } else {
      elTopBar.classList.remove("hidden");
    }
  }
}

function getParticipantNumber() {
  const digits = elParticipantId ? elParticipantId.value.replace(/\D/g, "") : "01";
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

  // Immediately transition screen to listening (fixation cross)
  setScreen("listening");

  if (elListeningTrialMeta) elListeningTrialMeta.textContent = "";
  if (elDecisionTrialMeta) elDecisionTrialMeta.textContent = "";
  if (elAudioProgressBar) elAudioProgressBar.style.width = "0%";

  audioPlayer.src = currentTrial.audio_file;
  audioPlayer.currentTime = 0;

  audioPlayer.ontimeupdate = () => {
    if (audioPlayer.duration && elAudioProgressBar) {
      const pct = (audioPlayer.currentTime / audioPlayer.duration) * 100;
      elAudioProgressBar.style.width = `${pct}%`;
    }
  };

  audioPlayer.onended = () => {
    if (elAudioProgressBar) elAudioProgressBar.style.width = "100%";
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
    elFeedbackTitle.textContent = "DENBORAZ KANPO (>750 ms)";
    elFeedbackDetails.textContent = "Erantzun 750 ms baino lehen!";
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

  const pid = getParticipantNumber();
  const headers = recordedData.length > 0
    ? Object.keys(recordedData[0]).join(",")
    : "trial_index,is_practice,participant,group,audio_file,depth,rhyme_type,puntua1,puntua2,bertsolari,neurri,correct_key,response_key,rt,timed_out,is_correct";
  const rows = recordedData.map(r => Object.values(r).map(v => typeof v === "string" && v.includes(",") ? `"${v}"` : v).join(","));
  const csvContent = [headers, ...rows].join("\n");

  // Dynamic Email link with prefilled subject and body (including raw data fallback)
  const elBtnSendEmail = document.getElementById("btnSendEmail");
  if (elBtnSendEmail) {
    const emailSubject = encodeURIComponent(`Bertso Errima Ikerketa - Emaitzak [Parte-hartzailea ${pid}]`);
    const emailBody = encodeURIComponent(
      `Kaixo Mikhael,\n\nHemen dituzu nire bertso-errima esperimentuko emaitzak (Parte-hartzailea: ${pid}).\n\n(Deskargatutako CSV fitxategia mezu honetan atxikituta dago)\n\n--- Datuak ---\n${csvContent}\n`
    );
    elBtnSendEmail.href = `mailto:mikhael2@illinois.edu?subject=${emailSubject}&body=${emailBody}`;
  }

  // Dynamic WhatsApp link with prefilled message
  const elBtnSendWhatsapp = document.getElementById("btnSendWhatsapp");
  if (elBtnSendWhatsapp) {
    const whatsappText = encodeURIComponent(
      `Kaixo Mikhael! Hemen dituzu nire bertso-errima esperimentuko emaitzak (Parte-hartzailea: ${pid}). CSV fitxategia bidaltzen dizut.`
    );
    elBtnSendWhatsapp.href = `https://wa.me/?text=${whatsappText}`;
  }

  // Safe updates to hidden fallback elements
  if (elStatTrialsCount) elStatTrialsCount.textContent = `${recordedData.length}`;
  if (elStatMeanRt) elStatMeanRt.textContent = `-- ms`;
  if (elStatTimeouts) elStatTimeouts.textContent = `0`;
  if (elResultsTableBody) elResultsTableBody.innerHTML = "";
}

function abortToResults() {
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
  clearTimeout(deadlineTimeoutId);
  isAcceptingResponse = false;
  isPostAudioBuffer = false;
  pendingBufferedResponse = null;
  if (allTrials.length === 0) {
    buildTrialList();
  }
  showResults();
}

function downloadCsv() {
  const headers = recordedData.length > 0
    ? Object.keys(recordedData[0]).join(",")
    : "trial_index,is_practice,participant,group,audio_file,depth,rhyme_type,puntua1,puntua2,bertsolari,neurri,correct_key,response_key,rt,timed_out,is_correct";
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
  // ESCAPE KEY: Immediately jump to results screen to export CSV
  if (e.code === "Escape" || e.key === "Escape") {
    e.preventDefault();
    abortToResults();
    return;
  }

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

if (elBtnLeft) {
  elBtnLeft.addEventListener("click", () => {
    if (isAcceptingResponse) {
      handleResponse("b", false);
    }
  });
}

if (elBtnRight) {
  elBtnRight.addEventListener("click", () => {
    if (isAcceptingResponse) {
      handleResponse("e", false);
    }
  });
}

if (elBtnToIntroInstructions) {
  elBtnToIntroInstructions.addEventListener("click", goToPracticeInstructions);
}
if (elBtnStartPractice) {
  elBtnStartPractice.addEventListener("click", startPractice);
}
if (elBtnStartExperiment) {
  elBtnStartExperiment.addEventListener("click", startExperiment);
}
if (elBtnRestart) {
  elBtnRestart.addEventListener("click", () => {
    audioPlayer.pause();
    setScreen("intro");
  });
}
if (elBtnDownloadCsv) {
  elBtnDownloadCsv.addEventListener("click", downloadCsv);
}

if (elParticipantId) {
  elParticipantId.addEventListener("input", () => {
    elParticipantId.value = elParticipantId.value.replace(/\D/g, "").slice(0, 2);
  });
}
