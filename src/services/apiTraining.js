import axios from 'axios';
import { getToken } from './auth';

const apiTraining = axios.create({
  baseURL: process.env.REACT_APP_URL_TRAINING_API,
});

apiTraining.interceptors.request.use(async config => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiTraining;