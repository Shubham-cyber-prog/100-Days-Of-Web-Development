const form=document.getElementById("fitnessForm")

const activityList=document.getElementById("activityList")

const recommendationBox=document.getElementById("recommendationBox")

const totalActivitiesEl=document.getElementById("totalActivities")

const totalDurationEl=document.getElementById("totalDuration")

const totalCaloriesEl=document.getElementById("totalCalories")

const progressBar=document.getElementById("progressBar")

const goalText=document.getElementById("goalText")

const DAILY_GOAL=500

let activities=JSON.parse(localStorage.getItem("activities"))||[]

const ctx=document.getElementById("calorieChart")

let chart=new Chart(ctx,{

type:"bar",

data:{

labels:[],

datasets:[{

label:"Calories Burned",

data:[],

backgroundColor:"#22c55e"

}]

}

})


function getRecommendation(totalCalories){

if(totalCalories===0)

return"Add your first workout today 💪"

if(totalCalories<200)

return"Low activity today. Try walking or yoga."

if(totalCalories<DAILY_GOAL)

return"Great progress! Keep pushing."

return"You reached today's goal! Excellent!"

}


function updateUI(){

activityList.innerHTML=""

let totalDuration=0

let totalCalories=0


activities.forEach(item=>{

const card=document.createElement("div")

card.className="activity-card"

card.innerHTML=`

<span>${item.activity}</span>

<span>${item.duration} min • ${item.calories} kcal</span>

`

activityList.appendChild(card)

totalDuration+=item.duration

totalCalories+=item.calories

})


totalActivitiesEl.textContent=activities.length

totalDurationEl.textContent=totalDuration+" min"

totalCaloriesEl.textContent=totalCalories+" kcal"


recommendationBox.textContent=getRecommendation(totalCalories)


let percent=(totalCalories/DAILY_GOAL)*100

if(percent>100)percent=100

progressBar.style.width=percent+"%"

goalText.textContent=totalCalories+" / "+DAILY_GOAL+" kcal"


chart.data.labels=activities.map(a=>a.activity)

chart.data.datasets[0].data=activities.map(a=>a.calories)

chart.update()


localStorage.setItem("activities",JSON.stringify(activities))

}


form.addEventListener("submit",function(e){

e.preventDefault()

const activity=document.getElementById("activity").value

const duration=document.getElementById("duration").value

const calories=document.getElementById("calories").value


activities.push({

activity,

duration:Number(duration),

calories:Number(calories)

})


updateUI()

form.reset()

})


updateUI()