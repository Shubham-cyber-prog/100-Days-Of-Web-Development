// =======================
// Load Expenses From LocalStorage
// =======================
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// =======================
// DOM Elements
// =======================
const form = document.getElementById("expense-form");
const nameInput = document.getElementById("expense-name");
const amountInput = document.getElementById("expense-amount");
const categorySelect = document.getElementById("expense-category");
const dateInput = document.getElementById("expense-date");
const editIdInput = document.getElementById("edit-id");

const expensesContainer = document.getElementById("expenses-container");
const totalAmountEl = document.getElementById("total-amount");

// Summary Elements
const highestEl = document.getElementById("highest-expense");
const lowestEl = document.getElementById("lowest-expense");
const foodTotalEl = document.getElementById("food-total");
const travelTotalEl = document.getElementById("travel-total");
const shoppingTotalEl = document.getElementById("shopping-total");
const otherTotalEl = document.getElementById("other-total");


// =======================
// Save To LocalStorage
// =======================
function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}


// =======================
// Add or Edit Expense
// =======================
function handleExpense(name, amount, category, date) {
  const editId = editIdInput.value;

  if (editId) {
    // EDIT
    expenses = expenses.map(exp =>
      exp.id === Number(editId)
        ? { ...exp, name, amount, category, date }
        : exp
    );
    editIdInput.value = "";
  } else {
    // ADD
    expenses.push({
      id: Date.now(),
      name,
      amount,
      category,
      date
    });
  }

  saveExpenses();
  renderExpenses();
  updateTotal();
  updateSummary();
}


// =======================
// Delete Expense
// =======================
function deleteExpense(id) {
  expenses = expenses.filter(exp => exp.id !== id);
  saveExpenses();
  renderExpenses();
  updateTotal();
  updateSummary();
}


// =======================
// Edit Expense
// =======================
function editExpense(id) {
  const expense = expenses.find(exp => exp.id === id);
  if (!expense) return;

  nameInput.value = expense.name;
  amountInput.value = expense.amount;
  categorySelect.value = expense.category;
  dateInput.value = expense.date;
  editIdInput.value = expense.id;
}


// =======================
// Render Expenses
// =======================
function renderExpenses() {
  expensesContainer.innerHTML = "";

  if (expenses.length === 0) {
    expensesContainer.innerHTML =
      `<p class="empty">No expenses added yet.</p>`;
    return;
  }

  // Sort by newest date
  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  sortedExpenses.forEach(exp => {
    const div = document.createElement("div");
    div.className = "expense-card";

    div.innerHTML = `
      <div class="expense-left">
        <strong>${exp.name}</strong>
        <span class="category ${exp.category}">${exp.category}</span>
        <small>${new Date(exp.date).toLocaleDateString()}</small>
      </div>

      <div class="action-buttons">
        <span class="amount">₹${exp.amount.toFixed(2)}</span>
        <button class="edit-btn" onclick="editExpense(${exp.id})">Edit</button>
        <button class="delete-btn" onclick="deleteExpense(${exp.id})">Delete</button>
      </div>
    `;

    expensesContainer.appendChild(div);
  });
}


// =======================
// Update Total
// =======================
function updateTotal() {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  totalAmountEl.textContent = `₹${total.toFixed(2)}`;
}


// =======================
// Update Summary Section
// =======================
function updateSummary() {
  if (expenses.length === 0) {
    highestEl.textContent = "₹0";
    lowestEl.textContent = "₹0";
    foodTotalEl.textContent = "₹0";
    travelTotalEl.textContent = "₹0";
    shoppingTotalEl.textContent = "₹0";
    otherTotalEl.textContent = "₹0";
    return;
  }

  const amounts = expenses.map(exp => exp.amount);

  const highest = Math.max(...amounts);
  const lowest = Math.min(...amounts);

  const categoryTotals = {
    Food: 0,
    Travel: 0,
    Shopping: 0,
    Other: 0
  };

  expenses.forEach(exp => {
    categoryTotals[exp.category] += exp.amount;
  });

  highestEl.textContent = `₹${highest.toFixed(2)}`;
  lowestEl.textContent = `₹${lowest.toFixed(2)}`;
  foodTotalEl.textContent = `₹${categoryTotals.Food.toFixed(2)}`;
  travelTotalEl.textContent = `₹${categoryTotals.Travel.toFixed(2)}`;
  shoppingTotalEl.textContent = `₹${categoryTotals.Shopping.toFixed(2)}`;
  otherTotalEl.textContent = `₹${categoryTotals.Other.toFixed(2)}`;
}


// =======================
// Validate Form
// =======================
function validate(name, amount) {
  if (!name.trim() || amount <= 0) {
    alert("Please enter valid expense details.");
    return false;
  }
  return true;
}


// =======================
// Form Submit
// =======================
form.addEventListener("submit", e => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const amount = Number(amountInput.value);
  const category = categorySelect.value;
  const date =
    dateInput.value || new Date().toISOString().split("T")[0];

  if (!validate(name, amount)) return;

  handleExpense(name, amount, category, date);
  form.reset();
});

// =======================
// Dark Mode Toggle
// =======================
const themeToggleBtn = document.getElementById("theme-toggle-btn");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeToggleBtn.textContent = "☀ Light Mode";
}

themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    themeToggleBtn.textContent = "☀ Light Mode";
  } else {
    localStorage.setItem("theme", "light");
    themeToggleBtn.textContent = "🌙 Dark Mode";
  }
});


// =======================
// Initialize App
// =======================
renderExpenses();
updateTotal();
updateSummary();