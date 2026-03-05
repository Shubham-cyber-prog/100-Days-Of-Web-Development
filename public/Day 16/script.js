const passwordField=document.getElementById("password");
const lengthSlider=document.getElementById("length");
const lengthValue=document.getElementById("lengthValue");
const strengthText=document.getElementById("strengthText");
const strengthFill=document.getElementById("strengthFill");
const historyList=document.getElementById("historyList");

lengthSlider.addEventListener("input",()=>{

lengthValue.textContent=lengthSlider.value;

});


document.getElementById("generateBtn").addEventListener("click",generatePassword);


function generatePassword(){

const length=lengthSlider.value;

const uppercase=document.getElementById("uppercase").checked;
const lowercase=document.getElementById("lowercase").checked;
const numbers=document.getElementById("numbers").checked;
const symbols=document.getElementById("symbols").checked;

let chars="";

if(uppercase) chars+="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
if(lowercase) chars+="abcdefghijklmnopqrstuvwxyz";
if(numbers) chars+="0123456789";
if(symbols) chars+="!@#$%^&*()_+[]{}<>?";

if(chars===""){

alert("Select at least one option");
return;

}

let password="";

for(let i=0;i<length;i++){

password+=chars.charAt(Math.floor(Math.random()*chars.length));

}

passwordField.value=password;

checkStrength(password);

saveHistory(password);

}


function checkStrength(password){

let score=0;

if(password.length>=8) score++;
if(password.length>=12) score++;
if(/[A-Z]/.test(password)) score++;
if(/[0-9]/.test(password)) score++;
if(/[^A-Za-z0-9]/.test(password)) score++;

if(score<=2){

strengthText.textContent="Weak";
strengthFill.style.width="33%";
strengthFill.style.background="red";

}
else if(score<=4){

strengthText.textContent="Medium";
strengthFill.style.width="66%";
strengthFill.style.background="orange";

}
else{

strengthText.textContent="Strong";
strengthFill.style.width="100%";
strengthFill.style.background="green";

}

}


document.getElementById("copyBtn").onclick=()=>{

navigator.clipboard.writeText(passwordField.value);

};


document.getElementById("togglePassword").onclick=()=>{

if(passwordField.type==="password"){

passwordField.type="text";

}else{

passwordField.type="password";

}

};


function saveHistory(password){

let history=JSON.parse(localStorage.getItem("passwordHistory"))||[];

history.unshift(password);

if(history.length>5) history.pop();

localStorage.setItem("passwordHistory",JSON.stringify(history));

displayHistory();

}


function displayHistory(){

let history=JSON.parse(localStorage.getItem("passwordHistory"))||[];

historyList.innerHTML="";

history.forEach(p=>{

const li=document.createElement("li");

li.textContent=p;

historyList.appendChild(li);

});

}

displayHistory();


document.getElementById("themeToggle").onclick=()=>{

document.body.classList.toggle("dark");

};