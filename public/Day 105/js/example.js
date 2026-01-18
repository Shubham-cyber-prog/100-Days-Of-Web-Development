const exampleForm = {
  fields: [
    { type: "select", label: "Event Type", options: ["Workshop", "Seminar", "Hackathon"] },
    { type: "radio", label: "Attendance Mode", options: ["Online", "Offline"] },
    { type: "checkbox", label: "Topics of Interest", options: ["Web Dev", "AI/ML", "Cloud", "Cybersecurity"] },
    { type: "textarea", label: "Additional Notes" }
  ]
};

const fieldsEl = document.getElementById("exampleFields");
const success = document.getElementById("exampleSuccess");

exampleForm.fields.forEach(field => {
  const group = document.createElement("div");
  group.className = "form-group";

  const label = document.createElement("label");
  label.textContent = field.label;
  group.appendChild(label);

  if (field.type === "radio" || field.type === "checkbox") {
    const options = document.createElement("div");
    options.className = "option-group";

    field.options.forEach(opt => {
      const item = document.createElement("label");
      item.className = "option-item";

      const input = document.createElement("input");
      input.type = field.type;
      input.name = field.label;
      input.value = opt;

      item.appendChild(input);
      item.append(opt);
      options.appendChild(item);
    });

    group.appendChild(options);
  }
  else if (field.type === "select") {
    const select = document.createElement("select");
    field.options.forEach(opt => {
      const o = document.createElement("option");
      o.textContent = opt;
      select.appendChild(o);
    });
    group.appendChild(select);
  }
  else {
    group.appendChild(document.createElement("textarea"));
  }

  fieldsEl.appendChild(group);
});

document.getElementById("exampleForm").addEventListener("submit", e => {
  e.preventDefault();
  success.classList.remove("hidden");
});
