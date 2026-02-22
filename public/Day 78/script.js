/* DARK MODE */
themeToggle.onclick=()=>document.body.classList.toggle("dark");

/* GAME SWITCH */
function openGame(id){
  document.querySelectorAll(".game").forEach(g=>g.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  if(id==="quiz"){qi=0;score=0;loadQ();}
}

/* MATH */
let a,b,ms=0;
function genMath(){
  a=~~(Math.random()*10);
  b=~~(Math.random()*10);
  mathQ.textContent=`${a}+${b}=?`;
}
genMath();
function checkMath(){
  if(+mathAns.value===a+b){
    ms++;
    mathScore.textContent="Score: "+ms;
  }
  mathAns.value="";
  genMath();
}

/* MEMORY */
const symbols=["🍎","🍎","🍌","🍌","🍇","🍇","🍉","🍉"].sort(()=>0.5-Math.random());
let first=null,lock=false,matched=0;
symbols.forEach(s=>{
  const d=document.createElement("div");
  d.className="mem";
  d.textContent="❓";
  d.onclick=()=>{
    if(lock||d.textContent!=="❓")return;
    d.textContent=s;
    if(!first) first=d;
    else{
      lock=true;
      if(first.textContent===d.textContent){
        matched++;
        memScore.textContent=`Matches: ${matched}/4`;
        first=null;lock=false;
      }else{
        setTimeout(()=>{
          first.textContent=d.textContent="❓";
          first=null;lock=false;
        },600);
      }
    }
  };
  memoryGrid.appendChild(d);
});

/* WORD */
const devWords=["html","css","javascript","react","frontend","backend","api","database"];
let cur="";
function newWord(){
  cur=devWords[~~(Math.random()*devWords.length)];
  scrambled.textContent=cur.split("").sort(()=>0.5-Math.random()).join("");
}
newWord();
function checkWord(){
  wordScore.textContent=wordAns.value===cur?"Correct":"Wrong";
  wordAns.value="";
  newWord();
}

/* MCQ */
const quizData=[
 {q:"HTML stands for?",a:["Hyper Text Markup Language","High Text ML","Hyperlinks"],c:0},
 {q:"CSS is used for?",a:["Logic","Styling","Database"],c:1},
 {q:"JS is a?",a:["Language","Framework","Library"],c:0},
 {q:"React is?",a:["Library","OS","Browser"],c:0},
 {q:"DOM stands for?",a:["Document Object Model","Design Model","Data Object"],c:0}
];
let quizSet=quizData.sort(()=>0.5-Math.random());
let qi=0,score=0;
function loadQ(){
  quizOpts.innerHTML="";
  nextBtn.style.display="none";
  quizQ.textContent=quizSet[qi].q;
  quizSet[qi].a.forEach((o,i)=>{
    const b=document.createElement("button");
    b.className="quiz-option";
    b.textContent=o;
    b.onclick=()=>{
      document.querySelectorAll(".quiz-option").forEach(x=>x.disabled=true);
      if(i===quizSet[qi].c){b.classList.add("correct");score++}
      else{
        b.classList.add("wrong");
        quizOpts.children[quizSet[qi].c].classList.add("correct");
      }
      nextBtn.style.display="inline-block";
    };
    quizOpts.appendChild(b);
  });
}
nextBtn.onclick=()=>{
  qi++;
  qi<quizSet.length?loadQ():quizScore.textContent=`Score: ${score}/${quizSet.length}`;
};

/* REACTION */
let start;
function startReaction(){
  reactBtn.textContent="Wait...";
  setTimeout(()=>{
    start=Date.now();
    reactBtn.textContent="CLICK!";
    reactBtn.onclick=()=>{
      reactScore.textContent=`${Date.now()-start} ms`;
      reactBtn.onclick=startReaction;
      reactBtn.textContent="Start";
    };
  },Math.random()*2000+1000);
}

/* GUESS */
let num=~~(Math.random()*10)+1,att=0;
function checkGuess(){
  att++;
  guessScore.textContent=
    +guessInp.value===num?`Correct in ${att}`:
    +guessInp.value>num?"Too High":"Too Low";
  if(+guessInp.value===num){
    num=~~(Math.random()*10)+1;
    att=0;
  }
}

/* TYPING */
let t0;
function checkTyping(){
  if(!t0) t0=Date.now();
  if(typingInp.value===typingText.textContent){
    typingScore.textContent=`Time: ${(Date.now()-t0)/1000}s`;
    typingInp.value="";
    t0=null;
  }
}
