const channel = new BroadcastChannel("collaboration")
const id = Math.random().toString(36).slice(2)
const color = `hsl(${Math.random()*360},70%,60%)`

const text = document.getElementById("text")
const usersDiv = document.getElementById("users")
const messages = document.getElementById("messages")
const msg = document.getElementById("msg")

let users = {}

function renderUsers(){
  usersDiv.innerHTML=""
  Object.values(users).forEach(u=>{
    const d=document.createElement("div")
    d.className="user"
    d.style.background=u.color
    d.textContent=u.id.slice(0,4)
    usersDiv.appendChild(d)
  })
}

text.addEventListener("input",()=>{
  channel.postMessage({
    type:"text",
    value:text.value,
    from:id
  })
})

msg.addEventListener("keydown",e=>{
  if(e.key==="Enter" && msg.value.trim()){
    channel.postMessage({
      type:"chat",
      value:msg.value,
      from:id
    })
    msg.value=""
  }
})

channel.onmessage = e=>{
  const d = e.data
  if(d.from === id) return

  if(d.type === "text"){
    text.value = d.value
  }

  if(d.type === "chat"){
    const p = document.createElement("p")
    p.textContent = d.from.slice(0,4)+": "+d.value
    messages.appendChild(p)
    messages.scrollTop = messages.scrollHeight
  }

  if(!users[d.from]){
    users[d.from] = {id:d.from,color:d.color}
    renderUsers()
  }
}

channel.postMessage({type:"join",from:id,color})
users[id]={id,color}
renderUsers()
