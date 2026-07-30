import api from './axios';

/**
 * Admin API Service
 */

export const getAdminStatsApi = async () => {
  const response = await api.get('/admin/stats');
  return response.data;
};

export const getAdminUsersApi = async (params = {}) => {
  const response = await api.get('/admin/users', { params });
  return response.data;
};

export const updateUserRoleApi = async (userId, role) => {
  const response = await api.put(`/admin/users/${userId}/role`, { role });
  return response.data;
};

export const toggleUserBlockApi = async (userId) => {
  const response = await api.put(`/admin/users/${userId}/toggle-block`);
  return response.data;
};

export const deleteUserApi = async (userId) => {
  const response = await api.delete(`/admin/users/${userId}`);
  return response.data;
};

export const adminDeleteHackathonApi = async (hackathonId) => {
  const response = await api.delete(`/admin/hackathons/${hackathonId}`);
  return response.data;
};

export const getAdminTeamsApi = async (params = {}) => {
  const response = await api.get('/admin/teams', { params });
  return response.data;
};

export const getAdminSubmissionsApi = async (params = {}) => {
  const response = await api.get('/admin/submissions', { params });
  return response.data;
};
