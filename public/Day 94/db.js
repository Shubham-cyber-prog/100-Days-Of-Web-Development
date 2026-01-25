const DB_NAME = "notes-db";
const DB_VERSION = 1;
const STORE_NAME = "notes";

let db;

const request = indexedDB.open(DB_NAME, DB_VERSION);

request.onupgradeneeded = e => {
  db = e.target.result;
  db.createObjectStore(STORE_NAME, {
    keyPath: "id",
    autoIncrement: true
  });
};

request.onsuccess = e => {
  db = e.target.result;
  displayNotes();
};

function addNote(note) {
  const tx = db.transaction(STORE_NAME, "readwrite");
  tx.objectStore(STORE_NAME).add(note);
}

function getNotes(cb) {
  const tx = db.transaction(STORE_NAME, "readonly");
  const req = tx.objectStore(STORE_NAME).getAll();
  req.onsuccess = () => cb(req.result);
}

function deleteNote(id) {
  const tx = db.transaction(STORE_NAME, "readwrite");
  tx.objectStore(STORE_NAME).delete(id);
}
