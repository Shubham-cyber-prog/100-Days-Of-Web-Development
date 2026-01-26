const form = document.getElementById("noteForm");
const notesList = document.getElementById("notesList");
const emptyState = document.getElementById("emptyState");
const statusEl = document.getElementById("status");
const installBtn = document.getElementById("installBtn");

/* ======================
   INIT APP
====================== */
(async function init() {
  try {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("service-worker.js");
    }

    await initDB();
    
    loadNotes();
    updateStatus();
  } catch (err) {
    console.error("App init failed:", err);
  }
})();

async function loadNotes() {
  const notes = await getNotesFromDB();
  renderNotes(notes);
}

function renderNotes(notes) {
  notesList.innerHTML = "";

  if (notes.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  notes.reverse().forEach((note) => {
    const date = new Date(note.created).toLocaleDateString(undefined, {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    const div = document.createElement("div");
    div.className = "note fade-in";
    div.innerHTML = `
      <div class="note-header">
        <h3>${escapeHtml(note.title)}</h3>
        <span class="note-date">${date}</span>
      </div>
      <p>${escapeHtml(note.content)}</p>
      <button class="delete-btn" data-id="${note.id}">
        Delete
      </button>
    `;
    notesList.appendChild(div);
  });
}

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");

  const newNote = {
    title: titleInput.value,
    content: contentInput.value,
    created: new Date().toISOString(),
  };

  await addNoteToDB(newNote);
  
  form.reset();
  loadNotes();
});

notesList.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const id = Number(e.target.dataset.id);
    await deleteNoteFromDB(id);
    loadNotes();
  }
});

/* ======================
   ONLINE / OFFLINE STATUS
====================== */
function updateStatus() {
  const isOnline = navigator.onLine;
  statusEl.textContent = isOnline ? "🟢 Online" : "🔴 Offline";
  statusEl.className = isOnline ? "status-online" : "status-offline";
}
window.addEventListener("online", updateStatus);
window.addEventListener("offline", updateStatus);

/* ======================
   INSTALL BUTTON
====================== */
let deferredPrompt = null;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.disabled = false;
  installBtn.hidden = false;
});

installBtn.addEventListener("click", async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  deferredPrompt = null;
  if (outcome === 'accepted') {
    installBtn.hidden = true;
  }
});

window.addEventListener("appinstalled", () => {
  installBtn.hidden = true;
  console.log("App Installed");
});