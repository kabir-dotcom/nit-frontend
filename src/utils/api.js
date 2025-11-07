import axios from 'axios';

const trimTrailingSlash = url => (typeof url === 'string' ? url.replace(/\/$/, '') : url);

const resolveBaseURL = () => {
  const explicit = import.meta.env.VITE_API_URL;
  if (explicit) {
    return trimTrailingSlash(explicit);
  }

  if (import.meta.env.DEV) {
    // Use Vite proxy (`/api`) when no explicit URL is provided to dodge CORS in dev.
    return '/api';
  }

  const origin =
    typeof window !== 'undefined' && window.location?.origin ? window.location.origin : '';
  return `${trimTrailingSlash(origin)}/api`;
};

const baseURL = resolveBaseURL();

const api = axios.create({
  baseURL,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT || 10000),
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: status => status >= 200 && status < 300,
});

api.interceptors.request.use(
  config => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ECONNABORTED') {
      console.error('API timeout:', error.message);
    }

    if (!error.response) {
      console.error('Network/CORS issue while reaching API:', error.message);
    }

    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.dispatchEvent(new Event('auth-change'));
    }

    return Promise.reject(error);
  }
);

export const checkHealth = () => api.get('/health');
export const sendChatMessage = payload => api.post('/chat', payload);

export default api;
