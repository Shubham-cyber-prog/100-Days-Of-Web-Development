const usernameInput = document.getElementById("username");
const searchBtn = document.getElementById("searchBtn");

const profileBox = document.getElementById("profile");
const statsBox = document.getElementById("stats");
const repoList = document.getElementById("repoList");

const loader = document.getElementById("loader");
const themeBtn = document.getElementById("themeToggle");


// THEME
themeBtn.onclick = ()=>{
  document.body.classList.toggle("dark");
};


// SEARCH
searchBtn.onclick = ()=>{
  const user = usernameInput.value.trim();

  if(!user){
    alert("Enter username");
    return;
  }

  fetchProfile(user);
};


// ENTER KEY
usernameInput.addEventListener("keypress",e=>{
  if(e.key==="Enter") searchBtn.click();
});


// FETCH DATA
async function fetchProfile(username){

  showLoader(true);

  try{

    // PROFILE
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    
    if(!userRes.ok) throw new Error("User not found");

    const userData = await userRes.json();


    // REPOS
    const repoRes = await fetch(userData.repos_url+"?sort=stars&per_page=5");
    const repos = await repoRes.json();


    renderProfile(userData);
    renderStats(userData);
    renderRepos(repos);


  }catch(err){

    showError(err.message);

  }finally{

    showLoader(false);
  }
}


// PROFILE UI
function renderProfile(user){

  profileBox.innerHTML = `
    <img src="${user.avatar_url}">
    <h2>${user.name || user.login}</h2>
    <p>${user.bio || "No bio available"}</p>
    <p>📍 ${user.location || "Unknown"}</p>

    <a href="${user.html_url}" target="_blank">
      View Profile
    </a>
  `;
}


// STATS UI
function renderStats(user){

  statsBox.innerHTML = `

    <div class="statBox">
      Repositories<br>${user.public_repos}
    </div>

    <div class="statBox">
      Followers<br>${user.followers}
    </div>

    <div class="statBox">
      Following<br>${user.following}
    </div>

    <div class="statBox">
      Gists<br>${user.public_gists}
    </div>

  `;
}


// REPOS UI
function renderRepos(repos){

  repoList.innerHTML="";

  if(repos.length===0){
    repoList.innerHTML="<p>No repositories</p>";
    return;
  }

  repos.forEach(r=>{

    repoList.innerHTML += `

      <div class="repo">

        <a href="${r.html_url}" target="_blank">
          ${r.name}
        </a>

        <p>⭐ ${r.stargazers_count} | 🍴 ${r.forks_count}</p>

        <small>${r.language || "N/A"}</small>

      </div>

    `;
  });
}


// ERROR
function showError(msg){

  profileBox.innerHTML = `
    <p style="color:red">${msg}</p>
  `;

  statsBox.innerHTML="";
  repoList.innerHTML="";
}


// LOADER
function showLoader(state){

  loader.style.display = state ? "flex" : "none";
}
