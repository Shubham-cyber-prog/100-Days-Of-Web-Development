const enrolledCourses =
  JSON.parse(localStorage.getItem("enrolled_courses")) || [];

function enroll(courseId) {
  if (!enrolledCourses.includes(courseId)) {
    enrolledCourses.push(courseId);
    localStorage.setItem(
      "enrolled_courses",
      JSON.stringify(enrolledCourses)
    );
  }

  updateEnrollButtons();
}

function updateEnrollButtons() {
  document.querySelectorAll(".course-card").forEach(card => {
    const btn = card.querySelector("button");
    const courseId = btn.getAttribute("data-course");

    if (enrolledCourses.includes(courseId)) {
      btn.textContent = "Enrolled";
      btn.disabled = true;
      btn.classList.add("enrolled");
    }
  });
}

document.addEventListener("DOMContentLoaded", updateEnrollButtons);
