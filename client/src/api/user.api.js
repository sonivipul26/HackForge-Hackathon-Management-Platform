import api from './axios';

/**
 * User Management API Service
 */

export const updateProfileApi = async (profileData) => {
  const response = await api.put('/users/profile', profileData);
  return response.data;
};

export const changePasswordApi = async (passwordData) => {
  const response = await api.put('/users/change-password', passwordData);
  return response.data;
};

export const getAllUsersApi = async () => {
  const response = await api.get('/users');
  return response.data;
};
