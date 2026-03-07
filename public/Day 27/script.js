const dice = document.getElementById("dice")
const rollBtn = document.getElementById("rollBtn")
const resetBtn = document.getElementById("resetBtn")

const result = document.getElementById("result")
const counter = document.getElementById("counter")

const themeToggle = document.getElementById("themeToggle")

let rolls = 0

rollBtn.onclick = rollDice
resetBtn.onclick = resetDice


function rollDice(){

const num = Math.floor(Math.random()*6)+1

dice.classList.add("roll")

setTimeout(()=>{

showDots(num)

dice.classList.remove("roll")

result.innerText = "You rolled "+num

rolls++

counter.innerText = "Total Rolls : "+rolls

},400)

}


function showDots(num){

document.querySelectorAll(".dot").forEach(d=>d.style.opacity=0)

if(num===1){

document.querySelector(".one").style.opacity=1

}

if(num===2){

document.querySelector(".two").style.opacity=1
document.querySelector(".three").style.opacity=1

}

if(num===3){

document.querySelector(".two").style.opacity=1
document.querySelector(".one").style.opacity=1
document.querySelector(".three").style.opacity=1

}

if(num===4){

document.querySelector(".two").style.opacity=1
document.querySelector(".four").style.opacity=1
document.querySelector(".five").style.opacity=1
document.querySelector(".three").style.opacity=1

}

if(num===5){

document.querySelector(".two").style.opacity=1
document.querySelector(".four").style.opacity=1
document.querySelector(".five").style.opacity=1
document.querySelector(".three").style.opacity=1
document.querySelector(".one").style.opacity=1

}

if(num===6){

document.querySelector(".two").style.opacity=1
document.querySelector(".four").style.opacity=1
document.querySelector(".six").style.opacity=1
document.querySelector(".one").style.opacity=1
document.querySelector(".five").style.opacity=1
document.querySelector(".three").style.opacity=1

}

}


function resetDice(){

rolls=0

counter.innerText="Total Rolls : 0"

result.innerText="Roll the dice"

document.querySelectorAll(".dot").forEach(d=>d.style.opacity=0)

}


/* theme */

themeToggle.onclick=()=>{

document.body.classList.toggle("light")

}