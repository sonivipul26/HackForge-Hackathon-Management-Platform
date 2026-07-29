import axios from 'axios';

/**
 * Pre-configured Axios Instance
 *
 * Why a custom instance?
 * - Centralized base URL (no repeating 'http://localhost:5000' everywhere)
 * - Interceptors for auth tokens (added in Phase 2)
 * - Centralized error handling
 * - Easy to swap base URL for production
 *
 * The baseURL is '/api/v1' because Vite's dev proxy forwards
 * '/api' requests to the Express backend (see vite.config.js).
 * In production, both would be served from the same domain.
 */
const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// ─── Request Interceptor ────────────────────────────────────
// Will be used in Phase 2 to attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ─── Response Interceptor ───────────────────────────────────
// Centralized error handling for all API responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common error scenarios
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        // Token expired or invalid — will redirect to login in Phase 2
        localStorage.removeItem('token');
      }

      if (status === 429) {
        console.warn('Rate limit exceeded. Please wait before making more requests.');
      }
    }

    return Promise.reject(error);
  }
);

export default api;
