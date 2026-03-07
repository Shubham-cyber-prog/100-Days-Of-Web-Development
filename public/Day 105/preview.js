const formData = JSON.parse(localStorage.getItem("form"));

const formEl = document.getElementById("form");
const fieldsEl = document.getElementById("fields");
const empty = document.getElementById("empty");
const success = document.getElementById("success");
const submitBtn = formEl?.querySelector("button");

if(formData && formData.fields.length){

empty.classList.add("hidden");
formEl.classList.remove("hidden");

formData.fields.forEach(field=>{

const wrap = document.createElement("div");

const label = document.createElement("label");
label.textContent = field.label;
wrap.appendChild(label);

if(field.type === "radio" || field.type === "checkbox"){

field.options.forEach(opt=>{

const optLabel = document.createElement("label");
optLabel.style.display="block";

const input = document.createElement("input");
input.type = field.type;
input.name = field.label;
input.value = opt;

optLabel.appendChild(input);
optLabel.append(" " + opt);

wrap.appendChild(optLabel);

});

}

else if(field.type === "select"){

const select = document.createElement("select");
select.name = field.label;

field.options.forEach(opt=>{

const option = document.createElement("option");
option.textContent = opt;

select.appendChild(option);

});

wrap.appendChild(select);

}

else if(field.type === "textarea"){

const textarea = document.createElement("textarea");
textarea.name = field.label;

wrap.appendChild(textarea);

}

else{

const input = document.createElement("input");
input.type = field.type;
input.name = field.label;

wrap.appendChild(input);

}

fieldsEl.appendChild(wrap);

});

}

formEl.addEventListener("submit",e=>{

e.preventDefault();

const responses = JSON.parse(localStorage.getItem("responses")) || [];

const entry = {};

new FormData(formEl).forEach((value,key)=>{

if(entry[key]){

entry[key] = [].concat(entry[key],value);

}else{

entry[key] = value;

}

});

responses.push(entry);

localStorage.setItem("responses",JSON.stringify(responses));

success.classList.remove("hidden");

submitBtn.disabled=true;
submitBtn.textContent="Submitted ✓";

success.scrollIntoView({behavior:"smooth"});

});