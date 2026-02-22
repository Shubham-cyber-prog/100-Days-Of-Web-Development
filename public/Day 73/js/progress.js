const container = document.getElementById("progressList");
const courses = JSON.parse(localStorage.getItem("courses")) || [];

if (courses.length === 0) {
  container.innerHTML = "<p>No courses enrolled yet.</p>";
}

courses.forEach(course => {
  const div = document.createElement("div");
  div.className = "progress-card";

  div.innerHTML = `
    <h3>${course.id}</h3>
    <div class="progress-bar">
      <div class="progress-fill" style="width:${course.progress}%"></div>
    </div>
    <p>${course.progress}% completed</p>
  `;

  container.appendChild(div);
});
