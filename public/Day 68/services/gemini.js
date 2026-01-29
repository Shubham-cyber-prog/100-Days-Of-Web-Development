const API_URL ="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=Your_API_key_here";

// Retry configuration
const RETRY_CONFIG = {
  maxRetries: 3,
  initialDelay: 1000, // 1 second
  maxDelay: 5000 // 5 seconds
};

/**
 * Exponential backoff retry mechanism
 */
async function retryWithBackoff(fn, retries = RETRY_CONFIG.maxRetries) {
  let lastError;
  
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      // Don't retry on certain errors (auth, invalid requests)
      if (error.status === 401 || error.status === 403 || error.status === 400) {
        throw error;
      }
      
      // Exponential backoff
      if (i < retries - 1) {
        const delay = Math.min(
          RETRY_CONFIG.initialDelay * Math.pow(2, i),
          RETRY_CONFIG.maxDelay
        );
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
}

/**
 * Handle API errors and provide user-friendly messages
 */
function getErrorMessage(error) {
  if (!navigator.onLine) {
    return "You are offline. Please check your internet connection.";
  }
  
  if (error.status === 401 || error.status === 403) {
    return "API key is invalid or expired. Please check your configuration.";
  }
  
  if (error.status === 429) {
    return "Rate limit exceeded. Please wait a moment and try again.";
  }
  
  if (error.status === 500 || error.status === 503) {
    return "The service is temporarily unavailable. Please try again later.";
  }
  
  if (error.message && error.message.includes("Failed to fetch")) {
    return "Failed to connect to the AI service. Please check your internet connection.";
  }
  
  return "An error occurred while processing your request. Please try again.";
}

export async function askGemini(text, imageBase64 = null) {
  // Validate API key
  if (!API_URL || API_URL.includes("Your_API_key_here")) {
    const errorMsg = "API key is not configured. Please set your Gemini API key.";
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  // Validate input
  if (!text && !imageBase64) {
    throw new Error("Please provide text or an image to process.");
  }

  const parts = [];

  if (text) {
    parts.push({ text: String(text).trim() });
  }

  if (imageBase64) {
    try {
      parts.push({
        inline_data: {
          mime_type: "image/png",
          data: imageBase64
        }
      });
    } catch (error) {
      console.error("Invalid image data:", error);
      throw new Error("Invalid image format. Please provide a valid PNG image.");
    }
  }

  try {
    const response = await retryWithBackoff(async () => {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts
            }
          ]
        }),
        signal: AbortSignal.timeout(30000) // 30 second timeout
      });

      if (!res.ok) {
        const error = new Error(`API Error: ${res.status} ${res.statusText}`);
        error.status = res.status;
        throw error;
      }

      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response format from server');
      }

      return res;
    });

    const data = await response.json();
    
    // Validate response structure
    if (!data || !data.candidates || !Array.isArray(data.candidates)) {
      console.error("Invalid API response structure:", data);
      throw new Error("Received invalid response from the AI service.");
    }

    const textContent = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!textContent) {
      console.warn("Empty response from Gemini API");
      return "⚠️ The AI service returned an empty response. Please try again.";
    }

    return textContent;
    
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    const userMessage = getErrorMessage(error);
    throw new Error(userMessage);
  }
}
