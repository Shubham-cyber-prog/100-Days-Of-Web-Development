let quotes = [
    {
        quote: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt"
    },
    {
        quote: "The future belongs to those who prepare for it today.",
        author: "Malcolm X"
    },
    {
        quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill"
    },
    {
        quote: "Do what you can, with what you have, where you are.",
        author: "Theodore Roosevelt"
    },
    {
        quote: "It always seems impossible until it’s done.",
        author: "Nelson Mandela"
    },
    {
        quote: "Don’t let yesterday take up too much of today.",
        author: "Will Rogers"
    },
    {
        quote: "Your time is limited, so don’t waste it living someone else’s life.",
        author: "Steve Jobs"
    },
    {
        quote: "First, solve the problem. Then, write the code.",
        author: "John Johnson"
    },
    {
        quote: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        author: "Martin Fowler"
    },
    {
        quote: "Simplicity is the soul of efficiency.",
        author: "Austin Freeman"
    },
    {
        quote: "Learning never exhausts the mind.",
        author: "Leonardo da Vinci"
    },
    {
        quote: "Small progress is still progress.",
        author: "Unknown"
    },
    {
        quote: "The best error message is the one that never shows up.",
        author: "Thomas Fuchs"
    },
    {
        quote: "Dream big. Start small. Act now.",
        author: "Robin Sharma"
    },
    {
        quote: "Consistency beats motivation.",
        author: "Unknown"
    }
];

// ---------------- LOAD SAVED QUOTES ----------------
const savedQuotes = JSON.parse(localStorage.getItem("quotes"));
if (savedQuotes && Array.isArray(savedQuotes)) {
    quotes.push(...savedQuotes);
}

// ---------------- ELEMENTS ----------------
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const btn = document.getElementById("btn");

const userQuote = document.getElementById("userQuote");
const userAuthor = document.getElementById("userAuthor");
const addBtn = document.getElementById("addBtn");

// ---------------- RANDOM QUOTE ----------------
btn.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);

    quoteText.textContent = `"${quotes[randomIndex].quote}"`;
    authorText.textContent = `— ${quotes[randomIndex].author}`;
});

// ---------------- ADD USER QUOTE + SHOW IT ----------------
addBtn.addEventListener("click", () => {
    const q = userQuote.value.trim();
    const a = userAuthor.value.trim();

    if (!q || !a) return;

    const newQuote = { quote: q, author: a };

    quotes.push(newQuote);

    // Save to localStorage
    const stored = JSON.parse(localStorage.getItem("quotes")) || [];
    stored.push(newQuote);
    localStorage.setItem("quotes", JSON.stringify(stored));

    // 👇 Immediately display the added quote
    quoteText.textContent = `"${q}"`;
    authorText.textContent = `— ${a}`;

    userQuote.value = "";
    userAuthor.value = "";
});
