// Email Client Application

// Sample email data
const emailData = {
    inbox: [
        {
            id: 1,
            sender: "WebMail Team",
            email: "support@webmail.com",
            subject: "Welcome to WebMail!",
            preview: "Thank you for choosing WebMail as your email client.",
            body: "<p>Welcome to WebMail Client!</p><p>This is a fully functional email client built with HTML, CSS, and JavaScript.</p><p>You can:</p><ul><li>Compose new emails</li><li>Read received emails</li><li>Reply to emails</li><li>Star important emails</li><li>Delete emails</li><li>Search through your inbox</li></ul><p>Try clicking on an email to read it, or click the Compose button to send a new message.</p><p>Best regards,<br>The WebMail Team</p>",
            time: "10:30 AM",
            date: "Today",
            read: true,
            starred: false,
            avatarColor: "#34a853",
            avatarText: "WM"
        },
        {
            id: 2,
            sender: "John Smith",
            email: "john.smith@company.com",
            subject: "Meeting Tomorrow",
            preview: "Hi, just a reminder about our meeting tomorrow at 2 PM.",
            body: "<p>Hi there,</p><p>This is a reminder about our meeting tomorrow at 2 PM in Conference Room B.</p><p>Please bring the quarterly reports with you.</p><p>Best,<br>John</p>",
            time: "9:15 AM",
            date: "Today",
            read: false,
            starred: true,
            avatarColor: "#4285f4",
            avatarText: "JS"
        },
        {
            id: 3,
            sender: "Sarah Johnson",
            email: "sarahj@example.org",
            subject: "Project Update",
            preview: "The project is on track and we've completed phase 1.",
            body: "<p>Hello,</p><p>I'm writing to provide an update on the project. We have successfully completed phase 1 ahead of schedule.</p><p>The team has done excellent work and we're ready to begin phase 2 next week.</p><p>Regards,<br>Sarah</p>",
            time: "Yesterday",
            date: "Oct 11",
            read: true,
            starred: false,
            avatarColor: "#ea4335",
            avatarText: "SJ"
        },
        {
            id: 4,
            sender: "Newsletter",
            email: "news@techdaily.com",
            subject: "Tech News Weekly",
            preview: "Latest updates in technology for this week.",
            body: "<p>Here are this week's top tech stories:</p><ol><li>New smartphone with breakthrough camera technology</li><li>AI developments that could change healthcare</li><li>Cybersecurity threats on the rise</li></ol><p>Read more on our website.</p>",
            time: "Oct 10",
            date: "Oct 10",
            read: false,
            starred: false,
            avatarColor: "#fbbc05",
            avatarText: "TN"
        },
        {
            id: 5,
            sender: "Michael Brown",
            email: "m.brown@business.com",
            subject: "Lunch Next Week",
            preview: "Would you be available for lunch next Tuesday?",
            body: "<p>Hi,</p><p>Hope you're doing well. Would you be available for lunch next Tuesday? I'd like to discuss potential collaboration opportunities.</p><p>Let me know what works for you.</p><p>Cheers,<br>Michael</p>",
            time: "Oct 9",
            date: "Oct 9",
            read: true,
            starred: true,
            avatarColor: "#5f6368",
            avatarText: "MB"
        }
    ],
    starred: [],
    sent: [],
    drafts: [
        {
            id: 101,
            sender: "Me",
            email: "john.doe@example.com",
            subject: "Draft: Follow-up on proposal",
            preview: "Following up on the proposal I sent last week...",
            body: "<p>Hi,</p><p>I'm following up on the proposal I sent last week. Please let me know if you have any questions.</p><p>Best,<br>John</p>",
            time: "Oct 8",
            date: "Oct 8",
            read: true,
            starred: false,
            avatarColor: "#4285f4",
            avatarText: "JD"
        }
    ],
    spam: [
        {
            id: 201,
            sender: "Prize Alert",
            email: "no-reply@winnings.com",
            subject: "You've won $1,000,000!",
            preview: "Congratulations! You've been selected as our grand prize winner.",
            body: "<p>You've won $1,000,000! Click here to claim your prize now!</p>",
            time: "Oct 7",
            date: "Oct 7",
            read: false,
            starred: false,
            avatarColor: "#ea4335",
            avatarText: "PA"
        },
        {
            id: 202,
            sender: "Investment Opportunity",
            email: "invest@fastmoney.com",
            subject: "Double your money in 30 days",
            preview: "Limited time investment opportunity with guaranteed returns.",
            body: "<p>Double your money in 30 days with our revolutionary investment strategy!</p>",
            time: "Oct 6",
            date: "Oct 6",
            read: false,
            starred: false,
            avatarColor: "#ea4335",
            avatarText: "IO"
        },
        {
            id: 203,
            sender: "Social Media",
            email: "update@socialplatform.com",
            subject: "Your account has been compromised",
            preview: "Urgent: Your account security may be at risk.",
            body: "<p>Your account may have been compromised. Click here to secure it now!</p>",
            time: "Oct 5",
            date: "Oct 5",
            read: true,
            starred: false,
            avatarColor: "#ea4335",
            avatarText: "SM"
        }
    ],
    trash: []
};

