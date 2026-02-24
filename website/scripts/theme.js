const root=document.documentElement;

function setTheme(theme){

root.setAttribute("data-theme",theme);

localStorage.setItem("theme",theme);

}


// Load saved

const saved=localStorage.getItem("theme");

if(saved){

setTheme(saved);

}else{

if(window.matchMedia("(prefers-color-scheme: dark)").matches){

setTheme("dark");

}

}


// Toggle Button

document.getElementById("themeToggle")
?.addEventListener("click",()=>{

const current=root.getAttribute("data-theme");

setTheme(current==="dark"?"light":"dark");

});


// Shortcut

document.addEventListener("keydown",(e)=>{

if((e.ctrlKey||e.metaKey)&&e.shiftKey&&e.key==="D"){

document.getElementById("themeToggle")?.click();

}

});