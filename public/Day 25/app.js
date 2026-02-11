
/* ======================
   QUOTE DATA
====================== */

const quotes = {

    motivation: [
        { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
        { quote: "Dream big. Start small. Act now.", author: "Robin Sharma" },
        { quote: "Consistency beats motivation.", author: "Unknown" }
    ],

    life: [
        { quote: "Life is what happens when you're busy making plans.", author: "John Lennon" },
        { quote: "Live in the moment.", author: "Unknown" },
        { quote: "Enjoy the little things.", author: "Unknown" }
    ],

    success: [
        { quote: "Success is not final, failure is not fatal.", author: "Winston Churchill" },
        { quote: "Work hard in silence.", author: "Unknown" },
        { quote: "Push yourself, no one else will.", author: "Unknown" }
    ],

    study: [
        { quote: "First, solve the problem. Then, write the code.", author: "John Johnson" },
        { quote: "Learning never exhausts the mind.", author: "Leonardo da Vinci" },
        { quote: "Study now, shine later.", author: "Unknown" }
    ],

    love: [
        { quote: "Love all, trust a few.", author: "William Shakespeare" },
        { quote: "Where there is love, there is life.", author: "Gandhi" },
        { quote: "Love is friendship on fire.", author: "Unknown" }
    ]

};


/* ======================
   ELEMENTS
====================== */

const categoryBox = document.getElementById("categoryBox");
const quoteBox = document.getElementById("quoteBox");

const categorySelect = document.getElementById("categorySelect");
const saveBtn = document.getElementById("saveCategory");

const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");

const nextBtn = document.getElementById("nextBtn");
const changeBtn = document.getElementById("changeBtn");


/* ======================
   LOAD SAVED CATEGORY
====================== */

const savedCategory = localStorage.getItem("quoteCategory");

if (savedCategory) {
    showQuotes(savedCategory);
}


/* ======================
   SAVE CATEGORY
====================== */

saveBtn.addEventListener("click", () => {

    const category = categorySelect.value;

    if (category === "") {
        alert("Please select a category");
        return;
    }

    localStorage.setItem("quoteCategory", category);

    showQuotes(category);

});


/* ======================
   SHOW QUOTES
====================== */

function showQuotes(category) {

    categoryBox.classList.add("hidden");
    quoteBox.classList.remove("hidden");

    generateQuote(category);
}


/* ======================
   GENERATE QUOTE
====================== */

function generateQuote(category) {

    const list = quotes[category];

    const random = Math.floor(Math.random() * list.length);

    quoteText.textContent = `"${list[random].quote}"`;
    authorText.textContent = `— ${list[random].author}`;

}


/* ======================
   NEXT BUTTON
====================== */

nextBtn.addEventListener("click", () => {

    const category = localStorage.getItem("quoteCategory");

    generateQuote(category);

});


/* ======================
   CHANGE CATEGORY
====================== */

changeBtn.addEventListener("click", () => {

    localStorage.removeItem("quoteCategory");

    quoteBox.classList.add("hidden");
    categoryBox.classList.remove("hidden");

});
