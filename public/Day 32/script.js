// Theme

const toggleBtn=document.getElementById("themeToggle")
const body=document.body

if(localStorage.getItem("theme")==="dark"){
body.classList.add("dark")
}

toggleBtn.addEventListener("click",()=>{

body.classList.toggle("dark")

localStorage.setItem("theme",
body.classList.contains("dark")?"dark":"light")

})


// Date Time

function updateTime(){
const now=new Date()
document.getElementById("dateTime").textContent=now.toLocaleString()
}

setInterval(updateTime,1000)
updateTime()



// Counters

let likes=0
let comments=0
let shares=0
let views=0

const likesEl=document.getElementById("likesCount")
const commentsEl=document.getElementById("commentsCount")
const sharesEl=document.getElementById("sharesCount")
const viewsEl=document.getElementById("viewsCount")



// Posts

const postFeed=document.getElementById("postFeed")
const postInput=document.getElementById("postInput")
const createPost=document.getElementById("createPost")

createPost.addEventListener("click",()=>{

const text=postInput.value.trim()

if(!text) return

const post=document.createElement("div")
post.className="post"

post.innerHTML=`

<p>${text}</p>

<div class="post-buttons">

<button class="likeBtn">👍 Like</button>

<button class="commentBtn">💬 Comment</button>

<button class="shareBtn">🔁 Share</button>

</div>

`

postFeed.prepend(post)

postInput.value=""

})


// Post interactions

postFeed.addEventListener("click",(e)=>{

if(e.target.classList.contains("likeBtn")){
likes++
likesEl.textContent=likes
updateChart()
}

if(e.target.classList.contains("commentBtn")){
comments++
commentsEl.textContent=comments
updateChart()
}

if(e.target.classList.contains("shareBtn")){
shares++
sharesEl.textContent=shares
updateChart()
}

})



// Views simulation

setInterval(()=>{

views+=Math.floor(Math.random()*10)

viewsEl.textContent=views

updateChart()

},3000)


// Stories

const storyContainer=document.getElementById("storyContainer")
const addStory=document.getElementById("addStory")

addStory.addEventListener("click",()=>{

const story=document.createElement("div")
story.className="story"
story.textContent="New"

storyContainer.appendChild(story)

setTimeout(()=>{
story.remove()
},10000)

})



// Chart

const ctx=document.getElementById("engagementChart")

let chart=new Chart(ctx,{

type:"bar",

data:{
labels:["Likes","Comments","Shares","Views"],
datasets:[{
label:"Engagement",
data:[0,0,0,0],
backgroundColor:[
"#1877f2",
"#1da1f2",
"#e1306c",
"#ff0000"
]
}]
},

options:{
responsive:true
}

})

function updateChart(){

chart.data.datasets[0].data=[likes,comments,shares,views]

chart.update()

}



// Toast

window.addEventListener("load",()=>{

const toast=document.getElementById("toast")

setTimeout(()=>toast.classList.add("show"),800)

setTimeout(()=>toast.classList.remove("show"),4000)

})