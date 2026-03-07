const flights=[
{from:"London",to:"Dubai",price:450},
{from:"New York",to:"Singapore",price:850},
{from:"Paris",to:"Sydney",price:1200},
{from:"Tokyo",to:"Maldives",price:900}
]

let selectedSeat=null



function searchFlights(){

const container=document.getElementById("flight-results")

container.innerHTML=""

flights.forEach((f,i)=>{

container.innerHTML+=`

<div class="flight-card">

<div>

<b>${f.from} → ${f.to}</b><br>

Price: $${f.price}

</div>

<button onclick="selectFlight(${i})">Select</button>

</div>

`

})

}



function selectFlight(i){

document.getElementById("seat-section").classList.remove("hidden")

renderSeats()

}



function renderSeats(){

const seats=document.getElementById("seats")

seats.innerHTML=""

for(let i=1;i<=24;i++){

const seat=document.createElement("div")

seat.className="seat"

if(Math.random()<0.3){

seat.classList.add("occupied")

}else{

seat.onclick=()=>chooseSeat(seat,i)

}

seats.appendChild(seat)

}

}



function chooseSeat(el,id){

document.querySelectorAll(".seat.selected")
.forEach(s=>s.classList.remove("selected"))

el.classList.add("selected")

selectedSeat=id

}



function confirmSeat(){

if(!selectedSeat){

alert("Please select seat")

return

}

document.getElementById("seat-section").classList.add("hidden")

document.getElementById("confirmation").classList.remove("hidden")

}