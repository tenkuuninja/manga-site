import { CancelToken } from 'axios';
import axios from './instance';
import { IAuth, IUser } from 'interfaces';

const path = 'api/auth';

const AuthApi = {
  loginWithPassword: (body: {},cancelToken?: CancelToken) => {
    return axios.post<IAuth>(path+'/login', body, { cancelToken });
  },
  loginWithToken: (cancelToken?: CancelToken) => {
    return axios.post<IAuth>(path+'/token-login', { cancelToken });
  },
  register: (body: IUser, cancelToken?: CancelToken) => {
    return axios.post<IAuth>(path+'/register', body, { cancelToken });
  }
}

export default AuthApi;
