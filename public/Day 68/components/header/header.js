export async function loadHeader() {
  const res = await fetch("./components/header/header.html");
  document.getElementById("header").innerHTML = await res.text();
  attachMenu();
}

function attachMenu() {
  const btn = document.getElementById("menuBtn");
  const menu = document.getElementById("menu");

  btn.onclick = e => {
    e.stopPropagation();
    menu.classList.toggle("hidden");
  };

  document.onclick = () => menu.classList.add("hidden");
}
