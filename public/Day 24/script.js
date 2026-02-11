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

    let category = "";
    let message = "";
    let color = "";

    if (bmi < 18.5) {
      category = "Underweight";
      message = "Consider improving your nutrition.";
      color = "#3498db";
    } else if (bmi < 25) {
      category = "Normal";
      message = "Great! You have a healthy weight.";
      color = "#2ecc71";
    } else if (bmi < 30) {
      category = "Overweight";
      message = "Try regular exercise and a balanced diet.";
      color = "#f39c12";
    } else {
      category = "Obese";
      message = "Consult a healthcare professional.";
      color = "#e74c3c";
    }

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
  }
});
