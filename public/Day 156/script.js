const urlInput = document.getElementById('urlInput');
const shortenBtn = document.getElementById('shortenBtn');
const errorDiv = document.getElementById('error');
const successDiv = document.getElementById('success');
const urlList = document.getElementById('urlList');

let urlMappings = JSON.parse(localStorage.getItem('urlMappings')) || {};

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

function generateShortCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function shortenUrl() {
    const originalUrl = urlInput.value.trim();

    if (!originalUrl) {
        showError('Please enter a URL');
        return;
    }

    if (!isValidUrl(originalUrl)) {
        showError('Please enter a valid URL (including http:// or https://)');
        return;
    }

    // Check if URL is already shortened
    for (const [code, url] of Object.entries(urlMappings)) {
        if (url === originalUrl) {
            showSuccess(`URL already shortened: ${window.location.origin}/${code}`);
            urlInput.value = '';
            return;
        }
    }

    let shortCode;
    do {
        shortCode = generateShortCode();
    } while (urlMappings[shortCode]);

    urlMappings[shortCode] = originalUrl;
    localStorage.setItem('urlMappings', JSON.stringify(urlMappings));

    showSuccess(`Shortened URL: ${window.location.origin}/${shortCode}`);
    urlInput.value = '';
    displayUrls();
}

function showError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
    successDiv.classList.add('hidden');
    setTimeout(() => errorDiv.classList.add('hidden'), 5000);
}

function showSuccess(message) {
    successDiv.textContent = message;
    successDiv.classList.remove('hidden');
    errorDiv.classList.add('hidden');
    setTimeout(() => successDiv.classList.add('hidden'), 5000);
}

function displayUrls() {
    urlList.innerHTML = '';

    if (Object.keys(urlMappings).length === 0) {
        urlList.innerHTML = '<li>No shortened URLs yet</li>';
        return;
    }

    for (const [code, url] of Object.entries(urlMappings)) {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="short-url">${window.location.origin}/${code}</div>
            <div class="original-url">${url}</div>
            <button class="copy-btn" data-code="${code}">Copy</button>
        `;
        urlList.appendChild(li);
    }
}

function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showSuccess('Copied to clipboard!');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            showSuccess('Copied to clipboard!');
        } catch (err) {
            showError('Failed to copy');
        }
        document.body.removeChild(textArea);
    }
}

function handleCopy(event) {
    if (event.target.classList.contains('copy-btn')) {
        const code = event.target.dataset.code;
        const shortUrl = `${window.location.origin}/${code}`;
        copyToClipboard(shortUrl);
        event.target.textContent = 'Copied!';
        event.target.classList.add('copied');
        setTimeout(() => {
            event.target.textContent = 'Copy';
            event.target.classList.remove('copied');
        }, 2000);
    }
}

// Handle URL redirection if accessing a short code
function handleRedirect() {
    const path = window.location.pathname.slice(1);
    if (path && urlMappings[path]) {
        window.location.href = urlMappings[path];
    }
}

shortenBtn.addEventListener('click', shortenUrl);
urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        shortenUrl();
    }
});
urlList.addEventListener('click', handleCopy);

displayUrls();
handleRedirect();