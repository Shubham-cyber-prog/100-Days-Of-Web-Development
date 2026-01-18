function calculateScore(markdown) {
  const checks = [
    { label: "Title", test: /^#\s+/m },
    { label: "Description", test: /\n\n.+/ },
    { label: "Badges", test: /!\[.*\]\(https:\/\/img\.shields\.io/ },
    { label: "Features", test: /##\s+✨\s+Features/ },
    { label: "Tech Stack", test: /##\s+🛠\s+Tech Stack/ },
    { label: "Installation", test: /##\s+⚙️\s+Installation/ },
    { label: "Usage", test: /##\s+📖\s+Usage/ },
    { label: "License", test: /##\s+📄\s+License/ },
    { label: "Author", test: /##\s+👤\s+Author/ }
  ];

  let score = 0;
  const list = document.getElementById("scoreChecklist");
  list.innerHTML = "";

  checks.forEach(c => {
    const ok = c.test.test(markdown);
    if (ok) score++;

    const li = document.createElement("li");
    li.textContent = c.label;
    if (ok) li.classList.add("good");
    list.appendChild(li);
  });

  const percent = Math.round((score / checks.length) * 100);
  document.getElementById("scoreText").textContent = `${percent}%`;
  document.getElementById("scoreFill").style.width = `${percent}%`;

}
