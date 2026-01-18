let form = {
  title: "",
  fields: []
};

const fieldsList = document.getElementById("fieldsList");
const formTitleInput = document.getElementById("formTitle");

formTitleInput.addEventListener("input", () => {
  form.title = formTitleInput.value;
  saveForm();
});

/* =========================
   ADD FIELD
========================= */
function addField(type) {
  const field = {
    id: Date.now(),
    type,
    label: "New Field",
    required: false
  };

  if (["select", "checkbox", "radio"].includes(type)) {
    field.options = ["Option 1", "Option 2"];
  }

  form.fields.push(field);
  saveForm();
  renderFields();
}

/* =========================
   RENDER FIELDS
========================= */
function renderFields() {
  fieldsList.innerHTML = "";

  if (form.fields.length === 0) {
    fieldsList.innerHTML = "<p>No fields added yet.</p>";
    return;
  }

  form.fields.forEach((field, index) => {
    const div = document.createElement("div");
    div.className = "field";

    let optionsEditor = "";

    if (field.options) {
      optionsEditor = `
        <input
          type="text"
          value="${field.options.join(", ")}"
          placeholder="Options (comma separated)"
          oninput="updateOptions(${field.id}, this.value)"
        />
      `;
    }

    div.innerHTML = `
      <input
        type="text"
        value="${field.label}"
        oninput="updateLabel(${field.id}, this.value)"
      />

      ${optionsEditor}

      <div class="field-actions">
        <div>
          <button onclick="moveUp(${index})" ${index === 0 ? "disabled" : ""}>↑</button>
          <button onclick="moveDown(${index})" ${index === form.fields.length - 1 ? "disabled" : ""}>↓</button>
        </div>

        <label>
          <input
            type="checkbox"
            ${field.required ? "checked" : ""}
            onchange="toggleRequired(${field.id})"
          />
          Required
        </label>

        <button onclick="deleteField(${field.id})">Delete</button>
      </div>
    `;

    fieldsList.appendChild(div);
  });
}

/* =========================
   FIELD ACTIONS
========================= */
function moveUp(index) {
  if (index === 0) return;
  [form.fields[index - 1], form.fields[index]] =
    [form.fields[index], form.fields[index - 1]];
  saveForm();
  renderFields();
}

function moveDown(index) {
  if (index === form.fields.length - 1) return;
  [form.fields[index + 1], form.fields[index]] =
    [form.fields[index], form.fields[index + 1]];
  saveForm();
  renderFields();
}

function updateLabel(id, value) {
  form.fields.find(f => f.id === id).label = value;
  saveForm();
}

function updateOptions(id, value) {
  form.fields.find(f => f.id === id).options =
    value.split(",").map(o => o.trim()).filter(Boolean);
  saveForm();
}

function toggleRequired(id) {
  const field = form.fields.find(f => f.id === id);
  field.required = !field.required;
  saveForm();
}

function deleteField(id) {
  form.fields = form.fields.filter(f => f.id !== id);
  saveForm();
  renderFields();
}

/* =========================
   CLEAR FORM
========================= */
function clearForm() {
  if (!confirm("This will delete the form and all responses. Continue?")) return;
  form = { title: "", fields: [] };
  localStorage.removeItem("form");
  localStorage.removeItem("responses");
  formTitleInput.value = "";
  renderFields();
}

/* =========================
   STORAGE
========================= */
function saveForm() {
  localStorage.setItem("form", JSON.stringify(form));
}

function loadForm() {
  const saved = localStorage.getItem("form");
  if (saved) {
    form = JSON.parse(saved);
    formTitleInput.value = form.title;
  }
  renderFields();
}

loadForm();
