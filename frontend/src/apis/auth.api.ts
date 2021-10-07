import { AxiosRequestConfig } from 'axios';
import axios from './instance';
import { IAuth, IUser } from 'interfaces';

const path = 'api/auth';

export const AuthApi = {
  loginWithPassword: (body: {}, config: AxiosRequestConfig = {}) => {
    return axios.post<IAuth>(path+'/login', body, config);
  },
  loginWithToken: (config: AxiosRequestConfig = {}) => {
    return axios.post<IAuth>(path+'/token-login', config);
  },
  register: (body: IUser, config: AxiosRequestConfig = {}) => {
    return axios.post<IAuth>(path+'/register', body, config);
  }
}

export default AuthApi;
