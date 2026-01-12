/* CONFIG */
const API_KEY = "YOUR_FINNHUB_API_KEY";
const SYMBOLS = ["AAPL","GOOGL","TSLA","AMZN","MSFT"];
const BASE_BALANCE = 100000;

/* DARK MODE */
themeToggle.onclick=()=>{
  document.body.classList.toggle("dark");
  localStorage.setItem("theme",
    document.body.classList.contains("dark")?"dark":"light"
  );
};
if(localStorage.getItem("theme")==="dark"){
  document.body.classList.add("dark");
}

/* DATA */
let balance = BASE_BALANCE;
let portfolio = {};
let history = [];
let prices = {};

/* LOAD SAVED */
const saved = JSON.parse(localStorage.getItem("stockSim"));
if(saved){
  balance=saved.balance;
  portfolio=saved.portfolio;
  history=saved.history;
}

/* API FETCH */
async function fetchPrice(symbol){
  try{
    const res = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
    );
    const data = await res.json();
    if(data.c) return Math.round(data.c);
    throw "API error";
  }catch{
    return Math.floor(100 + Math.random()*300); // fallback
  }
}

/* LOAD MARKET */
async function loadMarket(){
  for(const s of SYMBOLS){
    prices[s] = await fetchPrice(s);
  }
  renderMarket();
  renderAll();
}

/* RENDER */
function renderMarket(){
  market.innerHTML="";
  SYMBOLS.forEach(s=>{
    market.innerHTML+=`
      <tr>
        <td>${s}</td>
        <td>₹${prices[s]}</td>
        <td>
          <button class="buy" onclick="buy('${s}')">Buy</button>
          <button class="sell" onclick="sell('${s}')">Sell</button>
        </td>
      </tr>`;
  });
}

function renderPortfolio(){
  let html="", value=0;
  for(const s in portfolio){
    const qty=portfolio[s];
    const price=prices[s]||0;
    value+=qty*price;
    html+=`<div class="item">${s} — ${qty} shares @ ₹${price}</div>`;
  }
  portfolioDiv.innerHTML = html || "No holdings yet";
  portfolioValue.textContent="₹"+value;

  const pnl = value - (BASE_BALANCE - balance);
  pl.textContent="₹"+pnl;
  pl.className = pnl>=0?"profit":"loss";
}

function renderHistory(){
  historyDiv.innerHTML = history.length
    ? history.map(h=>`<div class="item">${h}</div>`).join("")
    : "No transactions yet";
}

function renderAll(){
  balanceEl.textContent="₹"+balance;
  renderPortfolio();
  renderHistory();
}

/* ACTIONS */
function buy(symbol){
  const price=prices[symbol];
  if(balance<price) return alert("Insufficient balance");
  balance-=price;
  portfolio[symbol]=(portfolio[symbol]||0)+1;
  history.unshift(`Bought ${symbol} @ ₹${price}`);
  save();
  renderAll();
}

function sell(symbol){
  if(!portfolio[symbol]) return alert("No stock to sell");
  const price=prices[symbol];
  balance+=price;
  portfolio[symbol]--;
  if(portfolio[symbol]===0) delete portfolio[symbol];
  history.unshift(`Sold ${symbol} @ ₹${price}`);
  save();
  renderAll();
}

function save(){
  localStorage.setItem("stockSim",
    JSON.stringify({balance,portfolio,history})
  );
}

/* INIT */
const balanceEl=document.getElementById("balance");
const portfolioDiv=document.getElementById("portfolio");
const portfolioValue=document.getElementById("portfolioValue");
const pl=document.getElementById("pl");
const market=document.getElementById("market");
const historyDiv=document.getElementById("history");

loadMarket();
setInterval(loadMarket,15000);
