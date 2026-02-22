const tabs = document.querySelectorAll('.tab-btn');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const title = document.getElementById('auth-title');
const subtext = document.getElementById('auth-subtext');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    if (tab.dataset.tab === 'login') {
      loginForm.classList.remove('hidden');
      registerForm.classList.add('hidden');
      title.textContent = 'Welcome Back';
      subtext.textContent = 'Authorized personnel only.';
    } else {
      loginForm.classList.add('hidden');
      registerForm.classList.remove('hidden');
      title.textContent = 'Join Academy';
      subtext.textContent = 'Create your developer identity.';
    }
  });
});
