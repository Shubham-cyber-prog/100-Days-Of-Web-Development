let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function showPage(page){

document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));

document.getElementById(page).classList.add("active");

renderTasks();
updateStats();

}

function saveTasks(){
localStorage.setItem("tasks",JSON.stringify(tasks));
}

function addTask(status){

let title = prompt("Task title");

if(!title) return;

tasks.push({
id:Date.now(),
title,
status
});

saveTasks();

renderTasks();

}

function renderTasks(){

["todo","inprogress","review","done"].forEach(c=>{

document.getElementById(c).innerHTML="";

});

tasks.forEach(t=>{

let div=document.createElement("div");

div.className="task";

div.innerHTML=`
<span>${t.title}</span>

<div class="task-buttons">

<button onclick="editTask(${t.id})">✏</button>

<button onclick="deleteTask(${t.id})">🗑</button>

</div>
`;

document.getElementById(t.status).appendChild(div);

});

}

function deleteTask(id){

tasks = tasks.filter(t=>t.id!==id);

saveTasks();

renderTasks();

}

function editTask(id){

let task = tasks.find(t=>t.id===id);

let newTitle = prompt("Edit task",task.title);

if(!newTitle) return;

task.title=newTitle;

saveTasks();

renderTasks();

}

function updateStats(){

document.getElementById("totalTasks").innerText = tasks.length;

document.getElementById("progressTasks").innerText =
tasks.filter(t=>t.status==="inprogress").length;

document.getElementById("completedTasks").innerText =
tasks.filter(t=>t.status==="done").length;

}

document.getElementById("searchInput").addEventListener("input",function(){

let val=this.value.toLowerCase();

let res=tasks.filter(t=>t.title.toLowerCase().includes(val));

document.getElementById("searchResults").innerHTML =
res.map(t=>`<p>${t.title}</p>`).join("");

});

renderTasks();
updateStats();