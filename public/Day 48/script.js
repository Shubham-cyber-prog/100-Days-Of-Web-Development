function openTab(id, el){
  document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  document.querySelectorAll("nav li").forEach(l=>l.classList.remove("active"));
  el.classList.add("active");
}

/* DARK MODE */
themeToggle.onclick=()=>{
  document.body.classList.toggle("dark");
  localStorage.setItem("theme",
    document.body.classList.contains("dark")?"dark":"light");
};
if(localStorage.getItem("theme")==="dark"){
  document.body.classList.add("dark");
}

/* DATA */
const flights=[
  {id:1,from:"Mumbai",to:"Delhi",time:"08:30 AM",price:4200},
  {id:2,from:"Mumbai",to:"Bangalore",time:"10:15 AM",price:5200},
  {id:3,from:"Delhi",to:"Kolkata",time:"01:00 PM",price:4800},
  {id:4,from:"Pune",to:"Goa",time:"03:45 PM",price:3500},
  {id:5,from:"Hyderabad",to:"Chennai",time:"06:30 PM",price:4000}
];

let bookings=JSON.parse(localStorage.getItem("bookings"))||[];
const flightList=document.getElementById("flightList");
const bookingList=document.getElementById("bookings");

searchForm.onsubmit=e=>{
  e.preventDefault();
  renderFlights();
};

function renderFlights(){
  flightList.innerHTML="";
  flights.forEach(f=>{
    flightList.innerHTML+=`
      <div class="flight">
        <div><b>${f.from} → ${f.to}</b><br><small>${f.time}</small></div>
        <div>
          <div class="price">₹${f.price}</div>
          <button class="book" onclick="bookFlight(${f.id})">Book</button>
        </div>
      </div>`;
  });
}

function bookFlight(id){
  const f=flights.find(x=>x.id===id);
  bookings.push({
    ticketId:"FL-"+Math.floor(100000+Math.random()*900000),
    ...f,
    date:date.value,
    class:travelClass.value
  });
  localStorage.setItem("bookings",JSON.stringify(bookings));
  renderBookings();
  modal.style.display="flex";
}

function renderBookings(){
  bookingList.innerHTML=bookings.length?"":"<p>No bookings yet</p>";
  bookings.forEach((b,i)=>{
    bookingList.innerHTML+=`
      <div class="booking">
        <b>${b.from} → ${b.to}</b><br>
        Ticket ID: <b>${b.ticketId}</b><br>
        ${b.date} • ${b.time}<br>
        Class: ${b.class} • ₹${b.price}
        <div class="actions">
          <button class="pdf" onclick="downloadTicket(${i})">
            <i class="fa-solid fa-file-pdf"></i> PDF
          </button>
          <button class="delete" onclick="deleteBooking(${i})">
            <i class="fa-solid fa-trash"></i> Delete
          </button>
        </div>
      </div>`;
  });
}

function deleteBooking(i){
  bookings.splice(i,1);
  localStorage.setItem("bookings",JSON.stringify(bookings));
  renderBookings();
}

function downloadTicket(i){
  const b=bookings[i];
  ticketInfo.innerHTML=`
    <b>Ticket ID:</b> ${b.ticketId}<br><br>
    <b>Route:</b> ${b.from} → ${b.to}<br>
    <b>Date:</b> ${b.date}<br>
    <b>Time:</b> ${b.time}<br>
    <b>Class:</b> ${b.class}<br>
    <b>Price:</b> ₹${b.price}`;
  ticket.style.display="block";
}

function closeModal(){
  modal.style.display="none";
}

renderBookings();
