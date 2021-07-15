import { CancelToken } from 'axios';
import axios from './instance';
import qs from 'query-string';
import { IPage, IUser } from 'models';

const path = 'api/users';

type IParamFetchUserList = {
  search?: string;
  filter?: string | string[];
  sort?: string;
  page?: number;
  size?: number;
}

export const fetchListUser = (options?: IParamFetchUserList, cancelToken?: CancelToken) => {
  if (typeof options === 'undefined') options = {}
  const query: string = qs.stringify(options);
  return axios.get<IPage<IUser>>(path+'?'+query, { cancelToken });
}

export const fetchUser = (id: number, cancelToken?: CancelToken) => {
  return axios.get<IUser>(path+'/'+id, { cancelToken });
}

export const createUser = (payload: IUser, cancelToken?: CancelToken) => {
  return axios.post<IUser>(path, payload, { cancelToken });
}

export const updateUser = (id: number, payload: IUser, cancelToken?: CancelToken) => {
  return axios.put<IUser>(path+'/'+id, payload, { cancelToken });
}

export const deleteUser = (id: number, cancelToken?: CancelToken) => {
  return axios.delete<number>(path+'/'+id, { cancelToken });
}

export const updatePasswordUser = (id: number, body: { oldPassword: string, password: string }, cancelToken?: CancelToken) => {
  return axios.patch<boolean>(path+'/'+id, body, { cancelToken });
}
