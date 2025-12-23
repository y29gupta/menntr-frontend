import axios from 'axios';

export const api = axios.create({
  baseURL: '/api', // e.g. http://localhost:5000
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.clear();
//       sessionStorage.clear();
//       // window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// )