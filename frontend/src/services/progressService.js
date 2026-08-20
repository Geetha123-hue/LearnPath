import API from './api';

export const fetchUserProgress = async () => {
  const response = await API.get('/progress');
  return response.data;
};

export const enrollInPath = async (pathId) => {
  const response = await API.post(`/progress/enroll/${pathId}`);
  return response.data;
};

export const toggleStepCompletion = async (stepId) => {
  const response = await API.post('/progress/toggle-step', { stepId });
  return response.data;
};
