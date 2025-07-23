/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios, { type InternalAxiosRequestConfig } from 'axios';

const URL = 'https://server.aptech.io';

const apiClient = Axios.create({
  baseURL: URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const authStorage = localStorage.getItem('auth-storage') ? JSON.parse(localStorage.getItem('auth-storage')!) : null;

    const access_token = authStorage?.state?.access_token;

    if (config.headers === undefined) {
      config.headers = new Axios.AxiosHeaders();
    }

    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }

    config.headers.Accept = 'application/json';

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if this is a login request - if so, don't redirect automatically
    if (originalRequest.url === '/auth/login') {
      return Promise.reject(error);
    }

    // Check if it's an auth error (401 or 403) and redirect to login
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.error('Authentication failed, redirecting to login');
      localStorage.removeItem('auth-storage');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // For all other errors, just reject
    return Promise.reject(error);
  }
);

export default apiClient;