// Application state
let state = {
    currentFolder: 'inbox',
    selectedEmails: [],
    currentEmail: null,
    searchQuery: '',
    emailIdCounter: 1000
};

// DOM Elements
const emailList = document.getElementById('emailList');
const emailListContainer = document.getElementById('emailListContainer');
const emailViewContainer = document.getElementById('emailViewContainer');
const folderTitle = document.getElementById('folderTitle');
const searchInput = document.getElementById('searchInput');
const composeBtn = document.getElementById('composeBtn');
const composeModal = document.getElementById('composeModal');
const closeComposeBtn = document.getElementById('closeComposeBtn');
const sendEmailBtn = document.getElementById('sendEmailBtn');
const saveDraftBtn = document.getElementById('saveDraftBtn');
const discardBtn = document.getElementById('discardBtn');
const refreshBtn = document.getElementById('refreshBtn');
const selectAllBtn = document.getElementById('selectAllBtn');
const deleteSelectedBtn = document.getElementById('deleteSelectedBtn');
const folderItems = document.querySelectorAll('.folder-item');
const starEmailBtn = document.getElementById('starEmailBtn');
const replyEmailBtn = document.getElementById('replyEmailBtn');
const deleteEmailBtn = document.getElementById('deleteEmailBtn');
const sendReplyBtn = document.getElementById('sendReplyBtn');
const replyInput = document.getElementById('replyInput');

// Initialize the app
function init() {
    // Load starred emails from inbox
    emailData.starred = emailData.inbox.filter(email => email.starred);
    
    // Update badge counts
    updateBadgeCounts();
    
    // Render the initial email list
    renderEmailList();
    
    // Set up event listeners
    setupEventListeners();
    
    // Show welcome email by default
    showEmail(emailData.inbox[0]);
}

// Update badge counts
function updateBadgeCounts() {
    document.getElementById('inboxCount').textContent = emailData.inbox.filter(e => !e.read).length;
    document.getElementById('starredCount').textContent = emailData.starred.length;
    document.getElementById('draftsCount').textContent = emailData.drafts.length;
    document.getElementById('spamCount').textContent = emailData.spam.length;
}

