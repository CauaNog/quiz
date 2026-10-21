
"use strict";
const $ = (id) => document.getElementById(id);
let session = [];
let answers = [];
let locked = [];
let index = 0;
let mode = "treino";
let elapsedSeconds = 0;
let deadline = 0;
let timerId = null;
let finished = false;

function shuffle(items) {
  const a = items.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function formatTime(seconds) {
  const s = Math.max(0, Math.floor(seconds));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}
function chosen() { return answers[index]; }
function isCorrect(i) { return answers[i] === session[i].answer; }
function score() { return answers.reduce((sum, a, i) => sum + (a !== null && a === session[i].answer ? 1 : 0), 0); }
function elapsed() {
  return mode === "simulado"
    ? Math.max(0, Number($("duration").value) * 60 - Math.ceil((deadline - Date.now()) / 1000))
    : elapsedSeconds;
}

function startQuiz() {
  clearInterval(timerId);
  const difficulty = $("difficulty").value;
  mode = $("mode").value;
  const pool = questionBank.filter(q => difficulty === "todos" || q.difficulty === difficulty);
  const amount = $("amount").value;
  session = shuffle(pool);
  if (amount !== "todas") session = session.slice(0, Number(amount));
  answers = Array(session.length).fill(null);
  locked = Array(session.length).fill(false);
  index = 0;
  elapsedSeconds = 0;
  finished = false;
  deadline = Date.now() + Number($("duration").value) * 60000;
  $("setup").classList.add("hidden");
  $("results").classList.add("hidden");
  $("quiz").classList.remove("hidden");
  renderQuestion();
  updateTimer();
  timerId = setInterval(() => {
    if (mode === "treino") elapsedSeconds++;
    updateTimer();
  }, 1000);
}

function updateTimer() {
  $("timer").textContent = `⏱ ${formatTime(mode === "simulado" ? (deadline - Date.now()) / 1000 : elapsedSeconds)}`;
  if (mode === "simulado" && deadline <= Date.now() && !finished) finishQuiz(true);
}

function renderQuestion() {
  if (!session.length) return;
  const q = session[index];
  $("counter").textContent = `Questão ${index + 1} de ${session.length} · ${({facil:"Fácil", medio:"Médio", dificil:"Difícil"})[q.difficulty]}`;
  $("scoreLive").textContent = mode === "simulado" ? `Respondidas: ${answers.filter(a => a !== null).length}` : `Acertos: ${score()}`;
  $("progressBar").style.width = `${(index / session.length) * 100}%`;
  $("question").textContent = q.question;
  $("hint").textContent = q.hint;
  $("feedback").className = "feedback";
  $("feedback").textContent = "";
  $("options").replaceChildren();

  q.options.forEach((option, i) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option" + (answers[index] === i ? " selected" : "");
    button.disabled = mode === "treino" && locked[index];
    const letter = document.createElement("span");
    letter.className = "letter";
    letter.textContent = String.fromCharCode(65 + i);
    const text = document.createElement("span");
    text.textContent = option;
    button.append(letter, text);
    button.addEventListener("click", () => {
      if (finished || locked[index]) return;
      answers[index] = i;
      renderQuestion();
    });
    $("options").append(button);
  });

  $("checkBtn").classList.toggle("hidden", mode === "simulado" || locked[index]);
  $("checkBtn").disabled = answers[index] === null;
  $("nextBtn").classList.toggle("hidden", mode === "treino" && !locked[index]);
  $("nextBtn").textContent = index === session.length - 1 ? "Finalizar →" : "Próxima questão →";
  $("quitBtn").textContent = mode === "simulado" ? "Entregar simulado" : "Encerrar";
  if (mode === "treino" && locked[index]) showFeedback();
}

function showFeedback() {
  const q = session[index];
  const correct = isCorrect(index);
  const box = $("feedback");
  box.className = `feedback show ${correct ? "good" : "bad"}`;
  const title = document.createElement("strong");
  title.textContent = correct ? "Resposta correta!" : "Resposta incorreta.";
  box.replaceChildren(title, document.createTextNode(` ${q.explanation}`));
  [...$("options").children].forEach((button, i) => {
    button.disabled = true;
    if (i === q.answer) button.classList.add("correct");
    else if (i === answers[index]) button.classList.add("wrong");
  });
  $("scoreLive").textContent = `Acertos: ${score()}`;
}

