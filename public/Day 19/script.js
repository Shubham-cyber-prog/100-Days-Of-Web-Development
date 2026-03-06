let bill=0;
let tip=0;
let people=1;

const billInput=document.getElementById("bill");
const tipButtons=document.querySelectorAll(".tip-buttons button");
const tipAmountEl=document.getElementById("tipAmount");
const totalAmountEl=document.getElementById("totalAmount");
const peopleCountEl=document.getElementById("peopleCount");

billInput.addEventListener("input",e=>{
  bill=parseFloat(e.target.value)||0;
  calculate();
});

tipButtons.forEach(btn=>{
  btn.addEventListener("click",()=>{
    tipButtons.forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    tip=parseInt(btn.dataset.tip);
    calculate();
  });
});

document.getElementById("plus").onclick=()=>{
  people++;
  peopleCountEl.innerText=people;
  calculate();
};

document.getElementById("minus").onclick=()=>{
  if(people>1)people--;
  peopleCountEl.innerText=people;
  calculate();
};

function animateValue(el,start,end,duration){
  let startTime=null;
  function animation(currentTime){
    if(!startTime)startTime=currentTime;
    const progress=Math.min((currentTime-startTime)/duration,1);
    el.innerText=(start+(end-start)*progress).toFixed(2);
    if(progress<1)requestAnimationFrame(animation);
  }
  requestAnimationFrame(animation);
}

function calculate(){
  if(bill<=0)return;
  const tipTotal=bill*(tip/100);
  const tipPer=tipTotal/people;
  const totalPer=(bill+tipTotal)/people;

  animateValue(tipAmountEl,0,tipPer,500);
  animateValue(totalAmountEl,0,totalPer,500);

  updateChart(tipTotal,bill);
}

document.getElementById("reset").onclick=()=>{
  bill=0;tip=0;people=1;
  billInput.value="";
  peopleCountEl.innerText="1";
  tipAmountEl.innerText="0.00";
  totalAmountEl.innerText="0.00";
};

/* CHART */
const ctx=document.getElementById("breakdownChart");
const chart=new Chart(ctx,{
  type:"doughnut",
  data:{
    labels:["Bill","Tip"],
    datasets:[{
      data:[0,0],
      backgroundColor:["#8b5cf6","#10b981"]
    }]
  }
});

function updateChart(tipAmount,billAmount){
  chart.data.datasets[0].data=[billAmount,tipAmount];
  chart.update();
}

/* LOTTIE */
lottie.loadAnimation({
  container:document.getElementById("lottie"),
  renderer:"svg",
  loop:true,
  autoplay:true,
  path:"https://assets3.lottiefiles.com/packages/lf20_jcikwtux.json"
});

/* DARK MODE */
document.getElementById("themeToggle").onclick=()=>{
  document.body.classList.toggle("dark");
};