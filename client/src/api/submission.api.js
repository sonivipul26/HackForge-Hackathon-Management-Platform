import api from './axios';

export const createSubmissionApi = async (submissionData) => {
  const response = await api.post('/submissions', submissionData);
  return response.data;
};

export const getSubmissionsApi = async (params = {}) => {
  const response = await api.get('/submissions', { params });
  return response.data;
};

export const getSubmissionByIdApi = async (id) => {
  const response = await api.get(`/submissions/${id}`);
  return response.data;
};
