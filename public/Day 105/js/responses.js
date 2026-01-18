const table = document.getElementById("responsesTable");
const emptyMsg = document.getElementById("emptyResponses");

const responses = JSON.parse(localStorage.getItem("responses")) || [];

if (responses.length === 0) {
  emptyMsg.classList.remove("hidden");
} else {
  table.classList.remove("hidden");

  const headers = Object.keys(responses[0]);

  table.innerHTML = `
    <tr>
      ${headers.map(h => `<th>${h}</th>`).join("")}
    </tr>
    ${responses.map(r => `
      <tr>
        ${headers.map(h => `<td>${Array.isArray(r[h]) ? r[h].join(", ") : r[h]}</td>`).join("")}
      </tr>
    `).join("")}
  `;
}
