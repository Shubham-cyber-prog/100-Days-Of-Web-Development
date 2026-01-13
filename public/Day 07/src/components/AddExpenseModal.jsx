import { useState } from "react";

export default function AddExpenseModal({ onClose, onAdd }) {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");
  const [date, setDate] = useState("");

  const handleAdd = () => {
    if (!desc || amount <= 0) return;
    onAdd({ desc, amount: Number(amount), category, date });
    onClose();
  };

  return (
    <div className="modal show">
      <div className="modal-content">
        <h3>Add Expense</h3>

        <input placeholder="Description" onChange={e => setDesc(e.target.value)} />
        <select onChange={e => setCategory(e.target.value)}>
          <option value="food">Food</option>
          <option value="shopping">Shopping</option>
          <option value="travel">Travel</option>
          <option value="health">Health</option>
        </select>
        <input type="number" placeholder="Amount" onChange={e => setAmount(e.target.value)} />
        <input type="date" onChange={e => setDate(e.target.value)} />

        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleAdd}>Add</button>
        </div>
      </div>
    </div>
  );
}
