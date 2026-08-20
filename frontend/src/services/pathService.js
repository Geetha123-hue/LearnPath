import API from './api';

export const fetchAllPaths = async () => {
  const response = await API.get('/paths');
  return response.data.paths;
};

export const fetchPathById = async (id) => {
  const response = await API.get(`/paths/${id}`);
  return response.data.path;
};

export const createLearningPath = async (pathData) => {
  const response = await API.post('/paths', pathData);
  return response.data;
};
