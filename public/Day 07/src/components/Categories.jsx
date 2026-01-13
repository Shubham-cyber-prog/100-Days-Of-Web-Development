export default function Categories({ totals }) {
  return (
    <section className="category-totals">
      <div>🍔 Food <span>₹{totals.food}</span></div>
      <div>🛍️ Shopping <span>₹{totals.shopping}</span></div>
      <div>✈️ Travel <span>₹{totals.travel}</span></div>
      <div>💊 Health <span>₹{totals.health}</span></div>
    </section>
  );
}
