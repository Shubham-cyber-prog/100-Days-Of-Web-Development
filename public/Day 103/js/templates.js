function loadTemplate() {
  const template = `
# 📦 Project Name

Short description of your project.

## ✨ Features
- Feature 1
- Feature 2

## 🛠 Tech Stack
- HTML
- CSS
- JavaScript

## ⚙️ Installation
\`\`\`bash
git clone https://github.com/username/repo.git
cd repo
open index.html
\`\`\`

## 📄 License
MIT
`;

  localStorage.setItem("readme", template);
  renderPreview(template);
}

function loadSampleREADME() {
  const sample = `# Awesome Project 🚀

A clean and simple README generated using **README Toolkit**.

## ✨ Features
- Easy setup
- Live preview
- GitHub badge support
- Export as Markdown

## 🛠 Tech Stack
- HTML
- CSS
- JavaScript

## 📦 Installation
\`\`\`bash
npm install
npm start
\`\`\`

## 🚀 Usage
Open the app and start generating README files instantly.

## 📄 License
MIT

## 👤 Author
@your-github-username
`;

  document.getElementById("preview").classList.remove("preview-empty");
  document.getElementById("preview").innerHTML = marked.parse(sample);
}
