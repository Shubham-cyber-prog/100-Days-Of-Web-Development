# Authentication System Testing Guide

## Fixed Issues

- ✅ Removed conflicting localStorage keys (`isLoggedIn`, `isGuest`)
- ✅ Added `await` for all async operations
- ✅ Added 100ms delay before redirects to ensure storage commits
- ✅ Added comprehensive debug logging
- ✅ Fixed error message property names

## How to Test

### 1. Registration Flow

1. Open `http://localhost/100-Days-Of-Web-Development-ECWoC26/website/pages/login.html`
2. Click "Register" tab
3. Fill in:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
   - Confirm Password: password123
4. Click "Create Academy ID"
5. ✅ Should see alert: "Registration successful! Welcome to Academy."
6. ✅ Should auto-redirect to dashboard after ~100ms
7. ✅ Open DevTools Console - should see green checkmarks and auth state

### 2. Login Flow (Remember Me = OFF)

1. Go to login page
2. Enter:
   - Email: test@example.com
   - Password: password123
3. Leave "Remember Me" **unchecked**
4. Click "Join Now"
5. ✅ Should redirect to dashboard
6. Check Console - should show `sessionAuth: 'true'`, `localAuth: null`
7. Close browser completely
8. Reopen and go to dashboard
9. ❌ Should redirect back to login (session-only auth expired)

### 3. Login Flow (Remember Me = ON)

1. Go to login page
2. Enter credentials
3. **Check** "Remember Me"
4. Click "Join Now"
5. ✅ Should redirect to dashboard
6. Check Console - should show both `sessionAuth: 'true'` and `localAuth: 'true'`
7. Close browser completely
8. Reopen and go to dashboard
9. ✅ Should stay on dashboard (persistent auth via localStorage)

### 4. Guest Login Flow

1. Go to login page
2. Click "Try as Guest" button
3. ✅ Should see alert: "Welcome! You are now in guest mode."
4. ✅ Should redirect to dashboard
5. Check Console - should show `guestFlag: 'true'`
6. Dashboard should show guest user notification

### 5. Logout Flow

1. While logged in, click logout button
2. ✅ Should see confirm dialog: "Abort mission and logout?"
3. Click OK
4. ✅ Should clear all auth data
5. ✅ Should redirect to login page
6. Check Console - all auth keys should be cleared

## Debug Console Commands

While on any page, open Console and type:

```javascript
// Check current auth state
console.log({
  sessionAuth: sessionStorage.getItem("isAuthenticated"),
  localAuth: localStorage.getItem("isAuthenticated"),
  currentUser: sessionStorage.getItem("current_user"),
  isGuest: sessionStorage.getItem("is_guest"),
});

// Check if AuthService is loaded
console.log("AuthService loaded:", !!window.AuthService);

// Manual auth check
if (window.AuthService) {
  console.log("Is authenticated:", window.AuthService.isAuthenticated());
  console.log("Is guest:", window.AuthService.isGuest());
  console.log("Current user:", window.AuthService.getCurrentUser());
}

// View all registered users (only in demo/local mode!)
JSON.parse(localStorage.getItem("app_users") || "[]");
```

## Expected Console Output

### Successful Login:

```
🔐 AuthService loaded
🔐 Attempting login...
✅ Login successful, redirecting to dashboard...
📊 Auth state: {
  sessionAuth: "true",
  localAuth: "true",  // or null if Remember Me unchecked
  currentUser: "{...user data...}"
}
```

### Successful Guest Login:

```
👤 Guest login initiated...
✅ Guest login successful
📊 Auth state: {
  sessionAuth: "true",
  guestFlag: "true"
}
```

## Troubleshooting

### Problem: Still redirecting back to login after login

**Solution**: Open DevTools > Application > Storage

- Clear all localStorage
- Clear all sessionStorage
- Reload page and try again

### Problem: "Authentication system loading..."

**Solution**: Wait 1-2 seconds for AuthService to load, then try again

### Problem: Registration fails

**Check**:

- Email format is valid
- Password is at least 6 characters
- Passwords match
- Email doesn't already exist (clear `app_users` from localStorage to reset)

### Problem: Redirect loop between login and dashboard

**Check Console for**:

- Multiple guard.js loads
- AuthService loading errors
- Storage permission errors

## Clean Slate Reset

To completely reset the auth system:

```javascript
// Run in Console
localStorage.clear();
sessionStorage.clear();
location.reload();
```

Then register a new account.
