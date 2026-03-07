
let cart=0

function addCart(){

cart++

document.getElementById("cartCount").innerText=cart

}


/* PAGE SWITCHING */

function showPage(page){

document.querySelectorAll(".page").forEach(p=>{
p.classList.remove("active")
})

document.getElementById(page).classList.add("active")

}