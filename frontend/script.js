// references for ui elements
const htmlInput = document.getElementById("htmlInput");
const analyzeBtn = document.getElementById("analyzeBtn");
const statusEl = document.getElementById("status");
const resultsEl = document.getElementById("results");

// TEMPORARY placeholder
// checks if user pasted html, display status msg, display placeholder txt
function analyzeHTML() {
  const html = htmlInput.value.trim();
  // check if any text entered
  if (!html) {
    statusEl.textContent = "Please paste HTML first.";
    return;
  }

  // temp feedback
  statusEl.textContent = "Analyzing…";
  resultsEl.textContent = "Dummy analysis results prints here.";
}

// click handler for analyze button
analyzeBtn.addEventListener("click", analyzeHTML);
