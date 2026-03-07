let form = { fields: [] };

const fieldsEl = document.getElementById("fields");
const dropZone = document.getElementById("dropZone");

/* LOAD SAVED */

const saved = localStorage.getItem("form");

if(saved){

form = JSON.parse(saved);
render();

}

/* DRAG START */

document.querySelectorAll(".palette-item").forEach(item=>{

item.addEventListener("dragstart",e=>{

e.dataTransfer.setData("type",item.dataset.type);

});

});

/* DROP */

dropZone.addEventListener("dragover",e=>e.preventDefault());

dropZone.addEventListener("drop",e=>{

e.preventDefault();

addField(e.dataTransfer.getData("type"));

});

/* ADD FIELD */

function addField(type){

fieldsEl.querySelector(".empty")?.remove();

const field={
id:Date.now(),
type,
label:"New Field",
options:["Option 1","Option 2"]
};

form.fields.push(field);

save();
render();

}

/* RENDER */

function render(){

fieldsEl.innerHTML="";

if(!form.fields.length){

fieldsEl.innerHTML=
`<p class="empty">Drag fields from the left to build your form</p>`;

return;

}

form.fields.forEach((f,index)=>{

const div=document.createElement("div");

div.className="field";

div.innerHTML=
`
<input class="field-label"
value="${f.label}"
oninput="updateLabel(${index},this.value)" />
`;

if(f.type==="radio"||f.type==="checkbox"){

f.options.forEach((opt,i)=>{

div.innerHTML+=
`
<div class="option">

<input type="${f.type}" disabled>

<input type="text"
value="${opt}"
oninput="updateOption(${index},${i},this.value)">

</div>
`;

});

div.innerHTML+=
`
<button class="add-option"
onclick="addOption(${index})">

+ Add option

</button>
`;

}

else if(f.type==="select"){

div.innerHTML+=
`
<select disabled>
${f.options.map(o=>`<option>${o}</option>`).join("")}
</select>
`;

}

else if(f.type==="textarea"){

div.innerHTML+=`<textarea disabled></textarea>`;

}

else{

div.innerHTML+=`<input type="${f.type}" disabled>`;

}

fieldsEl.appendChild(div);

});

}

/* UPDATE */

function updateLabel(i,val){

form.fields[i].label=val;

save();

}

function updateOption(fieldIndex,optIndex,val){

form.fields[fieldIndex].options[optIndex]=val;

save();

}

function addOption(index){

form.fields[index].options.push("New Option");

save();
render();

}

function save(){

localStorage.setItem("form",JSON.stringify(form));

}