export default function Transactions({ expenses, onAdd, onDelete }) {
  return (
    <section className="transactions">
      <div className="transactions-header">
        <h3>Transactions</h3>
        <button className="add-expense-btn" onClick={onAdd}>+</button>
      </div>

      {expenses.length === 0 && (
        <p className="empty">No transactions yet.</p>
      )}

      {expenses.map((e, i) => (
        <div className="expense-item" key={i}>
          <div>
            <div>{e.desc}</div>
            <small>{e.date}</small>
          </div>
          <div>
            <strong>₹{e.amount}</strong>
            <button onClick={() => onDelete(i)}>🗑️</button>
          </div>
        </div>
      ))}
    </section>
  );
}