function finishQuiz(timeout = false) {
  if (finished || !session.length) return;
  finished = true;
  clearInterval(timerId);
  if (mode === "simulado") locked = answers.map(a => a !== null);
  const correct = score();
  const total = session.length;
  const percent = Math.round((correct / total) * 100);
  const duration = formatTime(elapsed());

  $("quiz").classList.add("hidden");
  $("results").classList.remove("hidden");
  $("scoreFinal").textContent = `${correct}/${total} · ${percent}%`;
  $("resultTitle").textContent = timeout ? "Tempo esgotado!" : percent >= 90 ? "Excelente desempenho!" : percent >= 70 ? "Muito bom!" : percent >= 50 ? "Bom começo!" : "Continue praticando!";
  $("resultText").textContent = `${mode === "simulado" ? "Simulado de prova" : "Treino"} · Tempo: ${duration} · Respondidas: ${answers.filter(a => a !== null).length}/${total}.`;
  saveRecord({
    date: new Date().toLocaleString("pt-BR"), mode,
    level: $("difficulty").value, score: correct, total, percent, time: duration
  });
  $("review").replaceChildren();
  const heading = document.createElement("h3");
  heading.textContent = "Revisão das respostas";
  $("review").append(heading);
  session.forEach((q, i) => {
    const item = document.createElement("div");
    item.className = "review-item";
    const title = document.createElement("strong");
    title.textContent = `${i + 1}. ${q.question}`;
    const status = document.createElement("small");
    status.textContent = `${answers[i] === null ? "Não respondida" : isCorrect(i) ? "Acertou" : "Errou"} · Sua resposta: ${answers[i] === null ? "—" : q.options[answers[i]]}`;
    const explanation = document.createElement("p");
    explanation.textContent = `Resposta correta: ${q.options[q.answer]}. ${q.explanation}`;
    item.append(title, status, explanation);
    $("review").append(item);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function getRecords() {
  try { return JSON.parse(localStorage.getItem("anatomiaQuizRecords") || "[]"); }
  catch { return []; }
}
function saveRecord(record) {
  const records = getRecords();
  records.push(record);
  records.sort((a, b) => b.percent - a.percent || a.time.localeCompare(b.time));
  localStorage.setItem("anatomiaQuizRecords", JSON.stringify(records.slice(0, 20)));
}
function showRecords() {
  const box = $("records");
  box.classList.remove("hidden");
  box.replaceChildren();
  const heading = document.createElement("strong");
  heading.textContent = "Melhores resultados salvos neste navegador";
  box.append(heading);
  const records = getRecords();
  if (!records.length) {
    box.append(document.createTextNode(" — Ainda não há recordes."));
    return;
  }
  records.forEach((record, i) => {
    const row = document.createElement("div");
    row.className = "record-row";
    const left = document.createElement("span");
    left.textContent = `${i + 1}. ${record.percent}% (${record.score}/${record.total}) · ${record.mode === "simulado" ? "Simulado" : "Treino"}`;
    const right = document.createElement("small");
    right.textContent = `${record.time} · ${record.date}`;
    row.append(left, right);
    box.append(row);
  });
}
$("startBtn").addEventListener("click", startQuiz);
$("checkBtn").addEventListener("click", () => {
  if (answers[index] !== null) { locked[index] = true; renderQuestion(); }
});
$("nextBtn").addEventListener("click", () => {
  if (index < session.length - 1) { index++; renderQuestion(); }
  else finishQuiz(false);
});
$("quitBtn").addEventListener("click", () => finishQuiz(false));
$("recordsBtn").addEventListener("click", showRecords);
$("resultRecordsBtn").addEventListener("click", () => {
  $("results").classList.add("hidden");
  $("setup").classList.remove("hidden");
  showRecords();
});
$("clearRecordsBtn").addEventListener("click", () => {
  if (confirm("Deseja apagar todos os recordes salvos neste navegador?")) {
    localStorage.removeItem("anatomiaQuizRecords");
    showRecords();
  }
});
$("restartBtn").addEventListener("click", () => {
  $("results").classList.add("hidden");
  $("setup").classList.remove("hidden");
  $("records").classList.add("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});
$("mode").addEventListener("change", () => {
  $("duration").disabled = $("mode").value !== "simulado";
});
$("duration").disabled = true;
$("bankCount").textContent = `Banco: ${questionBank.length} questões disponíveis.`;