// Render email list based on current folder and search
function renderEmailList() {
    // Clear current list
    emailList.innerHTML = '';
    
    // Get emails for current folder
    let emails = emailData[state.currentFolder];
    
    // Apply search filter if search query exists
    if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        emails = emails.filter(email => 
            email.subject.toLowerCase().includes(query) ||
            email.sender.toLowerCase().includes(query) ||
            email.preview.toLowerCase().includes(query) ||
            email.email.toLowerCase().includes(query)
        );
    }
    
    // Update folder title
    folderTitle.textContent = state.currentFolder.charAt(0).toUpperCase() + state.currentFolder.slice(1);
    
    // If no emails, show message
    if (emails.length === 0) {
        emailList.innerHTML = `
            <div class="no-emails">
                <i class="fas fa-inbox"></i>
                <p>No emails in ${state.currentFolder}</p>
            </div>
        `;
        return;
    }
    
    // Render each email
    emails.forEach(email => {
        const emailItem = document.createElement('div');
        emailItem.className = `email-item ${email.read ? '' : 'unread'} ${state.selectedEmails.includes(email.id) ? 'selected' : ''}`;
        emailItem.dataset.id = email.id;
        
        emailItem.innerHTML = `
            <div class="email-checkbox">
                <input type="checkbox" ${state.selectedEmails.includes(email.id) ? 'checked' : ''}>
            </div>
            <div class="email-sender">${email.sender}</div>
            <div class="email-content">
                <div class="email-subject">${email.subject}</div>
                <div class="email-preview">${email.preview}</div>
            </div>
            <div class="email-time">${email.time}</div>
            ${email.starred ? '<div class="email-important"><i class="fas fa-star"></i></div>' : ''}
        `;
        
        emailList.appendChild(emailItem);
    });
    
    // Add event listeners to email items
    document.querySelectorAll('.email-item').forEach(item => {
        const emailId = parseInt(item.dataset.id);
        
        // Click to select email
        item.addEventListener('click', (e) => {
            // Don't trigger if clicking checkbox
            if (e.target.type === 'checkbox') return;
            
            // Find the email object
            const emails = emailData[state.currentFolder];
            const email = emails.find(e => e.id === emailId);
            
            if (email) {
                showEmail(email);
                
                // Mark as read
                if (!email.read && state.currentFolder === 'inbox') {
                    email.read = true;
                    updateBadgeCounts();
                    renderEmailList();
                }
            }
        });
        
        // Checkbox event
        const checkbox = item.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', (e) => {
            e.stopPropagation();
            
            if (checkbox.checked) {
                state.selectedEmails.push(emailId);
                item.classList.add('selected');
            } else {
                state.selectedEmails = state.selectedEmails.filter(id => id !== emailId);
                item.classList.remove('selected');
            }
            
            updateDeleteButtonState();
        });
    });
}

// Show email in view panel
function showEmail(email) {
    // Update state
    state.currentEmail = email;
    
    // Update email view
    document.getElementById('emailViewSubject').textContent = email.subject;
    document.getElementById('senderName').textContent = email.sender;
    document.getElementById('senderEmail').textContent = email.email;
    document.getElementById('senderAvatar').textContent = email.avatarText;
    document.getElementById('senderAvatar').style.backgroundColor = email.avatarColor;
    document.getElementById('emailViewBody').innerHTML = email.body;
    
    // Update star button
    const starIcon = starEmailBtn.querySelector('i');
    starIcon.className = email.starred ? 'fas fa-star starred' : 'far fa-star';
    
    // Show email view and hide list on mobile
    if (window.innerWidth <= 1024) {
        emailListContainer.classList.add('hidden');
        emailViewContainer.classList.remove('hidden');
        emailViewContainer.classList.add('show');
    } else {
        emailViewContainer.classList.add('show');
    }
    
    // Set reply input placeholder
    replyInput.placeholder = `Reply to ${email.sender}...`;
}

// Compose new email
function composeEmail() {
    // Reset form
    document.getElementById('composeTo').value = '';
    document.getElementById('composeSubject').value = '';
    document.getElementById('composeBody').value = '';
    
    // Show modal
    composeModal.style.display = 'flex';
}

// Send email
function sendEmail() {
    const to = document.getElementById('composeTo').value.trim();
    const subject = document.getElementById('composeSubject').value.trim();
    const body = document.getElementById('composeBody').value.trim();
    
    if (!to || !subject || !body) {
        alert('Please fill in all fields');
        return;
    }
    
    // Create new email object for sent folder
    const newEmail = {
        id: ++state.emailIdCounter,
        sender: "Me",
        email: "john.doe@example.com",
        to: to,
        subject: subject,
        preview: body.substring(0, 60) + '...',
        body: `<p>${body.replace(/\n/g, '</p><p>')}</p>`,
        time: "Just now",
        date: "Today",
        read: true,
        starred: false,
        avatarColor: "#4285f4",
        avatarText: "JD"
    };
    
    // Add to sent folder
    emailData.sent.unshift(newEmail);
    
    // Close compose modal
    composeModal.style.display = 'none';
    
    // Show confirmation
    alert('Email sent successfully!');
    
    // If in sent folder, refresh list
    if (state.currentFolder === 'sent') {
        renderEmailList();
    }
}

