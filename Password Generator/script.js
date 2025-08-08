const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");
const passwordDisplay = document.getElementById("passwordDisplay");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const backBtn = document.getElementById("backBtn");
const historyList = document.getElementById("historyList");

let generatedPassword = "";

generateBtn.addEventListener("click", () => {
  const length = parseInt(document.getElementById("length").value);
  const includeUpper = document.getElementById("uppercase").checked;
  const includeLower = document.getElementById("lowercase").checked;
  const includeNumbers = document.getElementById("numbers").checked;
  const includeSymbols = document.getElementById("symbols").checked;

  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{};:,<.>/?";

  let chars = "";
  if (includeUpper) chars += upper;
  if (includeLower) chars += lower;
  if (includeNumbers) chars += numbers;
  if (includeSymbols) chars += symbols;

  if (!chars) {
    alert("⚠️ Please select at least one character type!");
    return;
  }

  generatedPassword = "";
  for (let i = 0; i < length; i++) {
    generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  passwordDisplay.textContent = generatedPassword;
  savePassword(generatedPassword);
  showHistory();
  switchScreen(screen2);
});

copyBtn.addEventListener("click", () => {
  if (generatedPassword) {
    navigator.clipboard.writeText(generatedPassword).then(() => {
      alert("✅ Password copied to clipboard!");
    });
  }
});

backBtn.addEventListener("click", () => {
  switchScreen(screen1);
});

function switchScreen(screenToShow) {
  screen1.classList.remove("active");
  screen2.classList.remove("active");
  screenToShow.classList.add("active");
}

function savePassword(password) {
  let history = JSON.parse(localStorage.getItem("passwordHistory")) || [];
  history.unshift(password);
  if (history.length > 20) history = history.slice(0, 20);
  localStorage.setItem("passwordHistory", JSON.stringify(history));
}

function showHistory() {
  const history = JSON.parse(localStorage.getItem("passwordHistory")) || [];
  historyList.innerHTML = "";
  history.forEach(pwd => {
    const li = document.createElement("li");
    li.textContent = pwd;
    historyList.appendChild(li);
  });
}

// Load history when app starts
document.addEventListener("DOMContentLoaded", showHistory);
