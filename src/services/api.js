import axios from 'axios';

const fallbackBaseUrl = import.meta.env.DEV
  ? '/api'
  : 'https://nit-backend.vercel.app/api';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || fallbackBaseUrl,
  timeout: 10000,
});

api.interceptors.request.use(config => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    console.error('API error:', error.message);
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.dispatchEvent(new Event('auth-change'));
    }
    return Promise.reject(error);
  }
);

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
