/* PAGE SWITCHING */

function showPage(page){

document.querySelectorAll(".page").forEach(p=>{
p.classList.remove("active")
})

document.getElementById(page).classList.add("active")

}

/* GAME SWITCH */

function openGame(id){

document.querySelectorAll(".game").forEach(g=>{
g.classList.remove("active")
})

document.getElementById(id).classList.add("active")

}