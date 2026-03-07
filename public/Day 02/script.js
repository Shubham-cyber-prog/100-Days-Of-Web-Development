// Mobile Menu Toggle
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
  if (slides[i]) {
    slides[i].classList.add("active");
  }
}

// Next button
const nextBtn = document.getElementById("next");
if (nextBtn) {
  nextBtn.onclick = () => {
    index = (index + 1) % slides.length;
    showSlide(index);
  };
}

// Previous button
const prevBtn = document.getElementById("prev");
if (prevBtn) {
  prevBtn.onclick = () => {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  };
}

// Auto Slide
if (slides.length > 0) {
  setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
  }, 4000);
}


// Scroll To Top Button
const scrollBtn = document.getElementById("scrollTop");

if (scrollBtn) {

  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 200 ? "block" : "none";
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

}