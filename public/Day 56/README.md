# Expense Splitter (Pure JavaScript)

A clean and interactive **frontend-only Expense Splitter** built using **HTML, CSS, and Vanilla JavaScript**.  
It helps groups split expenses fairly, track balances, and settle debts efficiently — similar to Splitwise, but simpler.

---

## Features

- Add group members
- Add expenses with:
  - Description
  - Amount
  - Payer
  - Selected participants
- Automatic equal splitting
- Live balance calculation (who owes / who gets)
- Optimized settlement suggestions (minimum transactions)
- Manual settlement recording
- Persistent data using `localStorage`
- Export & Import data (JSON)
- Load sample data for testing
- Clear all data
- Responsive and user-friendly UI

---

## How It Works (Logic Overview)

### Balance Calculation
For each expense:
- The **payer** gets credited with the full amount
- Each participant is debited by their equal share

Final balances are calculated as:
balance = total_paid − total_owed

- **Positive balance** → user should receive money  
- **Negative balance** → user owes money  

---

### Settlement Optimization
Instead of tracking individual debts, the app:
- Computes **net balances**
- Matches debtors to creditors
- Generates **minimum number of transactions** to settle all balances

This approach is:
- Efficient
- Scalable
- Industry-standard (used by Splitwise)

---

## Tech Stack

- **HTML5**
- **CSS3**
- **Vanilla JavaScript (ES6)**
- **Font Awesome** (icons)
- **LocalStorage** (data persistence)

---

## 📂 Project Structure

expense-splitter/
│
├── index.html
├── style.css
└── script.js


---

## Sample Scenario

1. A & B go to lunch, A pays ₹500  
2. A, B, C, D go next day, C pays ₹1000  
3. A, B, C, D, E, F go next day, F pays ₹3000  

The app correctly:
- Computes net balances
- Suggests optimal settlements
- Avoids unnecessary intermediate payments

---

## Note

- This is a **frontend-only project**
- No authentication or backend is involved
- Designed for learning:
  - DOM manipulation
  - State management
  - Real-world calculation logic

---

## 📌 Future Improvements (Optional)

- Unequal split support
- Per-expense payer selection UI
- Charts for expense visualization

---

## Author

Built as part of a **Day 56 frontend project challenge**  
Focused on correctness, clarity, and real-world logic.
