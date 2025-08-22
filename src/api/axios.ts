import axios from 'axios';

const appMode = import.meta.env.VITE_APP_MODE;
const apiUrl = (appMode == 'development') ? import.meta.env.VITE_LOCAL_API : import.meta.env.VITE_PRODUCTION_API;

//
const instance = axios.create({
  baseURL: apiUrl,
});

export default instance;
