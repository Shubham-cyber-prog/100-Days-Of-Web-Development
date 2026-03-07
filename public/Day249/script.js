async function getStats() {
  const username = document.getElementById("username").value.trim();
  const card = document.getElementById("card");

  if (!username) {
    alert("Enter a username bro 😭");
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    
    if (!response.ok) {
      throw new Error("User not found");
    }

    const data = await response.json();

    card.classList.remove("hidden");

    card.innerHTML = `
      <img src="${data.avatar_url}" alt="avatar">
      <h2>${data.name || data.login}</h2>
      <p>@${data.login}</p>
      <p>Followers: ${data.followers}</p>
      <p>Public Repos: ${data.public_repos}</p>
      <p>Following: ${data.following}</p>
    `;

  } catch (error) {
    card.classList.add("hidden");
    alert("User not found or API limit exceeded 🚫");
  }
}