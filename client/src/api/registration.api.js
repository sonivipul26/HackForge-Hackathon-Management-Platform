import api from './axios';

export const registerParticipantApi = async (registrationData) => {
  const response = await api.post('/registrations', registrationData);
  return response.data;
};

export const getMyRegistrationsApi = async () => {
  const response = await api.get('/registrations/my');
  return response.data;
};

export const cancelRegistrationApi = async (hackathonId) => {
  const response = await api.put(`/registrations/cancel/${hackathonId}`);
  return response.data;
};

export const getHackathonRegistrationsApi = async (hackathonId) => {
  const response = await api.get(`/registrations/hackathon/${hackathonId}`);
  return response.data;
};

export const updateRegistrationStatusApi = async (registrationId, status) => {
  const response = await api.put(`/registrations/${registrationId}/status`, { status });
  return response.data;
};
