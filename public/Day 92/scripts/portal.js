// Mock Database
let participants = JSON.parse(localStorage.getItem('hack_participants')) || [
    { name: "Alice Dev", email: "alice@example.com", skill: "Advanced", date: "2026-01-10", status: "Approved" },
    { name: "Bob Script", email: "bob@example.com", skill: "Intermediate", date: "2026-01-11", status: "Pending" }
];

let teams = JSON.parse(localStorage.getItem('hack_teams')) || [
    { name: "Byte Busters", members: 3, capacity: 4 },
    { name: "React Rangers", members: 2, capacity: 4 }
];

// View Controller
function showView(viewName) {
    document.querySelectorAll('.view').forEach(v => v.style.display = 'none');
    document.getElementById(`${viewName}-view`).style.display = 'block';

    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('onclick').includes(viewName)) a.classList.add('active');
    });

    if (viewName === 'teams') renderTeams();
    if (viewName === 'admin') renderAdmin();
}

// Registration Logic
function handleRegistration(event) {
    event.preventDefault();
    const newParticipant = {
        name: document.getElementById('reg-name').value,
        email: document.getElementById('reg-email').value,
        skill: document.getElementById('reg-skill').value,
        date: new Date().toISOString().split('T')[0],
        status: "Pending"
    };

    participants.push(newParticipant);
    localStorage.setItem('hack_participants', JSON.stringify(participants));

    alert('Registration Successful! You are now on the waitlist.');
    event.target.reset();
    showView('home');
}

// Team Logic
function toggleTeamForm() {
    const form = document.getElementById('team-form');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

function handleTeamCreation(event) {
    event.preventDefault();
    const newTeam = {
        name: document.getElementById('team-name').value,
        members: 1,
        capacity: 4
    };

    teams.push(newTeam);
    localStorage.setItem('hack_teams', JSON.stringify(teams));

    renderTeams();
    toggleTeamForm();
    event.target.reset();
}

function renderTeams() {
    const grid = document.getElementById('teams-grid');
    grid.innerHTML = teams.map(team => `
        <div class="card">
            <h3>${team.name}</h3>
            <p style="color: var(--text-muted); margin: 1rem 0;">Members: ${team.members}/${team.capacity}</p>
            <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden; margin-bottom: 1.5rem;">
                <div style="width: ${(team.members / team.capacity) * 100}%; height: 100%; background: var(--primary);"></div>
            </div>
            <button class="btn ${team.members >= team.capacity ? 'btn-outline' : ''}" style="width: 100%;" ${team.members >= team.capacity ? 'disabled' : ''}>
                ${team.members >= team.capacity ? 'Full' : 'Join Team'}
            </button>
        </div>
    `).join('');
}

// Admin Logic
function renderAdmin() {
    const tbody = document.getElementById('admin-table-body');
    tbody.innerHTML = participants.map(p => `
        <tr>
            <td>${p.name}</td>
            <td>${p.email}</td>
            <td><span class="tech-tag" style="background: rgba(255,255,255,0.1); padding: 2px 8px; border-radius: 4px; font-size: 0.8rem;">${p.skill}</span></td>
            <td>${p.date}</td>
            <td style="color: ${p.status === 'Approved' ? 'var(--success)' : '#f59e0b'}">${p.status}</td>
        </tr>
    `).join('');
}

// Tech tag mock styles for admin
const style = document.createElement('style');
style.textContent = `
    .tech-tag { display: inline-block; }
`;
document.head.appendChild(style);

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    // Default view
});
