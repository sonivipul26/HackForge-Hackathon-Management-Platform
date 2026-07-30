import api from './axios';

export const createTeamApi = async (teamData) => {
  const response = await api.post('/teams', teamData);
  return response.data;
};

export const joinTeamApi = async (joinCode) => {
  const response = await api.post('/teams/join', { joinCode });
  return response.data;
};

export const getMyTeamApi = async (hackathonId) => {
  const response = await api.get(`/teams/my/${hackathonId}`);
  return response.data;
};

export const leaveTeamApi = async (teamId) => {
  const response = await api.put(`/teams/${teamId}/leave`);
  return response.data;
};

export const removeTeamMemberApi = async (teamId, memberId) => {
  const response = await api.delete(`/teams/${teamId}/members/${memberId}`);
  return response.data;
};

export const transferLeadershipApi = async (teamId, newLeaderId) => {
  const response = await api.put(`/teams/${teamId}/transfer-leadership`, { newLeaderId });
  return response.data;
};

export const deleteTeamApi = async (teamId) => {
  const response = await api.delete(`/teams/${teamId}`);
  return response.data;
};
