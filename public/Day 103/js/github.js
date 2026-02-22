const comingSoon = [
  "templates",
  "export"
];

async function importFromGitHub() {
  const user = document.getElementById("githubUser").value.trim();
  const repo = document.getElementById("githubRepo").value.trim();

  if (!user || !repo) {
    alert("Please enter GitHub username and repository name");
    return;
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${user}/${repo}`);
    if (!res.ok) throw new Error("Repository not found");

    const data = await res.json();

    document.getElementById("title").value = data.name || "";
    document.getElementById("description").value =
      data.description || "No description provided.";

    document.getElementById("license").value =
      data.license?.spdx_id || "MIT";

    document.getElementById("author").value = data.owner.login;

    // Auto-generate README preview
    generateREADME();
  } catch (err) {
    alert("Failed to fetch repository details");
    console.error(err);
  }
}


document.querySelectorAll(".nav-item").forEach(btn => {
  btn.addEventListener("click", () => {
    // active state
    document.querySelectorAll(".nav-item")
      .forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const label = btn.textContent.trim().toLowerCase();

    const map = {
      "generator": "#title",
      "github import": "#github-section",
      "badges": "#badges-section"
    };

    // Scroll if mapped
    if (map[label]) {
      document
        .querySelector(map[label])
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    // Show alert ONLY for known unimplemented features
    if (comingSoon.includes(label)) {
      alert("This section is coming soon 🚧");
    }

    // Otherwise: do nothing (important!)
  });
});

