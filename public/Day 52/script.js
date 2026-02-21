let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const modal = document.getElementById("modal");
const form = document.getElementById("taskForm");

const title = document.getElementById("title");
const desc = document.getElementById("desc");
const status = document.getElementById("status");
const taskId = document.getElementById("taskId");

const addBtns = document.querySelectorAll(".addBtn");
const cancelBtn = document.getElementById("cancel");
const clearBtn = document.getElementById("clearAll");


// OPEN MODAL
addBtns.forEach(btn=>{
  btn.onclick = ()=>{
    openModal(btn.dataset.col);
  };
});

function openModal(col){
  modal.style.display="flex";
  form.reset();
  taskId.value="";
  status.value=col;
}


// CLOSE
cancelBtn.onclick = ()=>{
  modal.style.display="none";
};


// SAVE TASK
form.onsubmit = e=>{
  e.preventDefault();

  if(taskId.value){
    editTaskSave();
  }else{
    addTask();
  }

  modal.style.display="none";
  save();
  render();
};


// ADD
function addTask(){

  const task={
    id:Date.now(),
    title:title.value,
    desc:desc.value,
    status:status.value
  };

  tasks.push(task);
}


// EDIT SAVE
function editTaskSave(){

  const id = Number(taskId.value);

  const t = tasks.find(x=>x.id===id);

  t.title = title.value;
  t.desc = desc.value;
  t.status = status.value;
}


// RENDER
function render(){

  ["todo","inprogress","review","done"].forEach(c=>{
    document.getElementById(c).innerHTML="";
  });

  tasks.forEach(t=>{

    const div=document.createElement("div");
    div.className="task";
    div.draggable=true;

    div.innerHTML=`
      <b>${t.title}</b>
      <small>${t.desc}</small>

      <div class="taskBtns">
        <button class="edit">Edit</button>
        <button class="del">Delete</button>
      </div>
    `;

    // EDIT
    div.querySelector(".edit").onclick=()=>{
      editTask(t.id);
    };

    // DELETE
    div.querySelector(".del").onclick=()=>{
      deleteTask(t.id);
    };

    document.getElementById(t.status).appendChild(div);

    setupDrag(div,t.id);

  });

  updateStats();
}


// EDIT
function editTask(id){

  const t=tasks.find(x=>x.id===id);

  taskId.value=id;
  title.value=t.title;
  desc.value=t.desc;
  status.value=t.status;

  modal.style.display="flex";
}


// DELETE
function deleteTask(id){

  if(confirm("Delete task?")){

    tasks = tasks.filter(t=>t.id!==id);
    save();
    render();
  }
}


// CLEAR ALL
clearBtn.onclick=()=>{

  if(confirm("Clear all tasks?")){

    tasks=[];
    save();
    render();
  }
};


// SAVE STORAGE
function save(){

  localStorage.setItem("tasks",JSON.stringify(tasks));
}


// STATS
function updateStats(){

  document.getElementById("total").innerText = tasks.length;

  document.getElementById("done").innerText =
    tasks.filter(t=>t.status==="done").length;

  document.getElementById("progress").innerText =
    tasks.filter(t=>t.status==="inprogress").length;

  ["todo","inprogress","review","done"].forEach(c=>{
    document.getElementById(c+"Count").innerText=
      tasks.filter(t=>t.status===c).length;
  });
}


// DRAG
function setupDrag(el,id){

  el.ondragstart = e=>{
    e.dataTransfer.setData("id",id);
  };
}

document.querySelectorAll(".taskBox").forEach(box=>{

  box.ondragover = e=>{
    e.preventDefault();
  };

  box.ondrop = e=>{

    const id = Number(e.dataTransfer.getData("id"));

    const t = tasks.find(x=>x.id===id);

    t.status = box.id;

    save();
    render();
  };

});


// INIT
render();
