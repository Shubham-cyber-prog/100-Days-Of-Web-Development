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

  // Word + Reading time
const words = input.value.trim().split(/\s+/).filter(Boolean).length;
const time = Math.ceil(words / 200);
document.getElementById("readTime").textContent =
  `${time} min read`;


  const status = document.getElementById("saveStatus");
status.textContent = "Saving...";
setTimeout(() => {
  status.textContent = "Saved";
}, 400);


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



document.getElementById("fullScreen").onclick = () => {
  document.body.classList.toggle("fullscreen");
};


document.body.addEventListener("dragover", e => e.preventDefault());

document.body.addEventListener("drop", e => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file && file.name.endsWith(".md")) {
    const reader = new FileReader();
    reader.onload = () => {
      input.value = reader.result;
      render();
    };
    reader.readAsText(file);
  }
});


document.getElementById("insertImage").onclick = () => {
  const url = prompt("Enter image URL");
  if (url) {
    input.value += `\n![](${url})\n`;
    render();
  }
};


document.getElementById("splitToggle").onclick = () => {
  document.querySelector(".preview")
    .classList.toggle("hide");
};