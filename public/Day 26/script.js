const gallery = document.getElementById("gallery");
const imageUrlInput = document.getElementById("imageUrl");
const addImageBtn = document.getElementById("addImageBtn");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.getElementById("close");

/* LOAD SAVED IMAGES */
let images = JSON.parse(localStorage.getItem("galleryImages")) || [
  "https://picsum.photos/400/300?1",
  "https://picsum.photos/400/300?2",
  "https://picsum.photos/400/300?3",
  "https://picsum.photos/400/300?4"
];

function renderGallery() {
  gallery.innerHTML = "";
  images.forEach(src => {
    const img = document.createElement("img");
    img.src = src;

    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = src;
    });

    gallery.appendChild(img);
  });
}

renderGallery();

/* ADD IMAGE */
addImageBtn.addEventListener("click", () => {
  const url = imageUrlInput.value.trim();

  if (!url) {
    alert("Please enter an image URL");
    return;
  }

  images.push(url);
  localStorage.setItem("galleryImages", JSON.stringify(images));
  imageUrlInput.value = "";
  renderGallery();
});

/* CLOSE LIGHTBOX */
closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

lightbox.addEventListener("click", e => {
  if (e.target !== lightboxImg) {
    lightbox.style.display = "none";
  }
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    lightbox.style.display = "none";
  }
});
