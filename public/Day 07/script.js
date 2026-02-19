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

// Render Expenses
function renderExpenses() {
  if (expenses.length === 0) {
    expensesContainer.innerHTML =
      '<div class="empty-state">No expenses yet. Add your first expense above!</div>';
    return;
  }

  expensesContainer.innerHTML = expenses
    .map(
      exp => `
    <div class="expense-item">
      <div class="expense-details">
        <div class="expense-name">${exp.name}</div>
        <span class="expense-category">${exp.category}</span>
      </div>

      <div class="expense-amount">$${exp.amount.toFixed(2)}</div>

      <div>
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

// Submit
form.addEventListener("submit", e => {
  e.preventDefault();

  const name = nameInput.value;
  const amount = amountInput.value;
  const category = categorySelect.value;

  if (!validate(name, amount)) return;

  handleExpense(name, amount, category);

  form.reset();
});

// Init
loadExpenses();

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
}


// Edit Expense
function editExpense(id) {
  const expense = expenses.find(exp => exp.id === id);
  if (!expense) return;



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

// Edit Expense
function editExpense(id) {
  const expense = expenses.find(exp => exp.id === id);
  if (!expense) return;

  nameInput.value = expense.name;
  amountInput.value = expense.amount;
  categorySelect.value = expense.category;
  editIdInput.value = expense.id;
}

// Render Expenses
function renderExpenses() {
  if (expenses.length === 0) {
    expensesContainer.innerHTML =
      '<div class="empty-state">No expenses yet. Add your first expense above!</div>';
    return;
  }

  expensesContainer.innerHTML = expenses
    .map(
      exp => `
    <div class="expense-item">
      <div class="expense-details">
        <div class="expense-name">${exp.name}</div>
        <span class="expense-category">${exp.category}</span>
      </div>

      <div class="expense-amount">$${exp.amount.toFixed(2)}</div>

      <div>
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

// Submit
form.addEventListener("submit", e => {
  e.preventDefault();

  const name = nameInput.value;
  const amount = amountInput.value;
  const category = categorySelect.value;

  if (!validate(name, amount)) return;

  handleExpense(name, amount, category);

  form.reset();
});

// Init
loadExpenses();



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

