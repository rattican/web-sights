fetch("/analyze", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({ html: userInput })
})
.then(res => res.json())
.then(data => showResults(data))