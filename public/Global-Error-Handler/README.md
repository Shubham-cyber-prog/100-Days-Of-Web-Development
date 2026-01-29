# Global Error Handler

A comprehensive, reusable error handling system for the 100 Days of Web Development project. This module provides centralized error handling for API failures, network issues, resource loading errors, and unhandled JavaScript exceptions.

## 📋 Features

- ✅ **Automatic Error Detection**: Catches uncaught errors and promise rejections
- 🌐 **Network Monitoring**: Detects online/offline status changes
- 🔄 **Automatic Retry**: Built-in retry logic with exponential backoff
- 📊 **Error Logging**: Console logging and optional server-side logging
- 🎨 **Beautiful Error Page**: User-friendly error display with different states
- 📱 **Fully Responsive**: Works on all devices
- 🌙 **Dark Mode Support**: Automatic dark mode detection
- ♿ **Accessible**: WCAG compliant with keyboard navigation

## 🚀 Quick Start

### Basic Usage

Add these lines to any HTML file:

```html
<!-- Add to the <head> section -->
<script src="../Global-Error-Handler/ErrorHandler.js"></script>

<!-- Initialize in your script -->
<script>
  // Initialize the error handler
  const errorHandler = new ErrorHandler({
    enableLogging: true,
    redirectToErrorPage: true,
    errorPageUrl: '../Global-Error-Handler/error.html'
  });
</script>
```

That's it! The error handler is now active and will automatically:
- Catch all JavaScript errors
- Monitor network connectivity
- Intercept failed API calls
- Redirect to the error page when needed

## 📚 Usage Examples

### Example 1: Day 10 Recipe App (API Integration)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Recipe App</title>
    <script src="../Global-Error-Handler/ErrorHandler.js"></script>
</head>
<body>
    <div id="recipes"></div>
    
    <script>
        // Initialize error handler
        const errorHandler = new ErrorHandler({
            enableLogging: true,
            logEndpoint: 'https://your-logging-service.com/log' // Optional
        });

        // Fetch recipes with automatic error handling
        async function fetchRecipes() {
            try {
                // The error handler automatically intercepts this
                const response = await fetch('https://api.edamam.com/recipes');
                const data = await response.json();
                displayRecipes(data);
            } catch (error) {
                // Error is already logged and handled
                // Show fallback UI
                document.getElementById('recipes').innerHTML = 
                    '<p>Unable to load recipes. Please try again.</p>';
            }
        }

        // Or use the built-in retry method
        async function fetchRecipesWithRetry() {
            try {
                const response = await errorHandler.handleAPIError(
                    'https://api.edamam.com/recipes',
                    { maxRetries: 3, retryDelay: 1000 }
                );
                const data = await response.json();
                displayRecipes(data);
            } catch (error) {
                // All retries failed
                console.error('Failed to fetch recipes');
            }
        }

        fetchRecipes();
    </script>
</body>
</html>
```

### Example 2: Day 40 Movie Database (Custom Error Handling)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Movie Database</title>
    <script src="../Global-Error-Handler/ErrorHandler.js"></script>
</head>
<body>
    <div id="movies"></div>
    
    <script>
        // Initialize with custom options
        const errorHandler = new ErrorHandler({
            enableLogging: true,
            redirectToErrorPage: false, // Handle errors inline
            errorPageUrl: '../Global-Error-Handler/error.html'
        });

        // Listen to global error events
        window.addEventListener('globalError', (event) => {
            const error = event.detail;
            
            if (error.type === 'API_ERROR') {
                showInlineError('Unable to load movies. Please try again.');
            } else if (error.type === 'NETWORK_ERROR') {
                showInlineError('No internet connection. Check your network.');
            }
        });

        async function searchMovies(query) {
            const loadingEl = document.getElementById('loading');
            const moviesEl = document.getElementById('movies');
            
            loadingEl.style.display = 'block';
            
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/search/movie?query=${query}`
                );
                
                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }
                
                const data = await response.json();
                displayMovies(data.results);
            } catch (error) {
                // Show fallback UI instead of redirecting
                moviesEl.innerHTML = `
                    <div class="error-message">
                        <p>Unable to load movies</p>
                        <button onclick="searchMovies('${query}')">Retry</button>
                    </div>
                `;
            } finally {
                loadingEl.style.display = 'none';
            }
        }

        function showInlineError(message) {
            errorHandler.showToast(message, 'error');
        }
    </script>
</body>
</html>
```

### Example 3: Day 70 Data Visualization (Offline Detection)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Data Visualization</title>
    <script src="../Global-Error-Handler/ErrorHandler.js"></script>
</head>
<body>
    <div id="chart"></div>
    
    <script>
        const errorHandler = new ErrorHandler({
            enableLogging: true
        });

        // Check connection status before fetching
        async function loadChartData() {
            if (!errorHandler.checkOnlineStatus()) {
                errorHandler.showToast(
                    'You are offline. Data cannot be loaded.',
                    'warning'
                );
                loadCachedData();
                return;
            }

            try {
                const response = await errorHandler.handleAPIError(
                    'https://api.example.com/data',
                    { maxRetries: 2 }
                );
                const data = await response.json();
                renderChart(data);
                cacheData(data);
            } catch (error) {
                loadCachedData();
            }
        }

        function loadCachedData() {
            const cached = localStorage.getItem('chartData');
            if (cached) {
                renderChart(JSON.parse(cached));
                errorHandler.showToast(
                    'Showing cached data',
                    'warning'
                );
            }
        }

        function cacheData(data) {
            localStorage.setItem('chartData', JSON.stringify(data));
        }

        loadChartData();
    </script>
</body>
</html>
```

