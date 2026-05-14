// references for ui elements
const themeToggle = document.getElementById("themeToggle");
const htmlInput = document.getElementById("htmlInput");
const analyzeBtn = document.getElementById("analyzeBtn");
const statusEl = document.getElementById("status");
const resultsEl = document.getElementById("results");

// auto resize if text area gets large HTML pasted
htmlInput.addEventListener("input", () => {
  htmlInput.style.height = "auto";
  htmlInput.style.height = htmlInput.scrollHeight + "px";
});

// updates status msg text (info, error, or success)
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
  if (isLoading) {
    analyzeBtn.textContent = "Analyzing";
    statusEl.classList.add("loading-dots");
  } else {
    analyzeBtn.textContent = "Analyze";
    statusEl.classList.remove("loading-dots");
  }
}

// create request for Gemini API
function prepareGeminiRequest(html) {
  return {
    model: "gemini-1.5-flash",
    contents: [
      {
        role: "user",
        parts: [
          {
            text:
              "Analyze the following HTML for accessibility issues. " +
              "Return JSON with fields: issue_type, severity, description, wcag_reference, suggested_fix, & corrected_snippet. Here is the HTML:\n\n" + html
}]}]};}

// preps request structure for Gemini
// checks if user pasted html, display status msg, & display
async function analyzeHTML() {
  const html = htmlInput.value.trim();
  // check if any text entered
  if (!html) {
    setStatus("Please paste HTML first.", "error");
    return;
  }

  // clear previous results and set status
  resultsEl.innerHTML = "";
  setStatus("Analyzing your HTML…", "info");
  setLoading(true);

  // attempt to build request: responds with status based on that
  try {
    const request = prepareGeminiRequest(html);

    // send request to Gemini API
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + GEMINI_API_KEY, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(request)
      });
    // throw if error
    if (!response.ok) throw new Error(`Gemini API error: ${response.status}`);

    const data = await response.json();

    // extract text
    const output = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from model.";

    // display formatted output
    document.getElementById("resultsHeader").hidden = false;
    resultsEl.innerHTML = `<pre class="code-block">${output}</pre>`;

    // display status
    setStatus("Analysis complete.", "success");
  } catch (err) {
    console.error(err);
    setStatus("Error connecting to Gemini API.", "error");
  } finally {
    setLoading(false);
  }
}

// click handler for analyze button
analyzeBtn.addEventListener("click", analyzeHTML);

// click handler for clear button
document.getElementById("clearBtn").addEventListener("click", () => {
  htmlInput.value = "";
  resultsEl.innerHTML = "";
  setStatus("Cleared.", "info");
});

// toggle dark mode button
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  // update button text
  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "Light Mode" : "Dark Mode";
});
