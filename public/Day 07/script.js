let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// DOM Elements
const form = document.getElementById("expense-form");
const nameInput = document.getElementById("expense-name");
const amountInput = document.getElementById("expense-amount");
const categorySelect = document.getElementById("expense-category");
const totalAmountEl = document.getElementById("total-amount");
const expensesContainer = document.getElementById("expenses-container");
const editIdInput = document.getElementById("edit-id");

// Load expenses
function loadExpenses() {
  const data = localStorage.getItem("expenses");
  if (data) {
    expenses = JSON.parse(data);
    renderExpenses();
    updateTotal();
  }
}

// Save to localStorage
function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
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
  
  // Change button text to indicate edit mode
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.textContent = "Update Expense";
}

// Render Expenses
function renderExpenses() {
  if (!expensesContainer) return;
  
  if (expenses.length === 0) {
    expensesContainer.innerHTML = '<div class="empty-state">No expenses yet. Add your first expense above!</div>';
    return;
  }

  expensesContainer.innerHTML = expenses
    .map(
      exp => `
    <div class="expense-item" data-id="${exp.id}">
      <div class="expense-details">
        <div class="expense-name">${exp.name}</div>
        <span class="expense-category ${exp.category.toLowerCase()}">${exp.category}</span>
      </div>

      <div class="expense-amount">$${exp.amount.toFixed(2)}</div>

      <div class="expense-actions">
        <button class="edit-btn" onclick="editExpense(${exp.id})">Edit</button>
        <button class="delete-btn" onclick="deleteExpense(${exp.id})">Delete</button>
      </div>
    </div>
  `
    )
    .join("");
}

// Update Total
function updateTotal() {
  if (!totalAmountEl) return;
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  totalAmountEl.textContent = `$${total.toFixed(2)}`;
}

// Validate
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

// Reset form to add mode
function resetForm() {
  form.reset();
  editIdInput.value = "";
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.textContent = "Add Expense";
}

// Submit
form.addEventListener("submit", e => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const category = categorySelect.value;

  if (!validate(name, amount)) return;

  handleExpense(name, amount, category);
  resetForm();
});

// Cancel edit (optional feature)
function cancelEdit() {
  resetForm();
}

// Add keyboard support
nameInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    amountInput.focus();
  }
});

amountInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    form.dispatchEvent(new Event("submit"));
  }
});

// Export data feature
function exportExpenses() {
  const dataStr = JSON.stringify(expenses, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = `expenses_${new Date().toISOString().slice(0,10)}.json`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}

// Clear all expenses (with confirmation)
function clearAllExpenses() {
  if (expenses.length > 0 && confirm("Are you sure you want to delete all expenses?")) {
    expenses = [];
    saveExpenses();
    renderExpenses();
    updateTotal();
    resetForm();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadExpenses);
} else {
  loadExpenses();
}

