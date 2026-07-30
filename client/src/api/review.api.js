import api from './axios';

export const submitEvaluationApi = async (reviewData) => {
  const response = await api.post('/reviews', reviewData);
  return response.data;
};

export const getJudgingQueueApi = async (hackathonId = '') => {
  const response = await api.get(`/reviews/queue/${hackathonId}`);
  return response.data;
};
