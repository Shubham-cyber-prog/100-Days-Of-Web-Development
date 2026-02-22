const header = document.getElementById("header");
const user = JSON.parse(localStorage.getItem("ml_user"));

const isHomePage =
  window.location.pathname.endsWith("index.html") ||
  window.location.pathname === "/";

if (user && isHomePage) {
  header.innerHTML = `
    <header class="main-header">
      <div class="logo">ML Path</div>

      <nav>
        <a href="index.html">Home</a>
        <a href="roadmap.html">Roadmap</a>
        <a href="courses.html">Courses</a>
        <a href="progress.html">Progress</a>

        <div class="profile-menu">
          <span class="profile-name">${user.name}</span>
          <button id="logoutBtn">Logout</button>
        </div>
      </nav>
    </header>
  `;

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("ml_user");
    window.location.href = "index.html";
  });

} else if (user && !isHomePage) {
  header.innerHTML = `
    <header class="main-header">
      <div class="logo">ML Path</div>

      <nav>
        <a href="index.html">Home</a>
        <a href="roadmap.html">Roadmap</a>
        <a href="courses.html">Courses</a>
        <a href="progress.html">Progress</a>
        <a href="courses.html" class="cta">Go to Courses</a>
      </nav>
    </header>
  `;

} else {
  header.innerHTML = `
    <header class="main-header">
      <div class="logo">ML Path</div>

      <nav>
        <a href="index.html">Home</a>
        <a href="roadmap.html">Roadmap</a>
        <a href="courses.html">Courses</a>
        <a href="progress.html">Progress</a>
        <a href="login.html" class="cta">Get Started</a>
      </nav>
    </header>
  `;
}
