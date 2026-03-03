let cards = JSON.parse(localStorage.getItem('cards')) || [
  { q: 'HTML stands for?', a: 'HyperText Markup Language' },
  { q: 'CSS is used for?', a: 'Styling web pages' },
  { q: 'JS stands for?', a: 'JavaScript' }
];

let index = 0;

const card = document.getElementById('card');
const inner = document.getElementById('inner');
const counter = document.getElementById('counter');

const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const addBtn = document.getElementById('addCard');
const deleteBtn = document.getElementById('deleteCard');
const clearBtn = document.getElementById('clearAll');

const qInput = document.getElementById('question');
const aInput = document.getElementById('answer');

function saveToLocal() {
  localStorage.setItem('cards', JSON.stringify(cards));
}

function renderCard() {
  card.classList.remove('flip');

  if (cards.length === 0) {
    inner.innerHTML = `
      <div class="front">No cards available 😔</div>
      <div class="back"></div>
    `;
    counter.textContent = "";
    return;
  }

  const current = cards[index];

  inner.innerHTML = `
    <div class="front">${current.q}</div>
    <div class="back">${current.a}</div>
  `;

  counter.textContent = `${index + 1} / ${cards.length}`;
}

card.addEventListener('click', () => {
  if (cards.length === 0) return;
  card.classList.toggle('flip');
});

nextBtn.addEventListener('click', () => {
  if (cards.length === 0) return;
  index = (index + 1) % cards.length;
  renderCard();
});

prevBtn.addEventListener('click', () => {
  if (cards.length === 0) return;
  index = (index - 1 + cards.length) % cards.length;
  renderCard();
});

addBtn.addEventListener('click', () => {
  const q = qInput.value.trim();
  const a = aInput.value.trim();

  if (!q || !a) {
    alert("Please enter both fields");
    return;
  }

  cards.push({ q, a });
  saveToLocal();

  qInput.value = "";
  aInput.value = "";

  index = cards.length - 1;
  renderCard();
});

deleteBtn.addEventListener('click', () => {
  if (cards.length === 0) return;

  cards.splice(index, 1);
  if (index > 0) index--;

  saveToLocal();
  renderCard();
});

clearBtn.addEventListener('click', () => {
  if (!confirm("Delete all cards?")) return;
  cards = [];
  saveToLocal();
  renderCard();
});

/* Keyboard Support */
document.addEventListener('keydown', (e) => {
  if (e.key === "ArrowRight") nextBtn.click();
  if (e.key === "ArrowLeft") prevBtn.click();
  if (e.key === " ") card.click();
});

renderCard();