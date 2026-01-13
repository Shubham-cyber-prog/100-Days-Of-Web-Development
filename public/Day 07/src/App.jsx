import { useEffect, useState } from "react";
import Summary from "./components/Summary";
import Categories from "./components/Categories";
import Transactions from "./components/Transactions";
import AddExpenseModal from "./components/AddExpenseModal";

export default function App() {
  const [expenses, setExpenses] = useState(
    JSON.parse(localStorage.getItem("expenses")) || []
  );
  const [budget, setBudget] = useState(
    Number(localStorage.getItem("budget")) || 5000
  );
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("budget", budget);
  }, [budget]);

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const categoryTotals = expenses.reduce(
    (acc, e) => {
      acc[e.category] += e.amount;
      return acc;
    },
    { food: 0, shopping: 0, travel: 0, health: 0 }
  );

  return (
    <div className="expense-app">
      <Summary total={total} budget={budget} setBudget={setBudget} />
      <Categories totals={categoryTotals} />
      <Transactions
        expenses={expenses}
        onAdd={() => setShowModal(true)}
        onDelete={(index) =>
          setExpenses(expenses.filter((_, i) => i !== index))
        }
      />
      {showModal && (
        <AddExpenseModal
          onClose={() => setShowModal(false)}
          onAdd={(expense) =>
            setExpenses([...expenses, expense])
          }
        />
      )}
    </div>
  );
}
