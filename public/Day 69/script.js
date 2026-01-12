const products = [
  {id:1,name:"Wireless Headphones",price:2999,category:"Electronics",img:"https://tse1.mm.bing.net/th/id/OIP._9g0OfKrKUud2ab1CyhyZQHaHa?pid=Api&P=0&h=300"},
  {id:2,name:"Smart Watch",price:4999,category:"Electronics",img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30"},
  {id:3,name:"Bluetooth Speaker",price:2499,category:"Electronics",img:"https://tse3.mm.bing.net/th/id/OIP.F2GttSLndMBfNAPti240hAHaHa?pid=Api&P=0&h=300"},
  {id:4,name:"Gaming Mouse",price:1899,category:"Electronics",img:"https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04"},
  {id:5,name:"Mechanical Keyboard",price:3799,category:"Electronics",img:"https://images.unsplash.com/photo-1587829741301-dc798b83add3"},
  {id:6,name:"Men’s Casual T-Shirt",price:999,category:"Fashion",img:"https://tse4.mm.bing.net/th/id/OIP.xBNONOhTQ4Gy1XmbpVnARQHaHa?pid=Api&P=0&h=180"},
  {id:7,name:"Laptop Backpack",price:1999,category:"Accessories",img:"https://images.unsplash.com/photo-1622560480654-d96214fdc887"},
  {id:8,name:"Table Lamp",price:1599,category:"Home",img:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c"},// 🎧 Electronics
  {id:9, name:"Wireless Headphones", price:2999, category:"Electronics",
   img:"https://tse1.mm.bing.net/th/id/OIP._9g0OfKrKUud2ab1CyhyZQHaHa?pid=Api&P=0&h=300"},
  {id:10, name:"Smart Watch", price:4999, category:"Electronics",
   img:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"},
  {id:11, name:"Bluetooth Speaker", price:2499, category:"Electronics",
   img:"https://tse3.mm.bing.net/th/id/OIP.F2GttSLndMBfNAPti240hAHaHa?pid=Api&P=0&h=300"},
  {id:12, name:"Gaming Mouse", price:1899, category:"Electronics",
   img:"https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80"},
  {id:13, name:"Mechanical Keyboard", price:3799, category:"Electronics",
   img:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80"},

  // 👕 Fashion
  {id:14, name:"Men’s Casual T-Shirt", price:999, category:"Fashion",
   img:"https://tse4.mm.bing.net/th/id/OIP.xBNONOhTQ4Gy1XmbpVnARQHaHa?pid=Api&P=0&h=180"},
  {id:15, name:"Women’s Denim Jacket", price:2999, category:"Fashion",
   img:"https://images.unsplash.com/photo-1542060748-10c28b62716f?auto=format&fit=crop&w=800&q=80"},
  {id:16, name:"Running Shoes", price:3999, category:"Fashion",
   img:"https://s3.amazonaws.com/www.irunfar.com/wp-content/uploads/2023/07/24133535/Best-Trail-Running-Shoes-Brooks-Cascadia-17.jpg"},
  {id:17, name:"Sunglasses", price:1499, category:"Fashion",
   img:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80"},
  {id:18, name:"Leather Wallet", price:1299, category:"Fashion",
   img:"https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?auto=format&fit=crop&w=800&q=80"},

  // 🎒 Accessories
  {id:19, name:"Laptop Backpack", price:1999, category:"Accessories",
   img:"https://images.unsplash.com/photo-1622560480654-d96214fdc887?auto=format&fit=crop&w=800&q=80"},
  {id:20, name:"Travel Duffel Bag", price:3499, category:"Accessories",
   img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"},
  {id:21, name:"Stylish Cap", price:799, category:"Accessories",
   img:"https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=800&q=80"},
  {id:22, name:"Leather Belt", price:899, category:"Accessories",
   img:"https://tse3.mm.bing.net/th/id/OIP.8GgzmzqjpuH9BBELj8bPBwHaHm?pid=Api&P=0&h=180"},
  

  // 🏠 Home & Living
  {id:23, name:"Table Lamp", price:1599, category:"Home",
   img:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80"},
 
  {id:24, name:"Wall Clock", price:1299, category:"Home",
   img:"https://images.unsplash.com/photo-1507646871303-331b8f659227?auto=format&fit=crop&w=800&q=80"}
  


];


let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentProduct = null;

function renderProducts(list = products){
  productList.innerHTML = "";
  list.forEach(p=>{
    productList.innerHTML += `
      <div class="card">
        <img src="${p.img}">
        <div class="card-content">
          <h3>${p.name}</h3>
          <p>₹${p.price}</p>
          <button onclick="viewProduct(${p.id})">View Details</button>
        </div>
      </div>`;
  });
}
renderProducts();

function viewProduct(id){
  currentProduct = products.find(p=>p.id===id);
  modal.style.display="flex";
  modalImg.src=currentProduct.img;
  modalName.innerText=currentProduct.name;
  modalPrice.innerText="₹"+currentProduct.price;
}
function closeModal(){ modal.style.display="none"; }

function addToCart(){
  cart.push(currentProduct);
  localStorage.setItem("cart", JSON.stringify(cart));
  cartCount.innerText = cart.length;
  closeModal();
}

function openCart(){
  productList.style.display="none";
  cartPage.style.display="block";
  cartItems.innerHTML="";
  cart.forEach(i=>{
    cartItems.innerHTML += `<div class="cart-item">${i.name}<span>₹${i.price}</span></div>`;
  });
}

function openCheckout(){
  cartPage.style.display="none";
  checkoutPage.style.display="block";
}

function placeOrder(){
  alert("🎉 Order placed successfully!");
  localStorage.clear();
  location.reload();
}

function searchProducts(val){
  renderProducts(products.filter(p=>p.name.toLowerCase().includes(val.toLowerCase())));
}

function filterByCategory(cat){
  if(cat==="All") renderProducts(products);
  else renderProducts(products.filter(p=>p.category===cat));
}

cartCount.innerText = cart.length;
