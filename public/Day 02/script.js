// Mobile Menu
const menuBtn = document.getElementById("mobileMenuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Mobile Menu Toggle (NovaFlow)
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// Mobile Menu Toggle (InnovateTech)
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navMenu = document.getElementById("navMenu");

if (mobileMenuBtn && navMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

// Testimonials Slider
const slides = document.querySelectorAll(".testimonial");
let index = 0;

function showSlide(i) {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[i].classList.add("active");
}

document.getElementById("next").onclick = () => {
  index = (index + 1) % slides.length;
  showSlide(index);
};

document.getElementById("prev").onclick = () => {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
};

// Auto Slide
setInterval(() => {
  index = (index + 1) % slides.length;
  showSlide(index);
}, 4000);

  if (slides[i]) slides[i].classList.add("active");
}

const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

if (nextBtn) {
  nextBtn.onclick = () => {
    index = (index + 1) % slides.length;
    showSlide(index);
  };
}

if (prevBtn) {
  prevBtn.onclick = () => {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  };
}

// Auto Slide (only if slides exist)
if (slides.length > 0) {
  setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
  }, 4000);
}

// Scroll To Top
const scrollBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 200 ? "block" : "none";
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});



const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (scrollBtn) {
  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 200 ? "block" : "none";
  });


  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
