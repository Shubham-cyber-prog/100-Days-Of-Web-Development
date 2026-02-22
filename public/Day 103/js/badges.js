function generateBadges() {
  const user = document.getElementById("githubUser").value.trim();
  const repo = document.getElementById("githubRepo").value.trim();
  const selected = document.querySelectorAll(".checkbox-group input:checked");

  if (!user || !repo || selected.length === 0) return "";

  let badges = "";

  selected.forEach(badge => {
    switch (badge.value) {
      case "license":
        badges += `![License](https://img.shields.io/github/license/${user}/${repo}) `;
        break;
      case "stars":
        badges += `![Stars](https://img.shields.io/github/stars/${user}/${repo}) `;
        break;
      case "forks":
        badges += `![Forks](https://img.shields.io/github/forks/${user}/${repo}) `;
        break;
      case "html":
        badges += `![HTML](https://img.shields.io/badge/HTML-E34F26?logo=html5&logoColor=white) `;
        break;
      case "css":
        badges += `![CSS](https://img.shields.io/badge/CSS-1572B6?logo=css3&logoColor=white) `;
        break;
      case "js":
        badges += `![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black) `;
        break;
    }
  });

  return badges + "\n\n";
}
