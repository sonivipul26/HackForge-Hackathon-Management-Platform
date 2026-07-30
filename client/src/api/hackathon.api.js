import api from './axios';

export const createHackathonApi = async (hackathonData) => {
  const response = await api.post('/hackathons', hackathonData);
  return response.data;
};

export const getHackathonsApi = async (params = {}) => {
  const response = await api.get('/hackathons', { params });
  return response.data;
};

export const getHackathonByIdApi = async (idOrSlug) => {
  const response = await api.get(`/hackathons/${idOrSlug}`);
  return response.data;
};

export const updateHackathonApi = async (id, hackathonData) => {
  const response = await api.put(`/hackathons/${id}`, hackathonData);
  return response.data;
};

export const deleteHackathonApi = async (id) => {
  const response = await api.delete(`/hackathons/${id}`);
  return response.data;
};

export const getMyHostedEventsApi = async () => {
  const response = await api.get('/hackathons/organizer/my-events');
  return response.data;
};

export const getMyEventsApi = getMyHostedEventsApi;

export const assignJudgeApi = async (hackathonId, judgeId) => {
  const response = await api.post(`/hackathons/${hackathonId}/judges`, { judgeId });
  return response.data;
};

export const removeJudgeApi = async (hackathonId, judgeId) => {
  const response = await api.delete(`/hackathons/${hackathonId}/judges/${judgeId}`);
  return response.data;
};

export const toggleRegistrationStatusApi = async (hackathonId) => {
  const response = await api.put(`/hackathons/${hackathonId}/toggle-registration`);
  return response.data;
};
