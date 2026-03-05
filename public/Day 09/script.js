let notes = JSON.parse(localStorage.getItem("notes")) || [];
let draggedIndex = null;

function toggleTheme(){
  document.body.classList.toggle("light");
// QuickNotes App with Reminders & Countdown

let notes = JSON.parse(localStorage.getItem("quicknotes")) || [];
let isEditing = false;
let editId = null;

// DOM References
const app = document.getElementById("app");
const searchInput = document.getElementById("search-input");
const modal = document.getElementById("modal-overlay");
const titleInput = document.getElementById("note-title");
const bodyInput = document.getElementById("note-body");
const reminderInput = document.getElementById("note-reminder"); // New
const modalTitle = document.getElementById("modal-title");
const saveBtn = document.getElementById("save-btn");
const cancelBtn = document.getElementById("cancel-btn");
const themeToggleBtn = document.getElementById("theme-toggle-btn");

// ==========================
// Helpers
// ==========================
function saveNotes() {
  localStorage.setItem("quicknotes", JSON.stringify(notes));
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
// Request notification permission
if ("Notification" in window && Notification.permission !== "granted") {
  Notification.requestPermission();
}

// ==========================
// Render Notes
// ==========================
function render(list = notes) {
  app.innerHTML = "";

  // Add Note Card
  const addCard = document.createElement("div");
  addCard.className = "note-card add-card";
  addCard.textContent = "+ Add Note";
  addCard.onclick = () => openModal();
  app.appendChild(addCard);

  // Render existing notes
  list.forEach(note => {
    const card = document.createElement("div");
    card.className = "note-card";

    // Reminder icon and remaining time
    let reminderText = "";
    if (note.reminder) {
      const now = new Date();
      const reminderDate = new Date(note.reminder);
      const diffMs = reminderDate - now;

      if (diffMs > 0) {
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        reminderText = ` 🕒 ${days > 0 ? days + "d " : ""}${hours}h ${minutes}m left`;
      } else {
        reminderText = " ⏰ Reminder passed";
      }
    }

    card.innerHTML = `
      <div>
        <div class="note-title">${note.title}${reminderText}</div>
        <div class="note-body">${note.body}</div>
      </div>
      <div class="note-footer">
        <span>${note.date}</span>
        <div>
          <button class="icon-btn" onclick="editNote('${note.id}')">✏️</button>
          <button class="icon-btn delete" onclick="deleteNote('${note.id}')">🗑️</button>
        </div>
      </div>
    `;

    app.appendChild(card);
  });

  document.getElementById("noteText").value="";
  saveNotes();
  renderNotes();
}

function deleteNote(id){
  notes = notes.filter(note=>note.id!==id);
// ==========================
// Modal
// ==========================
function openModal(edit = false, id = null) {
  modal.classList.add("active");
  isEditing = edit;
  editId = id;

  if (edit) {
    const note = notes.find(n => n.id === id);
    titleInput.value = note.title;
    bodyInput.value = note.body;
    reminderInput.value = note.reminder || "";
    modalTitle.textContent = "Edit Note";
  } else {
    titleInput.value = "";
    bodyInput.value = "";
    reminderInput.value = "";
    modalTitle.textContent = "Add Note";
  }
}

function closeModal() {
  modal.classList.remove("active");
}

// Close modal if clicked outside
modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});

// ==========================
// Actions
// ==========================
saveBtn.onclick = () => {
  const title = titleInput.value.trim() || "Untitled";
  const body = bodyInput.value.trim();
  const reminder = reminderInput.value; // New

  if (!body) return; // Don't allow empty body

  if (isEditing) {
    notes = notes.map(n =>
      n.id === editId ? { ...n, title, body, reminder, notified: false } : n
    );
  } else {
    notes.unshift({
      id: Date.now().toString(),
      title,
      body,
      date: today(),
      reminder,
      notified: false
    });
  }

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
// Edit/Delete
window.deleteNote = id => {
  if (confirm("Are you sure you want to delete this note?")) {
    notes = notes.filter(n => n.id !== id);
    saveNotes();
    render();
  }
};

window.editNote = id => openModal(true, id);

// ==========================
// Search
// ==========================
searchInput.oninput = e => {
  const q = e.target.value.toLowerCase();
  render(notes.filter(n =>
    n.title.toLowerCase().includes(q) ||
    n.body.toLowerCase().includes(q)
  ));
};

// ==========================
// Theme Toggle
// ==========================
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeToggleBtn.textContent = "☀ ";
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
// ==========================
// Reminders & Notifications
// ==========================
function checkReminders() {
  const now = new Date();
  notes.forEach(note => {
    if (note.reminder && !note.notified) {
      const reminderDate = new Date(note.reminder);
      if (reminderDate <= now) {
        if (Notification.permission === "granted") {
          new Notification("Reminder: " + note.title, {
            body: note.body || "You set a reminder for this note",
          });
        }
        note.notified = true; // Prevent repeated notifications
        saveNotes();
      }
    }
  });
}

// Check reminders every 30 seconds
setInterval(() => {
  checkReminders();
  render(); // update remaining time countdown
}, 30000);

// ==========================
// Initialize
// ==========================
render();
checkReminders();
