import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_API || 'http://localhost:5000',
  headers: {
    Authorization: localStorage.getItem('token') || ''
  }
});

export default instance;
