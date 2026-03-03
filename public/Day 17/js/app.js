document.addEventListener("DOMContentLoaded", function(){

/* NAVIGATION */
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");

navLinks.forEach(link=>{
  link.addEventListener("click",function(){
    navLinks.forEach(l=>l.classList.remove("active"));
    this.classList.add("active");

    sections.forEach(sec=>sec.classList.remove("active-section"));
    document.getElementById(this.dataset.section)
    .classList.add("active-section");
  });
});

/* RATES */
const rates={
  USD:1,
  INR:83,
  GBP:0.79,
  EUR:0.92,
  JPY:148,
  CAD:1.35
};

const fromSelect=document.getElementById("fromCurrency");
const toSelect=document.getElementById("toCurrency");

Object.keys(rates).forEach(currency=>{
  fromSelect.innerHTML+=`<option value="${currency}">${currency}</option>`;
  toSelect.innerHTML+=`<option value="${currency}">${currency}</option>`;
});

/* CONVERT */
window.convertCurrency=function(){
  const amount=parseFloat(document.getElementById("amount").value);
  const from=fromSelect.value;
  const to=toSelect.value;

  if(isNaN(amount)){
    alert("Enter valid amount");
    return;
  }

  const usdValue=amount/rates[from];
  const converted=usdValue*rates[to];

  document.getElementById("resultMain").innerText=
  `${amount} ${from} = ${converted.toFixed(2)} ${to}`;

  document.getElementById("reverseRate").innerText=
  `1 ${to} = ${(rates[from]/rates[to]).toFixed(4)} ${from}`;
};

/* SWAP */
document.getElementById("swapBtn").addEventListener("click",()=>{
  [fromSelect.value,toSelect.value]=
  [toSelect.value,fromSelect.value];
});

/* CHART */
new Chart(document.getElementById("rateChart"),{
  type:"bar",
  data:{
    labels:Object.keys(rates),
    datasets:[{
      data:Object.values(rates),
      backgroundColor:"#38bdf8"
    }]
  },
  options:{plugins:{legend:{display:false}}}
});

});