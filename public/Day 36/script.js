const form = document.getElementById("fitnessForm");
const activityList = document.getElementById("activityList");
const recommendationBox = document.getElementById("recommendationBox");

const totalActivitiesEl = document.getElementById("totalActivities");
const totalDurationEl = document.getElementById("totalDuration");
const totalCaloriesEl = document.getElementById("totalCalories");

const DAILY_GOAL = 500;

let activities = JSON.parse(localStorage.getItem("activities")) || [];

const ctx = document.getElementById("calorieChart").getContext("2d");
let chart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: [],
        datasets: [{
            label: "Calories Burned",
            data: [],
            backgroundColor: "#2196f3"
        }]
    }
});

function getRecommendation(totalCalories) {
    if (totalCalories === 0)
        return "No activity logged yet. Try a quick walk or stretching.";

    if (totalCalories < 200)
        return "Low activity today. Consider jogging or skipping.";

    if (totalCalories < DAILY_GOAL)
        return "Good progress! Strength training or cycling would help.";

    return "Goal achieved! Consider yoga or stretching for recovery.";
}

function updateUI() {
    activityList.innerHTML = "";

    let totalDuration = 0;
    let totalCalories = 0;

    activities.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.activity} • ${item.duration} min • ${item.calories} kcal`;
        activityList.appendChild(li);

        totalDuration += item.duration;
        totalCalories += item.calories;
    });

    totalActivitiesEl.textContent = activities.length;
    totalDurationEl.textContent = `${totalDuration} min`;
    totalCaloriesEl.textContent = `${totalCalories} kcal`;

    recommendationBox.textContent = getRecommendation(totalCalories);

    chart.data.labels = activities.map(a => a.activity);
    chart.data.datasets[0].data = activities.map(a => a.calories);
    chart.update();

    localStorage.setItem("activities", JSON.stringify(activities));
}

form.addEventListener("submit", e => {
    e.preventDefault();

    activities.push({
        activity: activity.value,
        duration: Number(duration.value),
        calories: Number(calories.value)
    });

    updateUI();
    form.reset();
});

updateUI();
