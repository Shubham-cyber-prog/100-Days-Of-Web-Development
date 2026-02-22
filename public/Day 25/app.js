let quotes = JSON.parse(localStorage.getItem("themeQuotes")) || [

    // MOTIVATION
    {quote:"Discipline beats motivation.", author:"Unknown", theme:"motivation"},
    {quote:"Push yourself, because no one else will do it for you.", author:"Unknown", theme:"motivation"},
    {quote:"Success starts with self-belief.", author:"Unknown", theme:"motivation"},
    {quote:"Small progress is still progress.", author:"Unknown", theme:"motivation"},
    {quote:"Your only limit is your mindset.", author:"Unknown", theme:"motivation"},
    {quote:"Hard days build strong people.", author:"Unknown", theme:"motivation"},
    {quote:"Don’t stop until you’re proud.", author:"Unknown", theme:"motivation"},

    // LIFE
    {quote:"Life rewards courage.", author:"Unknown", theme:"life"},
    {quote:"Peace begins when expectations end.", author:"Buddha", theme:"life"},
    {quote:"Happiness depends upon ourselves.", author:"Aristotle", theme:"life"},
    {quote:"Live less out of habit and more out of intent.", author:"Unknown", theme:"life"},
    {quote:"The meaning of life is to give life meaning.", author:"Unknown", theme:"life"},
    {quote:"Life becomes easier when you learn to accept.", author:"Unknown", theme:"life"},
    {quote:"What you think, you become.", author:"Buddha", theme:"life"},

    // SUCCESS
    {quote:"Success is consistency.", author:"Robin Sharma", theme:"success"},
    {quote:"Success is built daily, not overnight.", author:"Unknown", theme:"success"},
    {quote:"Dream big. Start small. Act now.", author:"Robin Sharma", theme:"success"},
    {quote:"Work in silence. Let results make noise.", author:"Unknown", theme:"success"},
    {quote:"Failure is not opposite of success; it’s part of success.", author:"Arianna Huffington", theme:"success"},
    {quote:"Focus on goals, not obstacles.", author:"Unknown", theme:"success"},
    {quote:"Success begins outside your comfort zone.", author:"Unknown", theme:"success"},

    // STUDY
    {quote:"Study now, shine later.", author:"Unknown", theme:"study"},
    {quote:"Learning never exhausts the mind.", author:"Leonardo da Vinci", theme:"study"},
    {quote:"The expert in anything was once a beginner.", author:"Helen Hayes", theme:"study"},
    {quote:"Don’t watch the clock; do what it does. Keep going.", author:"Sam Levenson", theme:"study"},
    {quote:"Education is the passport to the future.", author:"Malcolm X", theme:"study"},
    {quote:"Your future is created by what you do today.", author:"Unknown", theme:"study"},
    {quote:"Success in exams comes from daily effort.", author:"Unknown", theme:"study"},

    // LOVE
    {quote:"Love grows with effort.", author:"Unknown", theme:"love"},
    {quote:"Where there is love, there is life.", author:"Mahatma Gandhi", theme:"love"},
    {quote:"Love is friendship set on fire.", author:"Jeremy Taylor", theme:"love"},
    {quote:"To love deeply is to live fully.", author:"Unknown", theme:"love"},
    {quote:"Real love feels safe, not stressful.", author:"Unknown", theme:"love"},
    {quote:"Love is built on trust and patience.", author:"Unknown", theme:"love"},
    {quote:"The best thing to hold onto in life is each other.", author:"Audrey Hepburn", theme:"love"}
];



const addBtn = document.getElementById("addBtn");
const searchBtn = document.getElementById("searchBtn");
const modal = document.getElementById("modal");
const modalQuotes = document.getElementById("modalQuotes");
const closeModal = document.getElementById("closeModal");


addBtn.addEventListener("click", () => {

    const text = document.getElementById("newQuote").value.trim();
    const author = document.getElementById("newAuthor").value.trim();
    const theme = document.getElementById("newTheme").value;

    if(!text || !author || !theme){
        alert("Fill all fields");
        return;
    }

    quotes.push({quote:text, author:author, theme:theme});
    localStorage.setItem("themeQuotes", JSON.stringify(quotes));

    document.getElementById("newQuote").value="";
    document.getElementById("newAuthor").value="";
    document.getElementById("newTheme").value="";

    alert("Quote Added!");
});


searchBtn.addEventListener("click", () => {

    const theme = document.getElementById("searchTheme").value;

    if(!theme){
        alert("Select a theme");
        return;
    }

    modalQuotes.innerHTML="";
    const filtered = quotes.filter(q => q.theme === theme);

    if(filtered.length === 0){
        modalQuotes.innerHTML="<p>No quotes found.</p>";
    }

    filtered.forEach(q => {
        const div = document.createElement("div");
        div.classList.add("quote-card");

        div.innerHTML = `
            <p>"${q.quote}"</p>
            <small>— ${q.author}</small><br>
            <button class="copy-btn">Copy</button>
        `;

        div.querySelector(".copy-btn").addEventListener("click", () => {
            navigator.clipboard.writeText(`"${q.quote}" — ${q.author}`);
            alert("Copied to clipboard!");
        });

        modalQuotes.appendChild(div);
    });

    modal.style.display="flex";
});


closeModal.addEventListener("click", () => {
    modal.style.display="none";
});

modal.addEventListener("click", (e) => {
    if(e.target === modal){
        modal.style.display="none";
    }
});