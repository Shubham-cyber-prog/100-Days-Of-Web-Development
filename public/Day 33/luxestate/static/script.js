const properties=[
  {title:"Modern Villa",price:"₹1.2 Cr",img:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c"},
  {title:"Luxury Apartment",price:"₹85 Lakh",img:"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"},
  {title:"Beach House",price:"₹2.4 Cr",img:"https://images.unsplash.com/photo-1507089947368-19c1da9775ae"},
  {title:"Urban Duplex",price:"₹95 Lakh",img:"https://images.unsplash.com/photo-1493809842364-78817add7ffb"}
]

const container=document.getElementById('propertyContainer')

properties.forEach(p=>{
  const card=document.createElement('div')
  card.className='card'
  card.innerHTML=`<img src="${p.img}"><div class="info"><h3>${p.title}</h3><p class="price">${p.price}</p></div>`
  container.appendChild(card)
})

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
