import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_API || 'http://localhost:5000',
  headers: {
    Authorization: localStorage.getItem('token') || ''
  }
});

instance.interceptors.request.use(
  function(config: any) {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default instance;
