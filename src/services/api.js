import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: "https://bf98-45-165-166-211.sa.ngrok.io/",
  // baseURL: import.meta.env.VITE_API_BASE_URL,
});

/* Aqui foi utilizado o interceptors do Axios, 
   como o nome sugere eleintercepta uma requisição request antes dela efetivamente acontecer, 
   nesse instante é verificado se existe um token no localStorage, e existindo, 
   ele adiciona o Header de Authorization na request. 
   
   Útil para não alterar todas as requisições realizadas no código.*/
api.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
