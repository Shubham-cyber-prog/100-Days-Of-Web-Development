const channel = new BroadcastChannel("collaboration")
const id = Math.random().toString(36).slice(2)
const color = `hsl(${Math.random()*360},70%,60%)`

const text = document.getElementById("text")
const usersDiv = document.getElementById("users")
const messages = document.getElementById("messages")
const msg = document.getElementById("msg")

let users = {}

function renderUsers() {
  usersDiv.innerHTML = ""
  Object.values(users).forEach(u => {
    const d = document.createElement("div")
    d.className = "user"
    d.style.background = u.color
    d.style.color = "white"
    d.style.padding = "5px 10px"
    d.style.borderRadius = "20px"
    d.style.display = "inline-block"
    d.style.margin = "0 5px 5px 0"
    d.textContent = u.id.slice(0, 4)
    usersDiv.appendChild(d)
  })
}

// Function to add a message to the chat
function addMessage(senderId, message, senderColor) {
  const p = document.createElement("p")
  p.style.margin = "5px 0"
  p.style.wordBreak = "break-word"
  p.style.color = "white"  // Make text visible on purple background
  
  // Create sender span with color
  const sender = document.createElement("span")
  sender.style.color = senderColor
  sender.style.fontWeight = "bold"
  sender.textContent = senderId.slice(0, 4) + ": "
  
  p.appendChild(sender)
  p.appendChild(document.createTextNode(message))
  
  messages.appendChild(p)
  messages.scrollTop = messages.scrollHeight
}

// Show our own chat messages
msg.addEventListener("keydown", e => {
  if (e.key === "Enter" && msg.value.trim()) {
    const message = msg.value.trim()
    
    // Show our own message immediately
    addMessage(id, message, color)
    
    // Broadcast to others
    channel.postMessage({
      type: "chat",
      value: message,
      from: id,
      color: color
    })
    
    msg.value = ""
  }
})

// Handle incoming messages
channel.onmessage = e => {
  const d = e.data
  if (d.from === id) return

  // Add user if we haven't seen them before
  if (!users[d.from]) {
    users[d.from] = { id: d.from, color: d.color }
    renderUsers()
  }

  if (d.type === "text") {
    text.value = d.value
  }

  if (d.type === "chat") {
    addMessage(d.from, d.value, d.color)
  }
}

// Text input handling
text.addEventListener("input", () => {
  channel.postMessage({
    type: "text",
    value: text.value,
    from: id,
    color: color
  })
})

// Announce join
channel.postMessage({
  type: "join",
  from: id,
  color: color
})

// Add ourselves
users[id] = { id, color }
renderUsers()