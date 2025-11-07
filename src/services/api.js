import api from '../utils/api';

export const fetchHeroContent = async () => {
  const { data } = await api.get('/content/hero');
  return data;
};

export const fetchDiseases = async () => {
  const { data } = await api.get('/content/diseases');
  return data;
};

export const fetchBoosters = async () => {
  const { data } = await api.get('/content/boosters');
  return data;
};

export const fetchBlogPosts = async () => {
  const { data } = await api.get('/content/blog');
  return data;
};

export const registerPatient = async payload => {
  const { data } = await api.post('/auth/register', payload);
  return data;
};

export const loginPatient = async payload => {
  const { data } = await api.post('/auth/login', payload);
  return data;
};

export const getPatientProfile = async () => {
  const { data } = await api.get('/patient/profile');
  return data;
};

export default api;
