// let posts = JSON.parse(localStorage.getItem("posts")) || [];

let users = JSON.parse(localStorage.getItem("users")) || [
  {
    id: 1,
    name: "Sheetal",
    bio: "Web Developer 💻",
    avatar: "https://i.pravatar.cc/150?img=32",
    followers: [],
    following: []
  }
];

let currentUser = users[0];

let posts = JSON.parse(localStorage.getItem("posts")) || [];

function addPost() {
  const text = document.getElementById("postText").value;
  if (!text.trim()) return;

  // const post = {
  //   id: Date.now(),
  //   text,
  //   likes: 0,
  //   comments: []
  // };

  const post = {
  id: Date.now(),
  userId: currentUser.id,
  text,
  likes: [],
  comments: []
};

  posts.unshift(post);
  saveAndRender();
  document.getElementById("postText").value = "";
}

// function likePost(id) {
//   const post = posts.find(p => p.id === id);
//   post.likes++;
//   saveAndRender();
// }

function likePost(id) {
  const post = posts.find(p => p.id === id);

  if (!post.likes.includes(currentUser.id)) {
    post.likes.push(currentUser.id);
    showNotification("❤️ Someone liked a post!");
  }

  saveAndRender();
}

// function addComment(id) {
//   const input = document.getElementById(`comment-${id}`);
//   if (!input.value.trim()) return;

//   const post = posts.find(p => p.id === id);
//   post.comments.push(input.value);
//   saveAndRender();
// }


function addComment(postId, parentId = null) {
  const input = document.getElementById(`comment-${postId}`);
  if (!input.value.trim()) return;

  const post = posts.find(p => p.id === postId);

  const newComment = {
    id: Date.now(),
    user: currentUser.name,
    text: input.value,
    likes: [],
    replies: []
  };

  if (parentId) {
    const parent = findComment(post.comments, parentId);
    parent.replies.push(newComment);
  } else {
    post.comments.push(newComment);
  }

  input.value = "";
  showNotification("💬 New comment added!");
  saveAndRender();
}


function findComment(comments, id) {
  for (let c of comments) {
    if (c.id === id) return c;
    let found = findComment(c.replies, id);
    if (found) return found;
  }
}

function likeComment(postId, commentId) {
  const post = posts.find(p => p.id === postId);
  const comment = findComment(post.comments, commentId);

  if (!comment.likes.includes(currentUser.id)) {
    comment.likes.push(currentUser.id);
    showNotification("👍 Someone liked a comment!");
  }

  saveAndRender();
}



function saveAndRender() {
  localStorage.setItem("posts", JSON.stringify(posts));
  renderPosts();
}

// function renderPosts() {
//   const container = document.getElementById("posts");
//   container.innerHTML = "";

//   posts.forEach(p => {
//     container.innerHTML += `
//       <div class="post">
//         <p>${p.text}</p>
//         <div class="post-actions">
//           <span onclick="likePost(${p.id})">❤️ ${p.likes}</span>
//         </div>

//         <input id="comment-${p.id}" placeholder="Add comment...">
//         <button onclick="addComment(${p.id})">Comment</button>

//         <div>
//           ${p.comments.map(c => `<p>💬 ${c}</p>`).join("")}
//         </div>
//       </div>
//     `;
//   });
// }




function renderPosts() {
  const container = document.getElementById("posts");
  container.innerHTML = "";

  posts.forEach(p => {
    const user = users.find(u => u.id === p.userId);

    container.innerHTML += `
      <div class="post">
        <h4>${user.name}</h4>
        <p>${p.text}</p>

        <div class="post-actions">
          <span onclick="likePost(${p.id})">❤️ ${p.likes.length}</span>
        </div>

        <input id="comment-${p.id}" placeholder="Add comment...">
        <button onclick="addComment(${p.id})">Comment</button>

        <div>
          ${renderComments(p.comments, p.id)}
        </div>
      </div>
    `;
  });
}

function renderComments(comments, postId) {
  return comments.map(c => `
    <div style="margin-left:20px;">
      <p><b>${c.user}</b>: ${c.text}</p>
      <span onclick="likeComment(${postId}, ${c.id})">
        👍 ${c.likes.length}
      </span>
      <button onclick="addComment(${postId}, ${c.id})">Reply</button>
      ${renderComments(c.replies, postId)}
    </div>
  `).join("");
}


function followUser(userId) {
  if (!currentUser.following.includes(userId)) {
    currentUser.following.push(userId);
    showNotification("👤 You followed someone!");
  }

  localStorage.setItem("users", JSON.stringify(users));
}


function followUser(userId) {
  if (!currentUser.following.includes(userId)) {
    currentUser.following.push(userId);
    showNotification("👤 You followed someone!");
  }

  localStorage.setItem("users", JSON.stringify(users));
}



document.getElementById("themeToggle").onclick = () =>
  document.body.classList.toggle("dark");

document.getElementById("searchInput").addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  document.querySelectorAll(".post").forEach(p => {
    p.style.display = p.innerText.toLowerCase().includes(value) ? "" : "none";
  });
});

renderPosts();


function showNotification(message) {
  const note = document.createElement("div");
  note.innerText = message;
  note.style.position = "fixed";
  note.style.top = "20px";
  note.style.right = "20px";
  note.style.background = "#4f46e5";
  note.style.color = "white";
  note.style.padding = "10px 15px";
  note.style.borderRadius = "10px";
  note.style.zIndex = "999";
  note.style.animation = "fadeIn 0.3s ease";

  document.body.appendChild(note);

  setTimeout(() => note.remove(), 3000);
}



function renderProfile() {
  document.getElementById("profileSection").innerHTML = `
    <img src="${currentUser.avatar}">
    <h2>${currentUser.name}</h2>
    <p>${currentUser.bio}</p>
    <p>Followers: ${currentUser.followers.length}</p>
    <p>Following: ${currentUser.following.length}</p>
  `;
}

renderProfile();