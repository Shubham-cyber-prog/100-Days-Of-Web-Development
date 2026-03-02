import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

const supabaseUrl = `https://${projectId}.supabase.co`;

// Create singleton Supabase client
export const supabase = createClient(supabaseUrl, publicAnonKey);

// API base URL
export const API_BASE_URL = `${supabaseUrl}/functions/v1/make-server-74f6a23f`;

// Helper function to get auth headers
export const getAuthHeaders = (token?: string) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  } else {
    headers['Authorization'] = `Bearer ${publicAnonKey}`;
  }

  return headers;
};

// API request helper
export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = getAuthHeaders(token);

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      // Don't log 401 errors for /auth/me as they're expected when not authenticated
      if (!(response.status === 401 && endpoint === '/auth/me')) {
        console.error(`API Error [${endpoint}]:`, data.error || response.statusText);
      }
      throw new Error(data.error || `Request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    // Don't log 401 errors for /auth/me as they're expected when not authenticated
    if (!(error instanceof Error && error.message.includes('401') && endpoint === '/auth/me')) {
      console.error(`API Request failed [${endpoint}]:`, error);
    }
    throw error;
  }
}