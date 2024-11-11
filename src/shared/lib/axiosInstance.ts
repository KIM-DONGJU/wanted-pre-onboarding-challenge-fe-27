import axios from 'axios';

import { localStorageController } from './storageController';

let loginToken = localStorageController.getItem('authToken');
export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    Authorization: loginToken,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    loginToken = localStorageController.getItem('authToken');
    if (loginToken) {
      config.headers['Authorization'] = loginToken;
    }
    return config;
  },
  (error) => Promise.reject(error) 
);
