import { CancelToken } from 'axios';
import axios from './instance';
import qs from 'query-string';
import { IAuth, IUser } from 'models';

const path = 'api/auth';

export const loginWithPassword = (body: {},cancelToken?: CancelToken) => {
  return axios.post<IAuth>(path+'/login', body, { cancelToken });
}

export const loginWithToken = (cancelToken?: CancelToken) => {
  return axios.post<IAuth>(path+'/token-login', { cancelToken });
}

export const register = (body: IUser, cancelToken?: CancelToken) => {
  return axios.post<IAuth>(path+'/register', body, { cancelToken });
}

