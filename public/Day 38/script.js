const form = document.getElementById("appointmentForm");
const list = document.getElementById("appointmentList");

let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

function renderAppointments() {
  list.innerHTML = "";

  appointments.forEach((appt, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>
        <strong>${appt.name}</strong><br>
        ${appt.date} at ${appt.time}
      </span>
      <button class="delete" onclick="deleteAppointment(${index})">X</button>
    `;
    list.appendChild(li);
  });

  localStorage.setItem("appointments", JSON.stringify(appointments));
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  appointments.push({ name, date, time });
  renderAppointments();
  form.reset();
});

function deleteAppointment(index) {
  appointments.splice(index, 1);
  renderAppointments();
}

renderAppointments();
