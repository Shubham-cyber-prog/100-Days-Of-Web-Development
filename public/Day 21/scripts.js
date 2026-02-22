let cards = JSON.parse(localStorage.getItem('cards')) || [
  { q: 'HTML stands for?', a: 'HyperText Markup Language' },
  { q: 'CSS is used for?', a: 'Styling web pages' },
  { q: 'JS stands for?', a: 'JavaScript' }
];

let index = 0;
const cardEl = document.getElementById('card');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const addBtn = document.getElementById('addCard');
const qInput = document.getElementById('question');
const aInput = document.getElementById('answer');

function renderCard(animationClass = 'popin') {
  if (cards.length === 0) {
    cardEl.innerHTML = '<div class="front">No cards available</div>';
    cardEl.className = 'card show';
    return;
  }

  const card = cards[index];
  cardEl.innerHTML = `<div class="front">${card.q}</div><div class="back">${card.a}</div>`;
  cardEl.className = `card show ${animationClass}`;

  setTimeout(() => { cardEl.classList.remove(animationClass); }, 400);
}

cardEl.addEventListener('click', () => {
  cardEl.classList.toggle('flip');
});

nextBtn.addEventListener('click', () => {
  index = (index + 1) % cards.length;
  renderCard('slide-in-right');
});

prevBtn.addEventListener('click', () => {
  index = (index - 1 + cards.length) % cards.length;
  renderCard('slide-in-left');
});

addBtn.addEventListener('click', () => {
  const q = qInput.value.trim();
  const a = aInput.value.trim();

  if (!q || !a) {
    shakeAddBox();
    return;
  }

  cards.push({ q, a });
  localStorage.setItem('cards', JSON.stringify(cards));
  qInput.value = '';
  aInput.value = '';
  index = cards.length - 1;
  renderCard('popin');
});

function shakeAddBox() {
  const addBox = document.querySelector('.add');
  addBox.style.transform = 'translateX(-10px)';
  setTimeout(() => { addBox.style.transform = 'translateX(10px)'; }, 100);
  setTimeout(() => { addBox.style.transform = 'translateX(0)'; }, 200);
}

renderCard('popin');
