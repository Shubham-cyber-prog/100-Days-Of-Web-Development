/* =========================
   AUDIO
========================= */
const bgMusic = new Audio("assets/audio/bg-music.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.4;

const clickSound = new Audio("assets/audio/click.mp3");
const endSound = new Audio("assets/audio/end.mp3");

let soundEnabled = true;

/* =========================
   BACKGROUND HANDLER
========================= */
const bg = document.getElementById("background");

function setBackground(image) {
  bg.style.opacity = 0;
  setTimeout(() => {
    bg.style.backgroundImage = `url('${image}')`;
    bg.style.opacity = 1;
  }, 300);
}

/* =========================
   STORY DATA
========================= */
const story = {
  start: "intro",
  scenes: {
    intro: {
      bg: "assets/images/intro.jpg",
      text: "You wake up in a quiet village just before sunrise.\nThe road ahead splits into two paths.",
      choices: [
        { text: "Walk toward the forest", next: "forest" },
        { text: "Head to the village market", next: "market" }
      ]
    },
    forest: {
      bg: "assets/images/forest.jpg",
      text: "The forest is dark and silent.\nYou hear footsteps behind you.",
      choices: [
        { text: "Turn around", next: "stranger" },
        { text: "Run deeper into the forest", next: "lost" }
      ]
    },
    market: {
      bg: "assets/images/market.jpg",
      text: "The market is empty.\nA single shop is open.",
      choices: [
        { text: "Enter the shop", next: "shop" },
        { text: "Leave the village", next: "road_end" }
      ]
    },
    stranger: {
      bg: "assets/images/ending.jpg",
      text: "A stranger greets you warmly.\nYou are safe.\n\nTHE END.",
      ending: true
    },
    lost: {
      bg: "assets/images/ending.jpg",
      text: "You lose your way forever.\n\nTHE END.",
      ending: true
    },
    shop: {
      bg: "assets/images/ending.jpg",
      text: "You find supplies and a map.\nA new journey begins.\n\nTHE END.",
      ending: true
    },
    road_end: {
      bg: "assets/images/ending.jpg",
      text: "You walk away, never knowing.\n\nTHE END.",
      ending: true
    }
  }
};

/* =========================
   DOM
========================= */
const storyText = document.getElementById("story-text");
const choicesContainer = document.getElementById("choices");
const restartBtn = document.getElementById("restartBtn");
const muteBtn = document.getElementById("muteBtn");

/* =========================
   TYPEWRITER
========================= */
let typingInterval;

function typeText(text, callback) {
  clearInterval(typingInterval);
  storyText.textContent = "";
  let i = 0;

  typingInterval = setInterval(() => {
    storyText.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(typingInterval);
      callback && callback();
    }
  }, 30);
}

/* =========================
   RENDER
========================= */
function renderScene(id) {
  const scene = story.scenes[id];
  choicesContainer.innerHTML = "";
  restartBtn.classList.add("hidden");

  setBackground(scene.bg);

  typeText(scene.text, () => {
    if (scene.ending) {
      if (soundEnabled) endSound.play();
      restartBtn.classList.remove("hidden");
      return;
    }

    scene.choices.forEach(choice => {
      const btn = document.createElement("button");
      btn.textContent = choice.text;
      btn.onclick = () => {
        if (soundEnabled) clickSound.play();
        renderScene(choice.next);
      };
      choicesContainer.appendChild(btn);
    });
  });
}

/* =========================
   EVENTS
========================= */
restartBtn.onclick = () => renderScene(story.start);

muteBtn.onclick = () => {
  soundEnabled = !soundEnabled;
  muteBtn.textContent = soundEnabled ? "🔊" : "🔇";
  soundEnabled ? bgMusic.play() : bgMusic.pause();
};

document.body.addEventListener("click", () => {
  if (soundEnabled && bgMusic.paused) bgMusic.play();
}, { once: true });

/* =========================
   INIT
========================= */
renderScene(story.start);
