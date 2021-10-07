import { AxiosRequestConfig } from 'axios';
import axios from './instance';
// import qs from 'query-string';
import { IPage } from 'interfaces';
import { IRole } from 'interfaces';

const path = 'api/roles';

export const fetchRole = (id: number, config: AxiosRequestConfig = {}) => {
  return axios.get<IRole>(path+'/'+id, config);
}

// export const createRole = (payload: IRole, config: AxiosRequestConfig = {}) => {
//   return axios.post<IRole>(path, payload, config);
// }

// export const updateRole = (id: number, payload: IRole, config: AxiosRequestConfig = {}) => {
//   return axios.put<IRole>(path+'/'+id, payload, config);
// }

// export const deleteRole = (id: number, config: AxiosRequestConfig = {}) => {
//   return axios.delete<number>(path+'/'+id, config);
// }

export const RoleApi = {
  fetchListRole: (config: AxiosRequestConfig = {}) => {
    return axios.get<IPage<IRole>>(path, config);
  }
}

export default RoleApi
