import axios from 'axios';
import { parseApiError } from './api/error';

export const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const parsedError = parseApiError(error)

    // Auth failure handling ONLY
    if (parsedError.status === 401) {
      localStorage.clear()
      sessionStorage.clear()

      // Optional: central redirect
      // window.location.href = "/login"
    }

    return Promise.reject(parsedError)
  }
)