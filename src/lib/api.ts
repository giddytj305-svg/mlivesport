// src/lib/api.ts

const API_BASE = "https://apiskeith.vercel.app";

interface FetchOptions extends RequestInit {
  retries?: number;
  retryDelay?: number;
}

// Helper to delay execution
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchAPI<T>(
  endpoint: string, 
  options: FetchOptions = {}
): Promise<T | null> {
  const { retries = 2, retryDelay = 1000, ...fetchOptions } = options;
  const url = endpoint.startsWith("http") ? endpoint : `${API_BASE}${endpoint}`;

  try {
    const res = await fetch(url, {
      ...fetchOptions,
      headers: {
        "Content-Type": "application/json",
        ...fetchOptions.headers,
      },
      next: { revalidate: 60 }, // ISR default for server components
    });

    if (!res.ok) {
      if (retries > 0 && res.status >= 500) {
        await sleep(retryDelay);
        return fetchAPI<T>(endpoint, { ...options, retries: retries - 1 });
      }
      throw new Error(`API Error: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`[Fetch Failed] ${endpoint}:`, error);
    
    // Retry logic for network errors
    if (retries > 0) {
      await sleep(retryDelay);
      return fetchAPI<T>(endpoint, { ...options, retries: retries - 1 });
    }
    
    // Return null instead of crashing the app
    return null;
  }
}
