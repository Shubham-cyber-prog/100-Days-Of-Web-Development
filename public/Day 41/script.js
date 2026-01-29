const profileDiv = document.getElementById("profile");

async function getProfile() {
  const username = document.getElementById("username").value.trim();

  if (username === "") {
    profileDiv.innerHTML = "<p class='error'>Please enter a username</p>";
    return;
  }

  // Show loading state
  profileDiv.innerHTML = "<p style='text-align: center; color: #666; padding: 20px;'>Loading profile...</p>";

  try {
    // Check online status
    if (!navigator.onLine) {
      throw new Error("You are offline. Please check your internet connection.");
    }

    const userRes = await fetch(`https://api.github.com/users/${username}`);
    
    if (!userRes.ok) {
      if (userRes.status === 404) {
        throw new Error(`User "${username}" not found on GitHub`);
      } else if (userRes.status === 403) {
        throw new Error("API rate limit exceeded. Please wait a moment and try again.");
      } else if (userRes.status >= 500) {
        throw new Error("GitHub API is temporarily unavailable. Please try again later.");
      } else {
        throw new Error(`GitHub API error: ${userRes.status}`);
      }
    }

    // Validate response format
    const contentType = userRes.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Invalid response format from GitHub API');
    }

    const user = await userRes.json();

    // Validate user data
    if (!user || !user.login) {
      throw new Error('Invalid user data received');
    }

    const repoRes = await fetch(user.repos_url);
    
    if (!repoRes.ok) {
      throw new Error("Failed to load repositories. Please try again.");
    }

    const repoContentType = repoRes.headers.get('content-type');
    if (!repoContentType || !repoContentType.includes('application/json')) {
      throw new Error('Invalid response format for repositories');
    }

    const repos = await repoRes.json();

    if (!Array.isArray(repos)) {
      throw new Error('Invalid repositories data');
    }

    profileDiv.innerHTML = `
      <div class="profile-card">
        <img src="${user.avatar_url || 'default-avatar.png'}" alt="Avatar">
        <h2>${user.name || user.login}</h2>
        <p>${user.bio || "No bio available"}</p>

        <div class="stats">
          <div class="stat">
            <strong>${user.followers || 0}</strong>
            <p>Followers</p>
          </div>
          <div class="stat">
            <strong>${user.following || 0}</strong>
            <p>Following</p>
          </div>
          <div class="stat">
            <strong>${user.public_repos || 0}</strong>
            <p>Repos</p>
          </div>
        </div>

        <div class="repo-list">
          <h3>📦 Repositories</h3>
          ${repos.length > 0 
            ? repos.slice(0,5).map(repo =>
                `<a href="${repo.html_url || '#'}" target="_blank">${repo.name || 'Unknown'}</a>`
              ).join("")
            : "<p style='color: #999;'>No public repositories found</p>"
          }
        </div>
      </div>
    `;
  } catch (error) {
    profileDiv.innerHTML = `<p class="error">${error.message}</p>`;
  }
}
