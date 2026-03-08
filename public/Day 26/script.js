const gallery=document.getElementById("gallery")

const searchInput=document.getElementById("searchInput")

const imageUrlInput=document.getElementById("imageUrl")

const imageCaptionInput=document.getElementById("imageCaption")

const imageCategoryInput=document.getElementById("imageCategory")

const addImageBtn=document.getElementById("addImageBtn")

const filterButtons=document.querySelectorAll(".filters button")

const lightbox=document.getElementById("lightbox")

const lightboxImg=document.getElementById("lightbox-img")

const lightboxCaption=document.getElementById("lightbox-caption")

const closeBtn=document.getElementById("close")


let images=JSON.parse(localStorage.getItem("galleryImages")) || [

{src:"https://picsum.photos/400/300?1",caption:"Forest",category:"nature"},
{src:"https://picsum.photos/400/300?2",caption:"Mountain",category:"nature"},
{src:"https://picsum.photos/400/300?3",caption:"Dog",category:"animals"},
{src:"https://picsum.photos/400/300?4",caption:"Cat",category:"animals"},
{src:"https://picsum.photos/400/300?5",caption:"Pizza",category:"food"},
{src:"https://picsum.photos/400/300?6",caption:"Burger",category:"food"},
{src:"https://picsum.photos/400/300?7",caption:"Beach",category:"travel"},
{src:"https://picsum.photos/400/300?8",caption:"City",category:"travel"}

]

let currentFilter="all"


function renderGallery(){

gallery.innerHTML=""

let search=searchInput.value.toLowerCase()

images

.filter(img=>currentFilter==="all" || img.category===currentFilter)

.filter(img=>img.caption.toLowerCase().includes(search))

.forEach(img=>{

const card=document.createElement("div")

card.className="image-card"

card.innerHTML=`

<img src="${img.src}">

<div class="overlay">${img.caption}</div>

`

card.addEventListener("click",()=>{

lightbox.style.display="flex"

lightboxImg.src=img.src

lightboxCaption.textContent=img.caption

})

gallery.appendChild(card)

})

}


renderGallery()


/* ADD IMAGE */

addImageBtn.addEventListener("click",()=>{

const url=imageUrlInput.value.trim()

const caption=imageCaptionInput.value.trim()

const category=imageCategoryInput.value

if(!url) return alert("Enter image URL")

images.push({

src:url,
caption:caption || "Untitled",
category

})

localStorage.setItem("galleryImages",JSON.stringify(images))

imageUrlInput.value=""
imageCaptionInput.value=""

renderGallery()

})


/* FILTER */

filterButtons.forEach(btn=>{

btn.addEventListener("click",()=>{

filterButtons.forEach(b=>b.classList.remove("active"))

btn.classList.add("active")

currentFilter=btn.dataset.category

renderGallery()

})

})


/* SEARCH */

searchInput.addEventListener("input",renderGallery)


/* LIGHTBOX */

closeBtn.addEventListener("click",()=>{

lightbox.style.display="none"

})

lightbox.addEventListener("click",(e)=>{

if(e.target!==lightboxImg){

lightbox.style.display="none"

}

})

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape"){

lightbox.style.display="none"

}

})