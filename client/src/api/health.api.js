import api from './axios';

/**
 * Health Check API Service
 *
 * Calls the backend GET /api/v1/health endpoint.
 * Returns the operational status and database connection state.
 */
export const checkHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};