### Example 4: Custom Error Handling

```javascript
// Initialize error handler
const errorHandler = new ErrorHandler({
    enableLogging: true,
    redirectToErrorPage: false
});

// Handle specific errors manually
try {
    const result = riskyOperation();
} catch (error) {
    errorHandler.handleError({
        type: 'CUSTOM_ERROR',
        message: 'Something went wrong in riskyOperation',
        error: error,
        timestamp: new Date().toISOString()
    }, false); // false = don't redirect
}

// Use toast notifications
errorHandler.showToast('Profile updated successfully!', 'success');
errorHandler.showToast('Please fill all required fields', 'warning');
errorHandler.showToast('Failed to save changes', 'error');

// Get error history for debugging
const errors = errorHandler.getErrorHistory();
console.log('Recent errors:', errors);

// Clear error history
errorHandler.clearErrorHistory();
```

## ⚙️ Configuration Options

```javascript
const errorHandler = new ErrorHandler({
    // Enable/disable console logging
    enableLogging: true, // default: true
    
    // Server endpoint for error logging
    logEndpoint: 'https://your-api.com/logs', // default: null
    
    // Automatically redirect to error page
    redirectToErrorPage: true, // default: true
    
    // Path to error page
    errorPageUrl: '../Global-Error-Handler/error.html', // default: '../Global-Error-Handler/error.html'
});
```

## 🎯 Error Types

The error handler recognizes and handles these error types:

| Error Type | Description | Example |
|------------|-------------|---------|
| `NETWORK_ERROR` | Network connectivity issues | No internet, DNS failure |
| `API_ERROR` | HTTP errors from API calls | 404, 500, 401, etc. |
| `RUNTIME_ERROR` | JavaScript runtime errors | TypeError, ReferenceError |
| `PROMISE_REJECTION` | Unhandled promise rejections | Async errors |
| `CUSTOM_ERROR` | Application-specific errors | Custom error scenarios |

## 📖 API Reference

### ErrorHandler Class

#### Constructor
```javascript
new ErrorHandler(options)
```

#### Methods

##### `handleError(error, redirect = true)`
Manually handle an error.

```javascript
errorHandler.handleError({
    type: 'API_ERROR',
    message: 'Failed to load data',
    status: 500,
    timestamp: new Date().toISOString()
}, true);
```

##### `handleAPIError(url, options, retryCount = 0)`
Fetch with automatic retry logic.

```javascript
const response = await errorHandler.handleAPIError(
    'https://api.example.com/data',
    { maxRetries: 3, retryDelay: 1000 }
);
```

##### `showToast(message, type = 'error')`
Display a toast notification.

```javascript
errorHandler.showToast('Operation successful!', 'success');
errorHandler.showToast('Warning message', 'warning');
errorHandler.showToast('Error occurred', 'error');
```

##### `getErrorHistory()`
Get all logged errors.

```javascript
const errors = errorHandler.getErrorHistory();
```

##### `clearErrorHistory()`
Clear error history.

```javascript
errorHandler.clearErrorHistory();
```

##### `checkOnlineStatus()`
Check current online status.

```javascript
if (errorHandler.checkOnlineStatus()) {
    console.log('Online');
}
```

## 🎨 Error Page Features

The error page (`error.html`) provides:

- **Dynamic Error Display**: Shows error type, message, and details
- **Retry Functionality**: One-click retry with loading state
- **Navigation Options**: Go back, go home, or retry
- **Technical Details**: Collapsible technical information
- **Connection Status**: Real-time online/offline indicator
- **Error Reporting**: Copy error details to clipboard
- **Suggestions**: Context-aware troubleshooting tips

## 🔧 Integration Guide

### Step 1: Copy Files
Copy the `Global-Error-Handler` folder to your `public` directory.

### Step 2: Include Script
Add the error handler script to your HTML:

```html
<script src="../Global-Error-Handler/ErrorHandler.js"></script>
```

### Step 3: Initialize
Initialize the error handler:

```javascript
const errorHandler = new ErrorHandler();
```

### Step 4: Done!
All errors are now automatically handled!

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari 14+, Chrome Mobile 90+)

## 📝 Best Practices

1. **Initialize Early**: Add the error handler script at the top of your page
2. **Don't Redirect Always**: Set `redirectToErrorPage: false` for inline error handling
3. **Use Retry Logic**: Use `handleAPIError()` for critical API calls
4. **Cache Data**: Implement caching for offline functionality
5. **Show Feedback**: Use toast notifications for user feedback
6. **Log Errors**: Enable logging and optionally send to a server
7. **Test Offline**: Test your app in offline mode
8. **Handle Gracefully**: Provide fallback UI for failed operations

## 🐛 Troubleshooting

### Error page not showing
- Check the `errorPageUrl` path is correct
- Ensure `redirectToErrorPage` is set to `true`

### Errors not being caught
- Make sure the script is loaded before your application code
- Check browser console for initialization errors

### Toast notifications not appearing
- Ensure no CSS conflicts with positioning
- Check z-index of other elements

## 📄 License

This error handler is part of the 100 Days of Web Development project.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Need Help?** Check the examples in the `examples` folder or open an issue on GitHub.
