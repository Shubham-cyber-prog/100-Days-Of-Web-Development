let notes = JSON.parse(localStorage.getItem("notes")) || [];
let draggedIndex = null;

function toggleTheme(){
  document.body.classList.toggle("light");
}

function saveNotes(){
  localStorage.setItem("notes", JSON.stringify(notes));
}

function addNote(){
  const text = document.getElementById("noteText").value.trim();
  const category = document.getElementById("category").value;
  const color = document.getElementById("color").value;

  if(text === ""){
    alert("Note cannot be empty!");
    return;
  }

  notes.unshift({
    id: Date.now(),
    content:text,
    category:category,
    color:color,
    date:new Date().toLocaleString()
  });

  document.getElementById("noteText").value="";
  saveNotes();
  renderNotes();
}

function deleteNote(id){
  notes = notes.filter(note=>note.id!==id);
  saveNotes();
  renderNotes();
}

function updateNote(id,value){
  notes = notes.map(note=>{
    if(note.id===id){
      note.content=value;
    }
    return note;
  });
  saveNotes();
}

function renderNotes(){
  const grid=document.getElementById("notesGrid");
  grid.innerHTML="";
  const search=document.getElementById("searchInput").value.toLowerCase();

  notes.forEach((note,index)=>{
    if(note.content.toLowerCase().includes(search)){
      const div=document.createElement("div");
      div.className="note";
      div.style.background=note.color;
      div.draggable=true;

      div.ondragstart=()=>draggedIndex=index;
      div.ondragover=e=>e.preventDefault();
      div.ondrop=()=>{
        const draggedItem=notes[draggedIndex];
        notes.splice(draggedIndex,1);
        notes.splice(index,0,draggedItem);
        saveNotes();
        renderNotes();
      };

      div.innerHTML=`
      <button class="delete-btn" onclick="deleteNote(${note.id})">×</button>
      <textarea oninput="updateNote(${note.id}, this.value)">${note.content}</textarea>
      <small>Category: ${note.category}</small>
      <small>${note.date}</small>
      `;

      grid.appendChild(div);
    }
  });
}

renderNotes();