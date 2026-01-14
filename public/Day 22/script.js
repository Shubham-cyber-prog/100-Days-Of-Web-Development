const input = document.getElementById("markdownInput");
const preview = document.getElementById("previewContent");
const charCount = document.getElementById("charCount");
const themeToggle = document.getElementById("themeToggle");

marked.setOptions({
  gfm: true,
  breaks: true
});

function render() {
  preview.innerHTML = marked.parse(input.value);
  charCount.textContent = `${input.value.length} characters`;
  localStorage.setItem("markdown", input.value);
}

input.addEventListener("input", render);

/* Toolbar actions */
document.getElementById("clearBtn").onclick = () => {
  input.value = "";
  render();
};

document.getElementById("copyBtn").onclick = async () => {
  await navigator.clipboard.writeText(input.value);
  alert("Copied to clipboard!");
};

document.getElementById("downloadMd").onclick = () => {
  downloadFile("document.md", input.value);
};

document.getElementById("downloadHtml").onclick = () => {
  const html = `<html><body>${preview.innerHTML}</body></html>`;
  downloadFile("document.html", html);
};

function downloadFile(name, content) {
  const blob = new Blob([content], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
}

/* Initial content */
input.value = localStorage.getItem("markdown") || `# Markdown Live Editor 🚀

Write **Markdown** on the left  
See **Live Preview** on the right  

\`\`\`js
console.log("Hello Markdown");
\`\`\`

- Clean UI
- Fast preview
- Download support
`;

render();

/* 🌗 Dark Mode */
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️ Light";
}

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  themeToggle.textContent = isDark ? "☀️ Light" : "🌙 Dark";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
