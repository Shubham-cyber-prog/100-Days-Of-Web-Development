let data = JSON.parse(localStorage.getItem("appointments")) || [];

const list = document.getElementById("list");
const form = document.getElementById("form");
const editIndex = document.getElementById("editIndex");

/* FIXED REFERENCES */
const fullName = document.getElementById("fullName");
const date = document.getElementById("date");
const time = document.getElementById("time");
const service = document.getElementById("service");

function save(){
  localStorage.setItem("appointments", JSON.stringify(data));
}

function stats(){
  total.textContent = data.length;
  upcoming.textContent = data.filter(
    a => a.date >= new Date().toISOString().split("T")[0]
  ).length;
}

function render(){
  list.innerHTML = data.length ? "" : "<p>No appointments yet</p>";

  data.forEach((a,i)=>{
    list.innerHTML += `
      <div class="appointment">
        <b>${a.name}</b><br>
        <small>${a.date} • ${a.time}</small><br>
        <small>${a.service}</small>
        <div class="actions">
          <button class="edit" onclick="edit(${i})">Edit</button>
          <button class="delete" onclick="del(${i})">Delete</button>
        </div>
      </div>
    `;
  });

  stats();
}

form.onsubmit = e => {
  e.preventDefault();

  const obj = {
    name: fullName.value,
    date: date.value,
    time: time.value,
    service: service.value
  };

  editIndex.value === ""
    ? data.push(obj)
    : data[editIndex.value] = obj;

  editIndex.value = "";
  form.reset();
  save();
  render();
};

function del(i){
  data.splice(i,1);
  save();
  render();
}

function edit(i){
  const a = data[i];
  fullName.value = a.name;
  date.value = a.date;
  time.value = a.time;
  service.value = a.service;
  editIndex.value = i;
}

/* DARK MODE */
const toggle = document.getElementById("themeToggle");
const icon = toggle.querySelector("i");

if(localStorage.getItem("theme") === "dark"){
  document.body.classList.add("dark");
  icon.classList.replace("fa-moon","fa-sun");
}

toggle.onclick = () => {
  document.body.classList.toggle("dark");
  const dark = document.body.classList.contains("dark");

  icon.classList.toggle("fa-moon", !dark);
  icon.classList.toggle("fa-sun", dark);

  localStorage.setItem("theme", dark ? "dark" : "light");
};

render();
