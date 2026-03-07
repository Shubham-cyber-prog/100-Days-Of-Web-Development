let currentMood = "hustle";

const quote = document.getElementById("quote");
const author = document.getElementById("author");

const quotes = {

hustle:[
{text:"Success usually comes to those who are too busy to be looking for it.",author:"Henry David Thoreau"},
{text:"Don’t watch the clock; do what it does. Keep going.",author:"Sam Levenson"},
{text:"Opportunities don't happen. You create them.",author:"Chris Grosser"},
{text:"The secret of getting ahead is getting started.",author:"Mark Twain"},
{text:"Dream big and dare to fail.",author:"Norman Vaughan"},
{text:"Success is walking from failure to failure with no loss of enthusiasm.",author:"Winston Churchill"},
{text:"Hard work beats talent when talent doesn’t work hard.",author:"Tim Notke"},
{text:"Success is not final; failure is not fatal.",author:"Winston Churchill"},
{text:"Push yourself because no one else will do it for you.",author:"Unknown"},
{text:"The harder you work, the luckier you get.",author:"Gary Player"},
{text:"Work hard in silence. Let success make the noise.",author:"Frank Ocean"},
{text:"Don’t stop until you’re proud.",author:"Unknown"},
{text:"Small progress is still progress.",author:"Unknown"}
],

calm:[
{text:"Peace comes from within. Do not seek it without.",author:"Buddha"},
{text:"The quieter you become, the more you can hear.",author:"Rumi"},
{text:"Calm mind brings inner strength.",author:"Dalai Lama"},
{text:"Nature does not hurry, yet everything is accomplished.",author:"Lao Tzu"},
{text:"Within you, there is a stillness.",author:"Hermann Hesse"},
{text:"Slow down and everything you chase will come.",author:"John De Paola"},
{text:"Breath is the power behind all things.",author:"Tao Porchon-Lynch"},
{text:"Serenity is not freedom from storm.",author:"Unknown"},
{text:"Stillness is where creativity is born.",author:"Eckhart Tolle"},
{text:"Peace begins with a smile.",author:"Mother Teresa"}
],

creative:[
{text:"Creativity takes courage.",author:"Henri Matisse"},
{text:"Everything you can imagine is real.",author:"Pablo Picasso"},
{text:"Creativity is intelligence having fun.",author:"Albert Einstein"},
{text:"Art is not what you see but what you make others see.",author:"Edgar Degas"},
{text:"You can’t use up creativity.",author:"Maya Angelou"},
{text:"Creativity involves breaking patterns.",author:"Edward de Bono"},
{text:"Imagination is the beginning of creation.",author:"George Bernard Shaw"},
{text:"Every artist was first an amateur.",author:"Ralph Waldo Emerson"},
{text:"To live a creative life we must lose fear of being wrong.",author:"Joseph Pearce"},
{text:"Creativity flows when curiosity grows.",author:"Unknown"}
],

stoic:[
{text:"You have power over your mind.",author:"Marcus Aurelius"},
{text:"We suffer more in imagination than reality.",author:"Seneca"},
{text:"It is not what happens but how you react.",author:"Epictetus"},
{text:"Luck is what happens when preparation meets opportunity.",author:"Seneca"},
{text:"Waste no time arguing what a good man should be.",author:"Marcus Aurelius"},
{text:"Difficulties strengthen the mind.",author:"Seneca"},
{text:"Man conquers the world by conquering himself.",author:"Zeno"},
{text:"The obstacle is the way.",author:"Marcus Aurelius"},
{text:"He who fears death will never do anything worth doing.",author:"Seneca"},
{text:"External things are not the problem.",author:"Marcus Aurelius"}
]

};



/* ---------- CATEGORY BUTTONS ---------- */

document.querySelectorAll(".mood-btn").forEach(btn => {

btn.addEventListener("click",()=>{

document.querySelectorAll(".mood-btn").forEach(b=>b.classList.remove("active"));

btn.classList.add("active");

currentMood = btn.dataset.mood;

generateQuote();

});

});


/* ---------- GENERATE QUOTE ---------- */

function generateQuote(){

const moodQuotes = quotes[currentMood];

const random = moodQuotes[Math.floor(Math.random()*moodQuotes.length)];

quote.textContent = random.text;

author.textContent = "— " + random.author;

}


/* ---------- GENERATE BUTTON ---------- */

document.getElementById("generateBtn").addEventListener("click",generateQuote);


/* ---------- COPY BUTTON ---------- */

document.getElementById("copyBtn").addEventListener("click",()=>{

const text = `"${quote.textContent}" ${author.textContent}`;

navigator.clipboard.writeText(text);

alert("Quote copied!");

});


/* ---------- TWITTER SHARE ---------- */

document.getElementById("twitterBtn").addEventListener("click",()=>{

const text = encodeURIComponent(`"${quote.textContent}" ${author.textContent}`);

window.open(`https://twitter.com/intent/tweet?text=${text}`);

});


/* ---------- INITIAL LOAD ---------- */

window.onload = generateQuote;