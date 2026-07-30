import api from './axios';

export const getLeaderboardApi = async (hackathonId = '') => {
  const response = await api.get(`/leaderboard/${hackathonId}`);
  return response.data;
};
