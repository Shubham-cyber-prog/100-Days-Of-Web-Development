document.addEventListener("DOMContentLoaded", () => {
  const heightInput = document.getElementById("height");
  const weightInput = document.getElementById("weight");
  const heightUnit = document.getElementById("heightUnit");
  const weightUnit = document.getElementById("weightUnit");
  const calcBtn = document.getElementById("calculate-btn");

  const resultBox = document.getElementById("result");
  const bmiValue = document.getElementById("bmi-value");
  const bmiCategory = document.getElementById("bmi-category");
  const bmiMessage = document.getElementById("bmi-message");

  calcBtn.addEventListener("click", calculateBMI);

  function calculateBMI() {
    const age = parseInt(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;

    if (!age || age <= 0) {
    alert("Please enter valid age");
    return;
    }

    let heightVal = parseFloat(heightInput.value);
    let weightVal = parseFloat(weightInput.value);

    if (!heightVal || !weightVal || heightVal <= 0 || weightVal <= 0) {
      alert("Please enter valid height and weight");
      return;
    }

    // ---- HEIGHT → meters ----
    let heightCm =
      heightUnit.value === "ft"
        ? heightVal * 30.48
        : heightVal;

    let heightM = heightCm / 100;

    // ---- WEIGHT → kg ----
    let weightKg =
      weightUnit.value === "lb"
        ? weightVal * 0.453592
        : weightVal;

    // ---- BMI ----
    const bmi = weightKg / (heightM * heightM);
    const roundedBMI = bmi.toFixed(1);

    // let category = "";
    // let message = "";
    // let color = "";

    // if (bmi < 18.5) {
    //   category = "Underweight";
    //   message = "Consider improving your nutrition.";
    //   color = "#3498db";
    // } else if (bmi < 25) {
    //   category = "Normal";
    //   message = "Great! You have a healthy weight.";
    //   color = "#2ecc71";
    // } else if (bmi < 30) {
    //   category = "Overweight";
    //   message = "Try regular exercise and a balanced diet.";
    //   color = "#f39c12";
    // } else {
    //   category = "Obese";
    //   message = "Consult a healthcare professional.";
    //   color = "#e74c3c";
    // }


    let diet = "";

if (bmi < 18.5) {
  category = "Underweight";
  message = "You need healthy weight gain.";
  color = "#3498db";

  diet = `
    <strong>Recommended Diet:</strong><br>
    • High protein foods (eggs, paneer, chicken)<br>
    • Healthy carbs (rice, potatoes, oats)<br>
    • Nuts & dry fruits<br>
    • 5-6 small meals per day
  `;

} else if (bmi < 25) {
  category = "Normal";
  message = "Maintain your healthy lifestyle.";
  color = "#2ecc71";

  diet = `
    <strong>Recommended Diet:</strong><br>
    • Balanced meals<br>
    • Fruits & vegetables<br>
    • Lean protein<br>
    • Regular hydration
  `;

} else if (bmi < 30) {
  category = "Overweight";
  message = "Focus on fat loss and exercise.";
  color = "#f39c12";

  diet = `
    <strong>Recommended Diet:</strong><br>
    • Low carb meals<br>
    • High fiber foods<br>
    • Avoid sugary drinks<br>
    • 30 mins daily exercise
  `;

} else {
  category = "Obese";
  message = "Medical consultation advised.";
  color = "#e74c3c";

  diet = `
    <strong>Recommended Diet:</strong><br>
    • Strict calorie control<br>
    • More vegetables<br>
    • Avoid processed food<br>
    • Consult nutritionist
  `;
}

document.getElementById("diet-plan").innerHTML = diet;


 // ---- BMR ----
let bmr;

if (gender === "male") {
  bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
} else {
  bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
}

document.getElementById("bmr-result").innerHTML =
  "<strong>BMR:</strong> " + bmr.toFixed(0) + " calories/day";


  // ---- BFP (BMI-based estimation formula) ----
let bfp;

if (gender === "male") {
  bfp = (1.20 * bmi) + (0.23 * age) - 16.2;
} else {
  bfp = (1.20 * bmi) + (0.23 * age) - 5.4;
}

document.getElementById("bfp-result").innerHTML =
  "<strong>Estimated Body Fat %:</strong> " + bfp.toFixed(1) + "%";


    resultBox.classList.remove("hidden");
    bmiValue.textContent = roundedBMI;
    bmiCategory.textContent = category;
    bmiMessage.textContent = message;

    bmiValue.style.color = color;
    bmiCategory.style.color = color;
  }

  const resetBtn = document.getElementById("reset-btn");

 

  if (resetBtn) {
    resetBtn.addEventListener("click", resetBMI);
  }

  function resetBMI() {
    heightInput.value = "";
    weightInput.value = "";
    heightUnit.value = "cm";
    weightUnit.value = "kg";

    bmiValue.textContent = "0";
    bmiCategory.textContent = "-";
    bmiMessage.textContent = "Enter your details to calculate";

    resultBox.classList.add("hidden");

    document.getElementById("bmr-result").innerHTML = "";
    document.getElementById("bfp-result").innerHTML = "";
    document.getElementById("diet-plan").innerHTML = "";
    document.getElementById("age").value = "";
    document.getElementById("gender").value = "male";

  }
});
