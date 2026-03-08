let habits = JSON.parse(localStorage.getItem("habits")) || [];

const habitList = document.getElementById("habitList");
const searchResults = document.getElementById("searchResults");

function showPage(page){

document.querySelectorAll(".page").forEach(p=>{
p.classList.remove("active");
});

document.getElementById(page).classList.add("active");

renderHabits();
updateStats();

}

function saveHabits(){
localStorage.setItem("habits", JSON.stringify(habits));
}

function addHabit(){

let input = document.getElementById("habitInput");

let text = input.value.trim();

if(!text) return;

habits.push({
name:text,
completed:false,
streak:0,
lastCompleted:null
});

input.value="";

saveHabits();

renderHabits();
updateStats();

}

function renderHabits(){

habitList.innerHTML="";

habits.forEach((habit,index)=>{

let li=document.createElement("li");

li.className = habit.completed ? "completed" : "";

li.innerHTML = `

<span>
${habit.name}<br>
<small>🔥 ${habit.streak} days</small>
</span>

<div class="actions">

<button onclick="toggleHabit(${index})">✔</button>
<button onclick="editHabit(${index})">✏</button>
<button onclick="deleteHabit(${index})">✖</button>

</div>

`;

habitList.appendChild(li);

});

updateProgress();

}

function toggleHabit(index){

let habit = habits[index];

let today = new Date().toDateString();

habit.completed = !habit.completed;

if(habit.completed){

if(habit.lastCompleted !== today){

habit.streak++;
habit.lastCompleted = today;

}

}

saveHabits();
renderHabits();

}

function deleteHabit(index){

habits.splice(index,1);

saveHabits();

renderHabits();
updateStats();

}

function editHabit(index){

let newName = prompt("Edit habit", habits[index].name);

if(!newName) return;

habits[index].name = newName;

saveHabits();

renderHabits();

}

document.getElementById("searchHabit").addEventListener("input",function(){

let value = this.value.toLowerCase();

searchResults.innerHTML="";

let filtered = habits.filter(h=>h.name.toLowerCase().includes(value));

filtered.forEach(h=>{

let li=document.createElement("li");
li.textContent=h.name;

searchResults.appendChild(li);

});

});

function updateStats(){

document.getElementById("totalHabits").innerText = habits.length;

let completed = habits.filter(h=>h.completed).length;

document.getElementById("completedHabits").innerText = completed;

let best = Math.max(...habits.map(h=>h.streak),0);

document.getElementById("bestStreak").innerText = best;

}

function updateProgress(){

let completed = habits.filter(h=>h.completed).length;

let percent = habits.length ? (completed/habits.length)*100 : 0;

document.getElementById("progressBar").style.width = percent+"%";

document.getElementById("progressText").innerText =
percent.toFixed(0)+"% habits completed";

}

renderHabits();
updateStats();