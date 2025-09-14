import axios from "axios";
import { toast } from 'react-toastify';
import { useAuthStore } from "../store/userAuthStore";

const API_URI = import.meta.env.VITE_API_URI;

const apiClient = axios.create({
  baseURL: API_URI,
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore.getState();
    const token = authStore.accessToken; 

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore.getState();
      authStore.logout(); // Clear auth data
      toast.error("Session expired. Please login again.");

      if (typeof window !== 'undefined') {
        window.location.href = '/signin';
      }
    }

    return Promise.reject(error);
  }
);

export { apiClient };