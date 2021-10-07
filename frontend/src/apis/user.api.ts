import { AxiosRequestConfig } from 'axios';
import axios from './instance';
import qs from 'query-string';
import { IPage, IUser, ISearchObject } from 'interfaces';

const path = 'api/users';

interface IUserForCheck {
  id?: number
  username?: string
  email?: string
}


export const UserApi = {
  fetchList: (options?: ISearchObject, config: AxiosRequestConfig = {}) => {
    const query: string = qs.stringify(options || {});
    return axios.get<IPage<IUser>>(path+'?'+query, config);
  },
  isExist: (options?: IUserForCheck, config: AxiosRequestConfig = {}) => {
    const query: string = qs.stringify(options || {});
    return axios.get<boolean>(path+'/exists?'+query, config);
  },
  create: (payload: IUser, config: AxiosRequestConfig = {}) => {
    return axios.post<IUser>(path, payload, config);
  },
  byId: (id: number) => ({
    fetch: (config: AxiosRequestConfig = {}) => {
      return axios.get<IUser>(path+'/'+id, config);
    },
    update: (payload: IUser, config: AxiosRequestConfig = {}) => {
      return axios.put<IUser>(path+'/'+id, payload, config);
    },
    delete: (config: AxiosRequestConfig = {}) => {
      return axios.delete<number>(path+'/'+id, config);
    },
    updatePassword: (body: { oldPassword: string, password: string }, config: AxiosRequestConfig = {}) => {
      return axios.patch<boolean>(path+'/'+id, body, config);
    }
  })
}

export default UserApi;
