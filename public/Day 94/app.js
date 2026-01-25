const form = document.getElementById("noteForm");
const notesList = document.getElementById("notesList");
const emptyState = document.getElementById("emptyState");
const statusEl = document.getElementById("status");
const installBtn = document.getElementById("installBtn");

/* ======================
   SERVICE WORKER
====================== */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}

/* ======================
   ONLINE / OFFLINE STATUS
====================== */
function updateStatus() {
  statusEl.textContent = navigator.onLine ? "🟢 Online" : "🔴 Offline";
}
window.addEventListener("online", updateStatus);
window.addEventListener("offline", updateStatus);
updateStatus();

/* ======================
   INSTALL BUTTON
====================== */
let deferredPrompt = null;

// Default state
installBtn.disabled = true;

window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.disabled = false;
});

// Click handler
installBtn.addEventListener("click", async () => {
  if (!deferredPrompt) return;

  await deferredPrompt.prompt();
  deferredPrompt = null;
  installBtn.disabled = true;
});

// After app is installed
window.addEventListener("appinstalled", () => {
  installBtn.textContent = "Installed";
  installBtn.disabled = true;
});


/* ======================
   NOTES LOGIC
====================== */
form.addEventListener("submit", e => {
  e.preventDefault();

  addNote({
    title: title.value,
    content: content.value,
    created: new Date().toISOString()
  });

  form.reset();
  displayNotes();
});

function displayNotes() {
  getNotes(notes => {
    notesList.innerHTML = "";

    if (notes.length === 0) {
      emptyState.style.display = "block";
      return;
    }

    emptyState.style.display = "none";

    notes.reverse().forEach(note => {
      const div = document.createElement("div");
      div.className = "note";
      div.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <button onclick="removeNote(${note.id})">Delete</button>
      `;
      notesList.appendChild(div);
    });
  });
}

function removeNote(id) {
  deleteNote(id);
  displayNotes();
}
