let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// DOM Elements
const form = document.getElementById("expense-form");
const nameInput = document.getElementById("expense-name");
const amountInput = document.getElementById("expense-amount");
const categorySelect = document.getElementById("expense-category");

const expensesContainer = document.getElementById("expenses-container");
const totalAmountEl = document.getElementById("total-amount");

const dateInput = document.getElementById("expense-date");

const editIdInput = document.getElementById("edit-id");
const expensesContainer = document.getElementById("expenses-container");
const totalAmountEl = document.getElementById("total-amount");


// =======================
// Load Expenses from Storage
// =======================
function loadExpenses() {
  if (expenses.length) {
    renderExpenses();
    updateTotal();
  }
}

// =======================
// Save Expenses to Storage
// =======================

function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}


function handleExpense(name, amount, category, date) {
  const editId = editIdInput.value;

  if (editId) {
    // EDIT existing expense
    expenses = expenses.map(exp =>
      exp.id === Number(editId)
        ? { ...exp, name, amount: Number(amount), category, date }
        : exp
    );
    editIdInput.value = "";
  } else {
    // ADD new expense
    expenses.push({
      id: Date.now(),
      name,
      amount: Number(amount),
      category,
      date: date || new Date().toISOString().split('T')[0] // default today
    });
  }

  saveExpenses();
  renderExpenses();
  updateTotal();
}

// =======================
// Delete Expense
// =======================
function deleteExpense(id) {
  expenses = expenses.filter(exp => exp.id !== id);
  saveExpenses();
  renderExpenses();
  updateTotal();
}

// Edit Expense
function editExpense(id) {
  const expense = expenses.find(exp => exp.id === id);
  if (!expense) return;

  nameInput.value = expense.name;
  amountInput.value = expense.amount;
  categorySelect.value = expense.category;
  dateInput.value = expense.date;
  editIdInput.value = expense.id;
}

// Render Expenses
function renderExpenses() {
  expensesContainer.innerHTML = "";

  if (expenses.length === 0) {
    expensesContainer.innerHTML = `<p class="empty">No expenses added yet.</p>`;
    return;
  }


  expenses.forEach(exp => {
    const div = document.createElement("div");
    div.className = "expense-card";


  // Sort by date descending
  expenses.sort((a, b) => new Date(b.date) - new Date(a.date));

  expenses.forEach(exp => {
    const div = document.createElement("div");
    div.className = "expense-card";

    div.innerHTML = `
      <div class="expense-left">
        <strong>${exp.name}</strong>
        <span class="category ${exp.category}">${exp.category}</span>

      </div>
      <div class="amount">$${exp.amount.toFixed(2)}</div>
      <div>

        <span class="expense-date">${new Date(exp.date).toLocaleDateString()}</span>
      </div>
      <div class="amount">₹${exp.amount.toFixed(2)}</div>
      <div class="expense-actions">

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

// Add or Update Expense
function handleExpense(name, amount, category) {
  const editId = editIdInput.value;

  if (editId) {
    // EDIT
    expenses = expenses.map(exp =>
      exp.id === Number(editId)
        ? { ...exp, name, amount: Number(amount), category }
        : exp
    );
    editIdInput.value = "";
  } else {
    // ADD
    expenses.push({
      id: Date.now(),
      name,
      amount: Number(amount),
      category
    });
  }

  saveExpenses();
  renderExpenses();
  updateTotal();
}

// Delete Expense
function deleteExpense(id) {
  expenses = expenses.filter(exp => exp.id !== id);
  saveExpenses();
  renderExpenses();
  updateTotal();
}

// Edit Expense
function editExpense(id) {
  const expense = expenses.find(exp => exp.id === id);
  if (!expense) return;

  nameInput.value = expense.name;
  amountInput.value = expense.amount;
  categorySelect.value = expense.category;
  editIdInput.value = expense.id;
}

// Validate
function validate(name, amount) {
  if (!name.trim() || amount <= 0) {
    alert("Please enter valid expense details.");
    return false;
  }
  return true;
}


// =======================
// Validate Form Input
// =======================
function validate(name, amount) {
  let valid = true;
  nameInput.classList.remove("error");
  amountInput.classList.remove("error");

  if (!name.trim()) {
    nameInput.classList.add("error");
    valid = false;
  }

  if (!amount || amount <= 0) {
    amountInput.classList.add("error");
    valid = false;
  }

  return valid;
}


form.addEventListener("submit", e => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const amount = Number(amountInput.value);
  const category = categorySelect.value;
  const date = dateInput.value || new Date().toISOString().split('T')[0]; // fallback to today

  if (!validate(name, amount)) return;

  handleExpense(name, amount, category);
  form.reset();
});

// Init
renderExpenses();
updateTotal();

  handleExpense(name, amount, category, date);

  form.reset();
});

// Initialize App
loadExpenses();

