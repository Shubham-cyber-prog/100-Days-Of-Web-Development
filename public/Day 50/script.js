/* ================== FORM INPUTS ================== */
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const summaryInput = document.getElementById("summary");
const linkedinInput = document.getElementById("linkedin");
const githubInput = document.getElementById("github");
const photoUpload = document.getElementById("photo-upload");

/* ================== PREVIEW ELEMENTS ================== */
const previewName = document.getElementById("preview-name");
const previewEmail = document.getElementById("preview-email");
const previewPhone = document.getElementById("preview-phone");
const previewSummary = document.getElementById("preview-summary");
const previewLinkedIn = document.getElementById("preview-linkedin");
const previewGitHub = document.getElementById("preview-github");
const previewEducation = document.getElementById("preview-education");
const previewExperience = document.getElementById("preview-experience");
const previewSkills = document.getElementById("preview-skills");
const previewPhoto = document.getElementById("preview-photo");
const wordCount = document.getElementById("word-count");

/* ================== MAIN PREVIEW UPDATE ================== */
function updatePreview() {
  previewName.textContent = nameInput.value;
  previewEmail.textContent = emailInput.value;
  previewPhone.textContent = phoneInput.value;
  previewSummary.textContent = summaryInput.value;
  previewLinkedIn.textContent = linkedinInput.value;
  previewGitHub.textContent = githubInput.value;

  updateEducation();
  updateExperience();
  updateSkills();
  updateProgressBar();
}

/* ================== PROGRESS BAR ================== */
function updateProgressBar() {
  let filled = 0;
  if (nameInput.value) filled++;
  if (emailInput.value) filled++;
  if (phoneInput.value) filled++;
  if (summaryInput.value) filled++;
  if (linkedinInput.value) filled++;
  if (githubInput.value) filled++;
  if (previewEducation.children.length) filled++;
  if (previewExperience.children.length) filled++;
  if (previewSkills.textContent) filled++;

  document.getElementById("progress-bar").style.width =
    `${(filled / 9) * 100}%`;
}

/* ================== INPUT LISTENERS ================== */
[nameInput, emailInput, phoneInput, summaryInput, linkedinInput, githubInput]
  .forEach(input => input.addEventListener("input", updatePreview));

summaryInput.addEventListener("input", () => {
  wordCount.textContent = summaryInput.value.length;
});

/* ================== PHOTO UPLOAD ================== */
photoUpload.addEventListener("change", () => {
  const file = photoUpload.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const img = document.createElement("img");
    img.src = reader.result;
    previewPhoto.innerHTML = "";
    previewPhoto.appendChild(img);
  };
  reader.readAsDataURL(file);
});

/* ================== SKILLS ================== */
function updateSkills() {
  const skills = [...document.querySelectorAll(".skills input:checked")]
    .map(cb => cb.value);
  previewSkills.textContent = skills.join(", ");
  updateProgressBar();
}

document.querySelectorAll(".skills input")
  .forEach(cb => cb.addEventListener("change", updateSkills));

/* ================== EDUCATION ================== */
function updateEducation() {
  previewEducation.innerHTML = "";

  document.querySelectorAll(".education").forEach(input => {
    if (input.value.trim()) {
      const li = document.createElement("li");
      li.textContent = input.value;
      previewEducation.appendChild(li);
    }
  });
}

function addEducation() {
  const container = document.getElementById("education-section");
  const input = document.createElement("input");

  input.type = "text";
  input.className = "education";
  input.placeholder = "Degree & Institution";

  input.addEventListener("input", () => {
    updateEducation();
    updateProgressBar();
  });

  container.insertBefore(input, container.lastElementChild);
}

/* Attach listener to initial education input */
document.querySelectorAll(".education").forEach(input => {
  input.addEventListener("input", () => {
    updateEducation();
    updateProgressBar();
  });
});

/* ================== EXPERIENCE ================== */
function updateExperience() {
  previewExperience.innerHTML = "";

  document.querySelectorAll(".experience").forEach(input => {
    if (input.value.trim()) {
      const li = document.createElement("li");
      li.textContent = input.value;
      previewExperience.appendChild(li);
    }
  });
}

function addExperience() {
  const container = document.getElementById("experience-section");
  const input = document.createElement("input");

  input.type = "text";
  input.className = "experience";
  input.placeholder = "Role & Company";

  input.addEventListener("input", () => {
    updateExperience();
    updateProgressBar();
  });

  container.insertBefore(input, container.lastElementChild);
}

/* Attach listener to initial experience input */
document.querySelectorAll(".experience").forEach(input => {
  input.addEventListener("input", () => {
    updateExperience();
    updateProgressBar();
  });
});

/* ================== CLEAR FORM ================== */
function clearForm() {
  document.getElementById("resume-form").reset();

  previewName.textContent = "";
  previewEmail.textContent = "";
  previewPhone.textContent = "";
  previewSummary.textContent = "";
  previewLinkedIn.textContent = "";
  previewGitHub.textContent = "";
  previewEducation.innerHTML = "";
  previewExperience.innerHTML = "";
  previewSkills.textContent = "";
  previewPhoto.innerHTML = "";
  wordCount.textContent = 0;

  updateProgressBar();
}

/* ================== DOWNLOAD PDF ================== */
function downloadResume() {
  // Force preview update
  updatePreview();

  const element = document.getElementById("resume-preview");

  // Wait for DOM repaint (CRITICAL)
  setTimeout(() => {
    html2pdf()
      .set({
        margin: 0.5,
        filename: "My_Resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          scrollY: 0
        },
        jsPDF: {
          unit: "in",
          format: "a4",
          orientation: "portrait"
        }
      })
      .from(element)
      .save();
  }, 300); // <-- THIS is the magic fix
}
