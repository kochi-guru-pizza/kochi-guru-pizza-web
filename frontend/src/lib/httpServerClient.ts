// src/lib/httpServerClient.ts
import { ApiError } from "@lib/ApiError";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/v1";

/**
 * Server-side HTTP client with automatic retries for resilient fetching.
 * Designed for use in Next.js App Router Server Components.
 */
export const httpServerClient = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_URL}${endpoint}`;
  const MAX_ATTEMPTS = 4;
  let retryDelay = 1000;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    // Normalize headers using Headers API
    const headers = new Headers(options.headers);

    // Set default Content-Type if not provided
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { error: "Unknown error" };
        }

        throw new ApiError(
          errorData.error || `HTTP error! status: ${response.status}`,
          response.status,
          errorData.details
        );
      }

      try {
        return await response.json();
      } catch {
        throw new Error("Failed to parse JSON response");
      }
    } catch (error) {
      const isClientError =
        error instanceof ApiError && error.status >= 400 && error.status < 500;

      // Don't retry if it's a client error (e.g., 4xx)
      if (isClientError) {
        throw error;
      }

      // Wait before retrying (Exponential backoff)
      await new Promise((res) => setTimeout(res, retryDelay));
      retryDelay *= 2;
    }
  }

  throw new Error("Network error");
};
