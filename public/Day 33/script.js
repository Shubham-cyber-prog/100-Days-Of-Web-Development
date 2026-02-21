// const properties=[
//   {title:"Modern Villa",price:"₹1.2 Cr",img:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c"},
//   {title:"Luxury Apartment",price:"₹85 Lakh",img:"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"},
//   {title:"Beach House",price:"₹2.4 Cr",img:"https://images.unsplash.com/photo-1507089947368-19c1da9775ae"},
//   {title:"Urban Duplex",price:"₹95 Lakh",img:"https://images.unsplash.com/photo-1493809842364-78817add7ffb"}
// ]

const properties=[
  {title:"Modern Villa",price:"₹1.2 Cr",location:"Mumbai",rating:4.8,img:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c"},
  {title:"Luxury Apartment",price:"₹85 Lakh",location:"Pune",rating:4.5,img:"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"},
  {title:"Beach House",price:"₹2.4 Cr",location:"Goa",rating:4.9,img:"https://images.unsplash.com/photo-1507089947368-19c1da9775ae"},
  {title:"Urban Duplex",price:"₹95 Lakh",location:"Bangalore",rating:4.6,img:"https://images.unsplash.com/photo-1493809842364-78817add7ffb"}
]

const container=document.getElementById('propertyContainer')

// properties.forEach(p=>{
//   const card=document.createElement('div')
//   card.className='card'
//   card.innerHTML=`<img src="${p.img}"><div class="info"><h3>${p.title}</h3><p class="price">${p.price}</p></div>`
//   container.appendChild(card)
// })

function renderCard(p){
  const card=document.createElement('div');
  card.className='card';

  card.innerHTML=`
    <img src="${p.img}">
    <div class="info">
      <h3>${p.title}</h3>
      <p class="price">${p.price}</p>
      <p>📍 ${p.location}</p>
      <p>⭐ ${p.rating}</p>
      <button class="save-btn">❤️ Save</button>
      <button class="details-btn">View Details</button>
    </div>`;

  container.appendChild(card);
}


properties.forEach(renderCard);

// Wishlist
container.addEventListener("click", e=>{
  if(e.target.classList.contains("save-btn")){
    e.target.textContent="✔ Saved";
    e.target.style.background="green";
  }
});

// Search filter
document.getElementById("searchInput").addEventListener("input", e=>{
  const value=e.target.value.toLowerCase();
  container.innerHTML="";

  properties
    .filter(p=>p.title.toLowerCase().includes(value) || p.location.toLowerCase().includes(value))
    .forEach(renderCard);
});
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});


// Theme toggle
const themeBtn=document.getElementById("themeBtn");

themeBtn.addEventListener("click",()=>{
  document.body.classList.toggle("light");
});


// Details popup
container.addEventListener("click", e=>{
  if(e.target.classList.contains("details-btn")){
    const card=e.target.closest(".card");
    document.getElementById("modalTitle").textContent=
      card.querySelector("h3").textContent;

    document.getElementById("modalPrice").textContent=
      card.querySelector(".price").textContent;

    document.getElementById("modal").style.display="flex";
  }
});

function closeModal(){
  document.getElementById("modal").style.display="none";
}

// Mobile menu
document.getElementById("menuBtn").onclick=()=>{
  document.querySelector("nav").classList.toggle("show");
};