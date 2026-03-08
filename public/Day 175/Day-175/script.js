function generateResume() {
  document.getElementById("r-name").textContent =
    document.getElementById("name").value || "Your Name";

  document.getElementById("r-role").textContent =
    document.getElementById("role").value || "Your Role";

  document.getElementById("r-skills").textContent =
    document.getElementById("skills").value;

  document.getElementById("r-exp").textContent =
    document.getElementById("experience").value;

  document.getElementById("r-proj").textContent =
    document.getElementById("projects").value;
}

// Simple ATS-style analyzer
function analyzeResume() {
  const skills = document.getElementById("skills").value.toLowerCase();
  const role = document.getElementById("role").value.toLowerCase();

  const keywords = [
    "javascript",
    "html",
    "css",
    "react",
    "node",
    "api",
    "git",
    "problem solving",
    "communication"
  ];

  let score = 0;
  keywords.forEach(keyword => {
    if (skills.includes(keyword) || role.includes(keyword)) {
      score += 10;
    }
  });

  let level = "Poor";
  if (score >= 40) level = "Good";
  if (score >= 70) level = "Excellent";

  document.getElementById("analysis").innerHTML = `
    <h3>Resume Analysis</h3>
    <p><strong>ATS Score:</strong> ${score}/100</p>
    <p><strong>Rating:</strong> ${level}</p>
    <p>Tip: Add more relevant technical and soft skills.</p>
  `;
}
