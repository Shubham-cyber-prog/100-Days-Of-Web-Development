let currentColumn=null;
let dragged=null;

/* MODAL */

function openModal(column){

currentColumn=column;
document.getElementById("modal").style.display="flex";

}

function closeModal(){

document.getElementById("modal").style.display="none";

}

/* SAVE TASK */

function saveTask(){

const title=document.getElementById("taskTitle").value;
const date=document.getElementById("taskDate").value;
const label=document.getElementById("taskLabel").value;
const avatar=document.getElementById("taskAvatar").value;
const priority=document.getElementById("taskPriority").value;

if(!title)return;

const task=document.createElement("div");

task.className=`task label-${label}`;

task.draggable=true;

task.innerHTML=`
<strong>${title}</strong>

<div class="task-footer">

<span>${priority}</span>

<span>${date}</span>

<span class="avatar">${avatar}</span>

</div>

<button onclick="editTask(this)">Edit</button>
<button onclick="deleteTask(this)">Delete</button>
`;

task.addEventListener("dragstart",()=>dragged=task);

document.getElementById(currentColumn).appendChild(task);

saveBoard();

closeModal();

}

/* DELETE */

function deleteTask(btn){

btn.parentElement.remove();

saveBoard();

}

/* EDIT */

function editTask(btn){

const task=btn.parentElement;

const newTitle=prompt("Edit task",task.querySelector("strong").innerText);

if(newTitle) task.querySelector("strong").innerText=newTitle;

saveBoard();

}

/* DRAG */

document.querySelectorAll(".task-list").forEach(list=>{

list.addEventListener("dragover",e=>e.preventDefault());

list.addEventListener("drop",()=>{

if(dragged){

list.appendChild(dragged);

saveBoard();

}

});

});

/* SAVE */

function saveBoard(){

const data={
todo:document.getElementById("todo").innerHTML,
progress:document.getElementById("progress").innerHTML,
done:document.getElementById("done").innerHTML
};

localStorage.setItem("kanban",JSON.stringify(data));

}

/* LOAD */

function loadBoard(){

const data=JSON.parse(localStorage.getItem("kanban"));

if(!data)return;

document.getElementById("todo").innerHTML=data.todo;
document.getElementById("progress").innerHTML=data.progress;
document.getElementById("done").innerHTML=data.done;

document.querySelectorAll(".task").forEach(task=>{
task.draggable=true;
task.addEventListener("dragstart",()=>dragged=task);
});

}

loadBoard();

/* SEARCH */

document.getElementById("search").addEventListener("input",e=>{

const val=e.target.value.toLowerCase();

document.querySelectorAll(".task").forEach(task=>{

task.style.display=task.innerText.toLowerCase().includes(val)
? "block"
: "none";

});

});

/* DARK MODE */

function toggleDark(){

document.body.classList.toggle("dark");

}