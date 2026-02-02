let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const form = document.getElementById("expense-form");
const nameInput = document.getElementById("expense-name");
const amountInput = document.getElementById("expense-amount");
const categoryInput = document.getElementById("expense-category");
const expensesContainer = document.getElementById("expenses-container");
const totalAmountEl = document.getElementById("total-amount");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const amount = Number(amountInput.value);
  const category = categoryInput.value;

  if (!name || amount <= 0) return;

  expenses.push({
    id: Date.now(),
    name,
    amount,
    category
  });

  saveAndRender();
  form.reset();
});

function saveAndRender() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
  updateTotal();
}

function renderExpenses() {
  expensesContainer.innerHTML = "";

  if (expenses.length === 0) {
    expensesContainer.innerHTML = `<p class="empty">No expenses added yet.</p>`;
    return;
  }

  expenses.forEach(exp => {
    const div = document.createElement("div");
    div.className = "expense-card";
    div.innerHTML = `
      <div class="expense-left">
        <strong>${exp.name}</strong>
        <span class="category ${exp.category}">${exp.category}</span>
      </div>
      <div class="amount">₹${exp.amount}</div>
      <button class="delete-btn" onclick="deleteExpense(${exp.id})">Delete</button>
    `;
    expensesContainer.appendChild(div);
  });
}

function deleteExpense(id) {
  expenses = expenses.filter(e => e.id !== id);
  saveAndRender();
}

function updateTotal() {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  totalAmountEl.textContent = `₹${total}`;
}

// Load on refresh
renderExpenses();
updateTotal();
