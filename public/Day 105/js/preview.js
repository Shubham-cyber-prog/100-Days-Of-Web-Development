const formData = JSON.parse(localStorage.getItem("form"));

const previewTitle = document.getElementById("previewTitle");
const previewFields = document.getElementById("previewFields");
const formEl = document.getElementById("previewForm");
const successMsg = document.getElementById("successMsg");
const emptyPreview = document.getElementById("emptyPreview");

if (!formData || formData.fields.length === 0) {
  previewTitle.textContent = "Form Preview";
  emptyPreview.classList.remove("hidden");
} else {
  previewTitle.textContent = formData.title;
  formEl.classList.remove("hidden");

  formData.fields.forEach(field => {
    const wrapper = document.createElement("div");

    const label = document.createElement("label");
    label.textContent = field.label;
    wrapper.appendChild(label);

    if (field.type === "checkbox" || field.type === "radio") {
      field.options.forEach(opt => {
        const optionLabel = document.createElement("label");
        optionLabel.style.display = "block";

        const input = document.createElement("input");
        input.type = field.type;
        input.name = field.id;
        input.value = opt;

        optionLabel.appendChild(input);
        optionLabel.append(" " + opt);
        wrapper.appendChild(optionLabel);
      });
    } else if (field.type === "select") {
      const select = document.createElement("select");
      select.name = field.id;
      select.required = field.required;

      field.options.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt;
        option.textContent = opt;
        select.appendChild(option);
      });

      wrapper.appendChild(select);
    } else if (field.type === "textarea") {
      const textarea = document.createElement("textarea");
      textarea.name = field.id;
      textarea.required = field.required;
      wrapper.appendChild(textarea);
    } else {
      const input = document.createElement("input");
      input.type = field.type;
      input.name = field.id;
      input.required = field.required;
      wrapper.appendChild(input);
    }

    previewFields.appendChild(wrapper);
  });
}

formEl?.addEventListener("submit", (e) => {
  e.preventDefault();

  const responses = JSON.parse(localStorage.getItem("responses")) || [];
  const data = {};

  formData.fields.forEach(field => {
    if (field.type === "checkbox") {
      data[field.label] = [...formEl.querySelectorAll(
        `input[name="${field.id}"]:checked`
      )].map(i => i.value);
    } else if (field.type === "radio") {
      const selected = formEl.querySelector(`input[name="${field.id}"]:checked`);
      data[field.label] = selected ? selected.value : "";
    } else {
      data[field.label] = formEl[field.id]?.value || "";
    }
  });

  responses.push(data);
  localStorage.setItem("responses", JSON.stringify(responses));

  formEl.reset();
  successMsg.classList.remove("hidden");
});
