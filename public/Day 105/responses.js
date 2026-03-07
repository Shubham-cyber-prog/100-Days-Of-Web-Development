const responses = JSON.parse(localStorage.getItem("responses")) || [];

const table = document.getElementById("table");
const empty = document.getElementById("empty");

if(responses.length > 0){

empty.style.display = "none";

/* TABLE HEADERS */

const headers = Object.keys(responses[0]);

table.innerHTML = `
<tr>
${headers.map(h=>`<th>${h}</th>`).join("")}
</tr>

${responses.map(row=>`
<tr>
${headers.map(h=>`
<td>
${Array.isArray(row[h]) ? row[h].join(", ") : row[h]}
</td>
`).join("")}
</tr>
`).join("")}

`;

}