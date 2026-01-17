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