// Save draft
function saveDraft() {
    const to = document.getElementById('composeTo').value.trim();
    const subject = document.getElementById('composeSubject').value.trim();
    const body = document.getElementById('composeBody').value.trim();
    
    if (!to && !subject && !body) {
        alert('Draft is empty');
        return;
    }
    
    // Create draft email object
    const draftEmail = {
        id: ++state.emailIdCounter,
        sender: "Me",
        email: "john.doe@example.com",
        to: to,
        subject: subject ? `Draft: ${subject}` : 'Draft: No subject',
        preview: body ? body.substring(0, 60) + '...' : 'Empty draft',
        body: body ? `<p>${body.replace(/\n/g, '</p><p>')}</p>` : '<p></p>',
        time: "Just now",
        date: "Today",
        read: true,
        starred: false,
        avatarColor: "#4285f4",
        avatarText: "JD"
    };
    
    // Add to drafts folder
    emailData.drafts.unshift(draftEmail);
    
    // Close compose modal
    composeModal.style.display = 'none';
    
    // Update badge count
    updateBadgeCounts();
    
    // If in drafts folder, refresh list
    if (state.currentFolder === 'drafts') {
        renderEmailList();
    }
    
    alert('Draft saved!');
}

// Delete selected emails
function deleteSelectedEmails() {
    if (state.selectedEmails.length === 0) return;
    
    // Move emails to trash
    state.selectedEmails.forEach(id => {
        // Find email in current folder
        const folder = emailData[state.currentFolder];
        const emailIndex = folder.findIndex(email => email.id === id);
        
        if (emailIndex !== -1) {
            const email = folder[emailIndex];
            
            // Remove from current folder
            folder.splice(emailIndex, 1);
            
            // Add to trash if not already there (avoid duplicates)
            if (!emailData.trash.find(e => e.id === id)) {
                emailData.trash.unshift(email);
            }
        }
    });
    
    // Clear selection
    state.selectedEmails = [];
    
    // Update UI
    updateBadgeCounts();
    renderEmailList();
    
    // Hide email view if showing deleted email
    if (state.currentEmail && state.selectedEmails.includes(state.currentEmail.id)) {
        emailViewContainer.classList.remove('show');
        if (window.innerWidth <= 1024) {
            emailListContainer.classList.remove('hidden');
        }
    }
    
    // Show confirmation
    alert(`${state.selectedEmails.length} email(s) moved to trash`);
}

// Toggle email star
function toggleEmailStar() {
    if (!state.currentEmail) return;
    
    // Toggle star status
    state.currentEmail.starred = !state.currentEmail.starred;
    
    // Update star icon
    const starIcon = starEmailBtn.querySelector('i');
    starIcon.className = state.currentEmail.starred ? 'fas fa-star starred' : 'far fa-star';
    
    // Update starred folder
    emailData.starred = emailData.inbox.filter(email => email.starred);
    updateBadgeCounts();
    
    // Refresh email list if in starred folder
    if (state.currentFolder === 'starred') {
        renderEmailList();
    }
    
    // Update current email in list if visible
    const emailItem = document.querySelector(`.email-item[data-id="${state.currentEmail.id}"]`);
    if (emailItem) {
        const starElement = emailItem.querySelector('.email-important');
        if (state.currentEmail.starred && !starElement) {
            emailItem.innerHTML += '<div class="email-important"><i class="fas fa-star"></i></div>';
        } else if (!state.currentEmail.starred && starElement) {
            starElement.remove();
        }
    }
}

// Send reply
function sendReply() {
    const replyText = replyInput.value.trim();
    
    if (!replyText) {
        alert('Please enter a reply message');
        return;
    }
    
    if (!state.currentEmail) return;
    
    // Create reply email
    const replyEmail = {
        id: ++state.emailIdCounter,
        sender: "Me",
        email: "john.doe@example.com",
        to: state.currentEmail.email,
        subject: `Re: ${state.currentEmail.subject}`,
        preview: replyText.substring(0, 60) + '...',
        body: `<p>${replyText.replace(/\n/g, '</p><p>')}</p>`,
        time: "Just now",
        date: "Today",
        read: true,
        starred: false,
        avatarColor: "#4285f4",
        avatarText: "JD"
    };
    
    // Add to sent folder
    emailData.sent.unshift(replyEmail);
    
    // Clear reply input
    replyInput.value = '';
    
    // Show confirmation
    alert('Reply sent successfully!');
}

