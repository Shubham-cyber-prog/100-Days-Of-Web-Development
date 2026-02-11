function generateREADME() {
  const generateBtn = document.querySelector(".btn-group .primary");
  generateBtn.textContent = "Generating...";
  generateBtn.disabled = true;

  const badges = generateBadges();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  const features = document.getElementById("features").value
    .split("\n")
    .filter(Boolean)
    .map(f => `- ${f}`)
    .join("\n");

  const tech = document.getElementById("tech").value
    .split(",")
    .filter(Boolean)
    .map(t => `- ${t.trim()}`)
    .join("\n");

  const install = document.getElementById("install").value;
  const usage = document.getElementById("usage").value;
  const license = document.getElementById("license").value;
  const author = document.getElementById("author").value;

  const markdown = `
${badges}# 🚀 ${title}

${description}

## ✨ Features
${features}

## 🛠 Tech Stack
${tech}

## ⚙️ Installation
\`\`\`bash
${install}
\`\`\`

## 📖 Usage
${usage}

## 📄 License
${license}

## 👤 Author
${author}
`;

  localStorage.setItem("readme", markdown);
  renderPreview(markdown);
  calculateScore(markdown);

  generateBtn.textContent = "Generate";
  generateBtn.disabled = false;

}

// ==============================
// README TOOLKIT – AUTOSAVE
// ==============================

(function autoSaveForm() {
  const fields = document.querySelectorAll(
    'input[id], textarea[id]'
  );

  // Restore saved values
  fields.forEach(field => {
    const saved = localStorage.getItem(`readme_${field.id}`);
    if (saved !== null) {
      field.value = saved;
    }

    // Save on change
    field.addEventListener('input', () => {
      localStorage.setItem(`readme_${field.id}`, field.value);
    });
  });
})();
