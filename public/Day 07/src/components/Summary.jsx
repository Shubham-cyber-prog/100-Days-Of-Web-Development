export default function Summary({ total, budget, setBudget }) {
  const usage = Math.min(total / budget, 1) * 360;

  return (
    <section className="summary-card">
      <div
        className="ring"
        style={{
          background: `conic-gradient(
            ${total > budget ? "#dc2626" : "#22c55e"} 0deg ${usage}deg,
            #e5e7eb ${usage}deg 360deg
          )`
        }}
      >
        <div className="ring-center">
          <span>Spent</span>
          <h2>₹{total}</h2>
        </div>
      </div>

      <div>
        <p>Monthly Budget</p>
        <strong
          className="editable-limit"
          onClick={() => {
            const value = Number(prompt("Edit budget", budget));
            if (value > 0) setBudget(value);
          }}
        >
          ₹{budget}
        </strong>
      </div>
    </section>
  );
}
