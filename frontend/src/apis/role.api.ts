import { CancelToken } from 'axios';
import axios from './instance';
import qs from 'query-string';
import { IPage } from 'interfaces';
import { IRole } from 'interfaces';

const path = 'api/roles';

export const fetchRole = (id: number, cancelToken?: CancelToken) => {
  return axios.get<IRole>(path+'/'+id, { cancelToken });
}

// export const createRole = (payload: IRole, cancelToken?: CancelToken) => {
//   return axios.post<IRole>(path, payload, { cancelToken });
// }

// export const updateRole = (id: number, payload: IRole, cancelToken?: CancelToken) => {
//   return axios.put<IRole>(path+'/'+id, payload, { cancelToken });
// }

// export const deleteRole = (id: number, cancelToken?: CancelToken) => {
//   return axios.delete<number>(path+'/'+id, { cancelToken });
// }

const RoleApi = {
  fetchListRole: (cancelToken?: CancelToken) => {
    return axios.get<IPage<IRole>>(path, { cancelToken });
  }
}

export default RoleApi
