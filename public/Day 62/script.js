const usernameInput = document.getElementById("username");
const searchBtn = document.getElementById("searchBtn");

const profileBox = document.getElementById("profile");
const statsBox = document.getElementById("stats");
const repoList = document.getElementById("repoList");

const loader = document.getElementById("loader");

let chart;

searchBtn.onclick = () => {

const user = usernameInput.value.trim();

if(!user){
alert("Enter username");
return;
}

fetchProfile(user);

};

usernameInput.addEventListener("keypress",e=>{
if(e.key==="Enter") searchBtn.click();
});


async function fetchProfile(username){

showLoader(true);

try{

const userRes = await fetch(`https://api.github.com/users/${username}`);

if(!userRes.ok) throw new Error("User not found");

const userData = await userRes.json();

const repoRes = await fetch(userData.repos_url+"?per_page=100");

const repos = await repoRes.json();

renderProfile(userData);

renderStats(userData);

renderRepos(repos);

renderChart(repos);

}catch(err){

showError(err.message);

}finally{

showLoader(false);

}

}



function renderProfile(user){

profileBox.innerHTML = `

<img src="${user.avatar_url}">

<h2>${user.name || user.login}</h2>

<p>${user.bio || "No bio available"}</p>

<p>📍 ${user.location || "Unknown"}</p>

<a href="${user.html_url}" target="_blank">View GitHub Profile</a>

`;

}



function renderStats(user){

statsBox.innerHTML = `

<div class="statBox">Repositories<br>${user.public_repos}</div>

<div class="statBox">Followers<br>${user.followers}</div>

<div class="statBox">Following<br>${user.following}</div>

<div class="statBox">Gists<br>${user.public_gists}</div>

`;

}



function renderRepos(repos){

repoList.innerHTML="";

repos.slice(0,5).forEach(r=>{

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



function renderChart(repos){

let langCount = {};

repos.forEach(repo=>{

if(repo.language){

langCount[repo.language] = (langCount[repo.language] || 0) + 1;

}

});

const labels = Object.keys(langCount);

const data = Object.values(langCount);

if(chart) chart.destroy();

chart = new Chart(document.getElementById("languageChart"),{

type:"pie",

data:{

labels:labels,

datasets:[{

data:data

}]

}

});

}



function showError(msg){

profileBox.innerHTML = `<p style="color:red">${msg}</p>`;

statsBox.innerHTML="";

repoList.innerHTML="";

}



function showLoader(state){

loader.style.display = state ? "flex" : "none";

}