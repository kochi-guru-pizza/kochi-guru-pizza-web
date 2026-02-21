// src/lib/httpClient.ts
import { ApiError } from "@lib/ApiError";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/v1";

// Token storage keys
const ACCESS_TOKEN_KEY = "kochi_access_token";
const REFRESH_TOKEN_KEY = "kochi_refresh_token";

/**
 * Get access token from localStorage
 */
export const getAccessToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

/**
 * Get refresh token from localStorage
 */
export const getRefreshToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * Set access token in localStorage
 */
export const setAccessToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }
};

/**
 * Set refresh token in localStorage
 */
export const setRefreshToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  }
};

/**
 * Set both tokens in localStorage
 */
export const setTokens = (accessToken: string, refreshToken: string): void => {
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);
};

/**
 * Clear all tokens from localStorage
 */
export const clearTokens = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
};

/**
 * Base HTTP client with automatic token refresh
 */
export const httpClient = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_URL}${endpoint}`;
  const accessToken = getAccessToken();

  // Add authorization header if token exists
  // Normalize headers using Headers API
  const headers = new Headers(options.headers);

  // Set default Content-Type if not provided
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  // Add authorization header if token exists
  if (accessToken && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    // Handle 401 - Token expired, try to refresh
    // Skip for login endpoint to avoid page refresh loop on invalid credentials
    if (
      response.status === 401 &&
      !endpoint.includes("/auth/login") &&
      !endpoint.includes("/auth/register")
    ) {
      const refreshToken = getRefreshToken();

      if (refreshToken) {
        try {
          // Try to refresh the access token
          const refreshResponse = await fetch(`${API_URL}/auth/refresh`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ refreshToken })
          });

          if (refreshResponse.ok) {
            const {
              accessToken: newAccessToken,
              refreshToken: newRefreshToken
            } = await refreshResponse.json();
            setTokens(newAccessToken, newRefreshToken);

            // Retry original request with new token
            // Retry original request with new token
            headers.set("Authorization", `Bearer ${newAccessToken}`);
            const retryResponse = await fetch(url, {
              ...options,
              headers
            });

            if (!retryResponse.ok) {
              throw new Error(`HTTP error! status: ${retryResponse.status}`);
            }

            return retryResponse.json();
          } else {
            // Refresh failed, clear tokens and throw error
            clearTokens();
            if (typeof window !== "undefined") window.location.href = "/login";
            throw new Error("Session expired. Please login again.");
          }
        } catch {
          clearTokens();
          if (typeof window !== "undefined") window.location.href = "/login";
          throw new Error("Session expired. Please login again.");
        }
      } else {
        // No refresh token, clear tokens
        clearTokens();
        if (typeof window !== "undefined") window.location.href = "/login";
        throw new Error("Unauthorized");
      }
    }

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: "Unknown error" }));

      if (response.status === 400 && errorData.details) {
        throw new ApiError(errorData.error, response.status, errorData.details);
      }

      throw new Error(
        errorData.error || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};
