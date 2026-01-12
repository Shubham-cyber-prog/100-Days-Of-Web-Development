const foods = [
  { id: 1, name: "Pizza", price: 250, category: "fast" },
  { id: 2, name: "Burger", price: 150, category: "fast" },
  { id: 3, name: "Biryani", price: 300, category: "meal" },
  { id: 4, name: "Pasta", price: 200, category: "meal" },
  { id: 5, name: "Ice Cream", price: 120, category: "dessert" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const foodList = document.getElementById("food-list");
const cartEl = document.getElementById("cart");
const cartItems = document.getElementById("cart-items");
const totalEl = document.getElementById("total");
const cartCount = document.getElementById("cart-count");

/* RENDER FOODS */
function renderFoods(list) {
  foodList.innerHTML = "";
  list.forEach(food => {
    foodList.innerHTML += `
      <div class="food-card">
        <h3>${food.name}</h3>
        <p>₹${food.price}</p>
        <button onclick="addToCart(${food.id})">Add</button>
      </div>
    `;
  });
}
renderFoods(foods);

/* FILTER */
function filterFood(category) {
  if (category === "all") renderFoods(foods);
  else renderFoods(foods.filter(f => f.category === category));
}

/* SEARCH */
document.getElementById("search").addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  renderFoods(foods.filter(f => f.name.toLowerCase().includes(value)));
});

/* CART TOGGLE */
document.getElementById("cart-btn").onclick = () => {
  cartEl.classList.toggle("active");
};

/* ADD TO CART */
function addToCart(id) {
  const item = cart.find(i => i.id === id);
  if (item) item.qty++;
  else {
    const food = foods.find(f => f.id === id);
    cart.push({ ...food, qty: 1 });
  }
  updateCart();
}

/* UPDATE CART */
function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    count += item.qty;

    cartItems.innerHTML += `
      <li>
        ${item.name}
        <div class="qty">
          <button onclick="changeQty(${item.id}, -1)">-</button>
          ${item.qty}
          <button onclick="changeQty(${item.id}, 1)">+</button>
        </div>
      </li>
    `;
  });

  totalEl.innerText = total;
  cartCount.innerText = count;
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* CHANGE QTY */
function changeQty(id, change) {
  cart = cart.map(item => {
    if (item.id === id) item.qty += change;
    return item;
  }).filter(item => item.qty > 0);

  updateCart();
}

updateCart();
