function openTab(id,el){
  document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  document.querySelectorAll("nav li").forEach(l=>l.classList.remove("active"));
  el.classList.add("active");
}

themeToggle.onclick=()=>{
  document.body.classList.toggle("dark");
  localStorage.setItem("theme",document.body.classList.contains("dark")?"dark":"light");
};
if(localStorage.getItem("theme")==="dark")document.body.classList.add("dark");

let tasks=JSON.parse(localStorage.getItem("tasks"))||[];
const list=document.getElementById("taskList");
const printTaskDiv=document.getElementById("printTask");

taskForm.onsubmit=e=>{
  e.preventDefault();
  tasks.push({
    id:"TSK-"+Math.floor(10000+Math.random()*90000),
    title:title.value,
    due:due.value,
    priority:priority.value,
    desc:desc.value
  });
  localStorage.setItem("tasks",JSON.stringify(tasks));
  taskForm.reset();
  renderTasks();
  openTab('tasksTab',document.querySelectorAll("nav li")[2]);
};

function renderTasks(){
  list.innerHTML=tasks.length?"":"<p>No tasks added</p>";
  tasks.forEach((t,i)=>{
    list.innerHTML+=`
      <div class="task">
        <b>${t.title}</b><br>
        <small>Due: ${t.due} | Priority: ${t.priority}</small>
        <p>${t.desc}</p>
        <div class="actions">
          <button class="edit" onclick="editTask(${i})">Edit</button>
          <button class="pdf" onclick="printTask(${i})">PDF</button>
          <button class="delete" onclick="deleteTask(${i})">Delete</button>
        </div>
      </div>`;
  });
}

function deleteTask(i){
  tasks.splice(i,1);
  localStorage.setItem("tasks",JSON.stringify(tasks));
  renderTasks();
}

function editTask(i){
  const t=tasks[i];
  title.value=t.title;
  due.value=t.due;
  priority.value=t.priority;
  desc.value=t.desc;
  tasks.splice(i,1);
  localStorage.setItem("tasks",JSON.stringify(tasks));
  openTab('addTask',document.querySelectorAll("nav li")[1]);
}

function printTask(i){
  const t=tasks[i];
  printContent.innerHTML=`
    <b>ID:</b> ${t.id}<br><br>
    <b>Title:</b> ${t.title}<br>
    <b>Due:</b> ${t.due}<br>
    <b>Priority:</b> ${t.priority}<br><br>
    ${t.desc}`;
  printTaskDiv.style.display="block";
  setTimeout(()=>{
    window.print();
    printTaskDiv.style.display="none";
  },300);
}

renderTasks();
