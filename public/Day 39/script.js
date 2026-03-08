const courses = [

"HTML Mastery",
"CSS Flexbox & Grid",
"JavaScript Basics",
"Advanced JavaScript",
"React for Beginners",
"Node.js Fundamentals",
"Python Programming",
"Machine Learning Intro",
"Data Structures",
"Algorithms Bootcamp",
"Web Security",
"Git & GitHub",
"DevOps Basics",
"Docker Essentials",
"AI for Developers"

];

const courseList = document.getElementById("courseList");
const cartList = document.getElementById("cartList");
const myCourses = document.getElementById("myCourses");

let cart = [];



function renderCourses(filter=""){

courseList.innerHTML="";

courses
.filter(c=>c.toLowerCase().includes(filter.toLowerCase()))
.forEach(course=>{

const card=document.createElement("div");

card.className="course";

card.innerHTML=`

<i class="fa-solid fa-book"></i>

<h3>${course}</h3>

<p>Instructor: Expert Trainer</p>

<button onclick="addToCart('${course}')">Add to Cart</button>

`;

courseList.appendChild(card);

});

}



function addToCart(course){

if(cart.includes(course)){
alert("Already added");
return;
}

cart.push(course);

renderCart();

}



function renderCart(){

cartList.innerHTML="";

cart.forEach(course=>{

const item=document.createElement("div");

item.className="cart-item";

item.innerText=course;

cartList.appendChild(item);

});

}



document
.getElementById("checkoutBtn")
.addEventListener("click",()=>{

if(cart.length===0){
alert("Cart empty");
return;
}

document
.getElementById("paymentModal")
.style.display="flex";

});



function processPayment(){

document
.getElementById("paymentModal")
.style.display="none";

alert("Payment Successful 🎉");

cart.forEach(course=>{

const div=document.createElement("div");

div.className="cart-item";

div.innerHTML=`

${course}

<button onclick="watchCourse('${course}')">

Watch Course

</button>

`;

myCourses.appendChild(div);

});

cart=[];

renderCart();

}



function watchCourse(course){

alert("Now Playing: "+course);

}



function closeModal(){

document
.getElementById("paymentModal")
.style.display="none";

}



document
.getElementById("searchInput")
.addEventListener("input",(e)=>{

renderCourses(e.target.value);

});



document
.getElementById("themeToggle")
.addEventListener("click",()=>{

document.body.classList.toggle("dark");

});



renderCourses();