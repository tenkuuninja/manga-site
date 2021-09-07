import { CancelToken } from 'axios';
import axios from './instance';
import qs from 'query-string';
import { IPage, IUser } from 'interfaces';

const path = 'api/users';

type IParamFetchUserList = {
  search?: string;
  filter?: string | string[];
  sort?: string;
  page?: number;
  size?: number;
}

const UserApi = {
  fetchList: (options?: IParamFetchUserList, cancelToken?: CancelToken) => {
    if (typeof options === 'undefined') options = {}
    const query: string = qs.stringify(options);
    return axios.get<IPage<IUser>>(path+'?'+query, { cancelToken });
  },
  create: (payload: IUser, cancelToken?: CancelToken) => {
    return axios.post<IUser>(path, payload, { cancelToken });
  },
  byId: (id: number) => ({
    fetch: (cancelToken?: CancelToken) => {
      return axios.get<IUser>(path+'/'+id, { cancelToken });
    },
    update: (payload: IUser, cancelToken?: CancelToken) => {
      return axios.put<IUser>(path+'/'+id, payload, { cancelToken });
    },
    delete: (cancelToken?: CancelToken) => {
      return axios.delete<number>(path+'/'+id, { cancelToken });
    },
    updatePassword: (body: { oldPassword: string, password: string }, cancelToken?: CancelToken) => {
      return axios.patch<boolean>(path+'/'+id, body, { cancelToken });
    }
  })
}

export default UserApi;
