const courses = [
  { id: 1, title: "HTML Basics", desc: "Learn web foundations." },
  { id: 2, title: "CSS Fundamentals", desc: "Style websites." },
  { id: 3, title: "JavaScript Essentials", desc: "Make sites interactive." },
  { id: 4, title: "Git & GitHub", desc: "Version control." },
  { id: 5, title: "Responsive Design", desc: "Mobile layouts." }
];

let enrolled = JSON.parse(localStorage.getItem("enrolled")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const courseList = document.getElementById("courseList");
const enrolledList = document.getElementById("enrolledList");
const wishlistList = document.getElementById("wishlistList");
const search = document.getElementById("search");
const toast = document.getElementById("toast");

/* Utilities */
function save() {
  localStorage.setItem("enrolled", JSON.stringify(enrolled));
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(()=> toast.classList.remove("show"),2500);
}

/* Render Courses */
function renderCourses() {
  const term = search.value.toLowerCase();
  courseList.innerHTML = "";

  courses.filter(c=>c.title.toLowerCase().includes(term))
    .forEach(c=>{
      const div=document.createElement("div");
      div.className="course";
      div.innerHTML=`
        <h3>${c.title}</h3>
        <p>${c.desc}</p>
        <button>Enroll</button>
      `;
      div.querySelector("button").onclick=()=>enroll(c.id);
      courseList.appendChild(div);
    });
}

/* Enroll */
function enroll(id){
  if(enrolled.find(c=>c.id===id)) return;
  const course=courses.find(c=>c.id===id);
  enrolled.push({...course,progress:0,rating:0});
  save();
  renderEnrolled();
  showToast("Enrolled successfully 🎉");
}

/* Progress */
function updateProgress(id){
  const course=enrolled.find(c=>c.id===id);
  if(course.progress<100){
    course.progress+=20;
    save();
    renderEnrolled();
  }
}

/* Rating */
function setRating(id,value){
  const course=enrolled.find(c=>c.id===id);
  course.rating=value;
  save();
  renderEnrolled();
}

/* Remove */
function removeCourse(id,type){
  if(type==="enrolled") enrolled=enrolled.filter(c=>c.id!==id);
  if(type==="wishlist") wishlist=wishlist.filter(c=>c.id!==id);
  save();
  renderEnrolled();
  renderWishlist();
}

/* Wishlist */
function addWishlist(id){
  if(wishlist.find(c=>c.id===id)) return;
  const course=courses.find(c=>c.id===id);
  wishlist.push(course);
  save();
  renderWishlist();
}

/* Render Enrolled */
function renderEnrolled(){
  enrolledList.innerHTML="";
  if(!enrolled.length){
    enrolledList.innerHTML="<p>No enrolled courses</p>";
    return;
  }

  enrolled.forEach(c=>{
    const div=document.createElement("div");
    div.className="enroll-card";
    div.innerHTML=`
      <h3>${c.title}</h3>
      <p>${c.desc}</p>

      <div class="progress">
        <div class="progress-bar" style="width:${c.progress}%"></div>
      </div>

      <div class="rating">
        ${[1,2,3,4,5].map(i=>
          `<i class="fa-solid fa-star ${c.rating>=i?"active":""}"
            onclick="setRating(${c.id},${i})"></i>`
        ).join("")}
      </div>

      <button onclick="updateProgress(${c.id})">Add Progress</button>
      <button class="remove-btn" onclick="removeCourse(${c.id},'enrolled')">Remove</button>
      ${c.progress===100?
        `<button onclick="openCertificate('${c.title}')">Get Certificate</button>`:""}
    `;
    enrolledList.appendChild(div);
  });
}

/* Render Wishlist */
function renderWishlist(){
  wishlistList.innerHTML="";
  wishlist.forEach(c=>{
    const div=document.createElement("div");
    div.className="enroll-card";
    div.innerHTML=`
      <h3>${c.title}</h3>
      <button class="remove-btn"
        onclick="removeCourse(${c.id},'wishlist')">Remove</button>
    `;
    wishlistList.appendChild(div);
  });
}

/* Certificate */
function openCertificate(course){
  document.getElementById("certCourse").textContent=course;
  document.getElementById("certDate").textContent=
    new Date().toLocaleDateString();
  document.getElementById("certificateOverlay").style.display="flex";
}
function closeCertificate(){
  document.getElementById("certificateOverlay").style.display="none";
}

/* Theme */
const toggle=document.getElementById("themeToggle");
const icon=toggle.querySelector("i");

if(localStorage.getItem("theme")==="dark"){
  document.body.classList.add("dark");
  icon.classList.replace("fa-moon","fa-sun");
}

toggle.onclick=()=>{
  document.body.classList.toggle("dark");
  icon.classList.toggle("fa-moon");
  icon.classList.toggle("fa-sun");
  localStorage.setItem("theme",
    document.body.classList.contains("dark")?"dark":"light");
};

/* Init */
search.addEventListener("input",renderCourses);
renderCourses();
renderEnrolled();
renderWishlist();