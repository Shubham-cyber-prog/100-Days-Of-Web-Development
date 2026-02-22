import { QueryClient, QueryFunction } from "@tanstack/react-query";

/**
 * Enhanced response validation with detailed error messages
 */
async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    let text = "";
    try {
      text = (await res.text()) || res.statusText;
    } catch (err) {
      text = "Unable to parse error response";
    }

    // Provide specific error message based on status code
    const errorMessages: Record<number, string> = {
      400: "Bad Request - Invalid data sent",
      401: "Unauthorized - Please log in again",
      403: "Forbidden - You don't have permission",
      404: "Not Found - Resource doesn't exist",
      409: "Conflict - Data conflict",
      429: "Rate Limited - Too many requests",
      500: "Server Error - Please try again later",
      503: "Service Unavailable - Server is down",
    };

    const userMsg = errorMessages[res.status] || `HTTP ${res.status}`;
    throw new Error(`${userMsg}: ${text}`);
  }
}

/**
 * Fetch with retry logic and timeout
 */
async function fetchWithRetry(
  input: RequestInfo | URL,
  init?: RequestInit,
  retries: number = 3
): Promise<Response> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

      const response = await fetch(input, {
        ...init,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      lastError = error;

      const isRetryable =
        error instanceof TypeError ||
        error.name === "AbortError" ||
        error.message.includes("Network");

      if (attempt < retries && isRetryable) {
        console.warn(
          `Retry attempt ${attempt}/${retries}:`,
          error.message
        );
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
        continue;
      }

      throw error;
    }
  }

  throw lastError || new Error("Unknown error");
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  try {
    const res = await fetchWithRetry(url, {
      method,
      headers: data ? { "Content-Type": "application/json" } : {},
      body: data ? JSON.stringify(data) : undefined,
      credentials: "include",
    });

    await throwIfResNotOk(res);
    return res;
  } catch (error) {
    console.error(`API request failed: ${method} ${url}`, error);
    throw error;
  }
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    try {
      const res = await fetchWithRetry(queryKey[0] as string, {
        credentials: "include",
      });

      if (unauthorizedBehavior === "returnNull" && res.status === 401) {
        console.warn("Unauthorized: returning null");
        return null;
      }

      await throwIfResNotOk(res);

      const contentType = res.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        throw new Error("Invalid response format: expected JSON");
      }

      return await res.json();
    } catch (error) {
      console.error(`Query failed for ${queryKey[0]}`, error);
      throw error;
    }
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: 2, // Enable retry for failed queries
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});
