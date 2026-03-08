const body = document.body;

const translateBtn = document.getElementById("translateBtn");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");
const themeToggle = document.getElementById("themeToggle");

/* ---------- THEME ---------- */
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  body.classList.add("light");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");
  const isLight = body.classList.contains("light");
  themeToggle.textContent = isLight ? "☀️" : "🌙";
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

/* ---------- TRANSLATE ---------- */
translateBtn.addEventListener("click", async () => {
  const text = document.getElementById("inputText").value;
  const from = document.getElementById("fromLang").value;
  const to = document.getElementById("toLang").value;

  if (!text.trim()) return;

  translateBtn.textContent = "Translating...";
  translateBtn.disabled = true;

  try {
    const res = await fetch("http://localhost:5000/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, from, to }),
    });

    const data = await res.json();
    document.getElementById("outputText").value = data.translated;
  } catch {
    alert("Translation failed");
  }

  translateBtn.textContent = "Translate";
  translateBtn.disabled = false;
});

/* ---------- COPY ---------- */
copyBtn.addEventListener("click", () => {
  const output = document.getElementById("outputText").value;
  if (!output.trim()) return;

  navigator.clipboard.writeText(output);
  copyBtn.textContent = "Copied!";
  setTimeout(() => (copyBtn.textContent = "Copy"), 1200);
});

/* ---------- CLEAR ---------- */
clearBtn.addEventListener("click", () => {
  document.getElementById("inputText").value = "";
  document.getElementById("outputText").value = "";
});
    