// Update delete button state based on selection
function updateDeleteButtonState() {
    deleteSelectedBtn.disabled = state.selectedEmails.length === 0;
}

// Set up event listeners
function setupEventListeners() {
    // Compose button
    composeBtn.addEventListener('click', composeEmail);
    
    // Close compose modal
    closeComposeBtn.addEventListener('click', () => {
        composeModal.style.display = 'none';
    });
    
    // Send email button
    sendEmailBtn.addEventListener('click', sendEmail);
    
    // Save draft button
    saveDraftBtn.addEventListener('click', saveDraft);
    
    // Discard button
    discardBtn.addEventListener('click', () => {
        if (confirm('Discard this email?')) {
            composeModal.style.display = 'none';
        }
    });
    
    // Refresh button
    refreshBtn.addEventListener('click', () => {
        renderEmailList();
    });
    
    // Select all button
    selectAllBtn.addEventListener('click', () => {
        const checkboxes = document.querySelectorAll('.email-item input[type="checkbox"]');
        const allChecked = Array.from(checkboxes).every(cb => cb.checked);
        
        checkboxes.forEach(cb => {
            cb.checked = !allChecked;
            cb.dispatchEvent(new Event('change'));
        });
    });
    
    // Delete selected button
    deleteSelectedBtn.addEventListener('click', deleteSelectedEmails);
    
    // Folder navigation
    folderItems.forEach(item => {
        item.addEventListener('click', () => {
            // Update active state
            folderItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // Update current folder
            state.currentFolder = item.dataset.folder;
            
            // Clear selection
            state.selectedEmails = [];
            
            // Render emails for this folder
            renderEmailList();
            
            // Hide email view on mobile
            if (window.innerWidth <= 1024) {
                emailViewContainer.classList.remove('show');
                emailListContainer.classList.remove('hidden');
            }
        });
    });
    
    // Search input
    searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        renderEmailList();
    });
    
    // Email view actions
    starEmailBtn.addEventListener('click', toggleEmailStar);
    
    replyEmailBtn.addEventListener('click', () => {
        if (state.currentEmail) {
            composeEmail();
            document.getElementById('composeTo').value = state.currentEmail.email;
            document.getElementById('composeSubject').value = `Re: ${state.currentEmail.subject}`;
            document.getElementById('composeBody').value = `\n\n--- Original Message ---\nFrom: ${state.currentEmail.sender}\nSubject: ${state.currentEmail.subject}\n\n`;
            document.getElementById('composeBody').focus();
        }
    });
    
    deleteEmailBtn.addEventListener('click', () => {
        if (!state.currentEmail) return;
        
        if (confirm('Move this email to trash?')) {
            // Move to trash
            const folder = emailData[state.currentFolder];
            const emailIndex = folder.findIndex(email => email.id === state.currentEmail.id);
            
            if (emailIndex !== -1) {
                const email = folder[emailIndex];
                folder.splice(emailIndex, 1);
                emailData.trash.unshift(email);
                
                // Update UI
                updateBadgeCounts();
                renderEmailList();
                
                // Hide email view
                emailViewContainer.classList.remove('show');
                if (window.innerWidth <= 1024) {
                    emailListContainer.classList.remove('hidden');
                }
                
                alert('Email moved to trash');
            }
        }
    });
    
    // Send reply
    sendReplyBtn.addEventListener('click', sendReply);
    
    // Allow Enter key to send reply
    replyInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            sendReply();
        }
    });
    
    // Close compose modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === composeModal) {
            composeModal.style.display = 'none';
        }
    });
    
    // Back button for mobile view
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && window.innerWidth <= 1024 && 
            emailViewContainer.classList.contains('show')) {
            emailViewContainer.classList.remove('show');
            emailListContainer.classList.remove('hidden');
        }
    });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);