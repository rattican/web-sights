// references for ui elements
const htmlInput = document.getElementById("htmlInput");
const analyzeBtn = document.getElementById("analyzeBtn");
const statusEl = document.getElementById("status");
const resultsEl = document.getElementById("results");

// updates status text (info, error, or success)
function setStatus(message, type = "info") {
  statusEl.textContent = message;

  // clear previous
  statusEl.classList.remove("error", "success");
  // set status
  if (type === "error") statusEl.classList.add("error");
  if (type === "success") statusEl.classList.add("success");
}

// handle disabled button/text changes
function setLoading(isLoading) {
  analyzeBtn.disabled = isLoading;
  analyzeBtn.textContent = isLoading ? "Analyzing…" : "Analyze";
}

// TEMPORARY placeholder
// checks if user pasted html, display status msg, display placeholder txt
function analyzeHTML() {
  const html = htmlInput.value.trim();
  // check if any text entered
  if (!html) {
    statusEl.textContent = "Please paste HTML first.";
    return;
  }

  // clear previous results
  resultsEl.textContent = "";
  setStatus("Analyzing your HTML…", "info");
  setLoading(true);

  // short delay to make ui feel responsive
  setTimeout(() => {
    // temp feedback
    statusEl.textContent = "Analyzing…";
    resultsEl.textContent = "Dummy analysis results prints here.";
    setLoading(false);
  }, 500) // .5 second delay
}

// click handler for analyze button
analyzeBtn.addEventListener("click", analyzeHTML);
