let notes = JSON.parse(localStorage.getItem("quicknotes")) || [];
let isEditing = false;
let editId = null;

const app = document.getElementById("app");
const searchInput = document.getElementById("search-input");
const modal = document.getElementById("modal-overlay");
const titleInput = document.getElementById("note-title");
const bodyInput = document.getElementById("note-body");
const modalTitle = document.getElementById("modal-title");
const saveBtn = document.getElementById("save-btn");
const cancelBtn = document.getElementById("cancel-btn");

/* Helpers */
function saveNotes() {
  localStorage.setItem("quicknotes", JSON.stringify(notes));
}

function today() {
  return new Date().toLocaleDateString();
}

/* Render */
function render(list = notes) {
  app.innerHTML = "";

  const addCard = document.createElement("div");
  addCard.className = "note-card add-card";
  addCard.textContent = "+ Add Note";
  addCard.onclick = () => openModal();
  app.appendChild(addCard);

  list.forEach(note => {
    const card = document.createElement("div");
    card.className = "note-card";
    card.innerHTML = `
      <div>
        <div class="note-title">${note.title}</div>
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
}

/* Modal */
function openModal(edit = false, id = null) {
  modal.classList.add("active");
  isEditing = edit;
  editId = id;

  if (edit) {
    const note = notes.find(n => n.id === id);
    titleInput.value = note.title;
    bodyInput.value = note.body;
    modalTitle.textContent = "Edit Note";
  } else {
    titleInput.value = "";
    bodyInput.value = "";
    modalTitle.textContent = "Add Note";
  }
}

function closeModal() {
  modal.classList.remove("active");
}

/* Actions */
saveBtn.onclick = () => {
  const title = titleInput.value.trim() || "Untitled";
  const body = bodyInput.value.trim();
  if (!body) return;

  if (isEditing) {
    notes = notes.map(n =>
      n.id === editId ? { ...n, title, body } : n
    );
  } else {
    notes.unshift({
      id: Date.now().toString(),
      title,
      body,
      date: today()
    });
  }

  saveNotes();
  render();
  closeModal();
};

cancelBtn.onclick = closeModal;

window.deleteNote = id => {
  notes = notes.filter(n => n.id !== id);
  saveNotes();
  render();
};

window.editNote = id => openModal(true, id);

searchInput.oninput = e => {
  const q = e.target.value.toLowerCase();
  render(notes.filter(n =>
    n.title.toLowerCase().includes(q) ||
    n.body.toLowerCase().includes(q)
  ));
};

/* Init */
render();
