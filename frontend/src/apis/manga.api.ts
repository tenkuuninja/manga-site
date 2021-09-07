import { CancelToken } from 'axios';
import axios from './instance';
import qs from 'query-string';
import { IPage, IManga, ISearchObject } from 'interfaces';

const path = 'api/mangas';


const MangaApi = {
  fetchList: (options?: ISearchObject, cancelToken?: CancelToken) => {
    if (typeof options === 'undefined') options = {}
    const query: string = qs.stringify(options);
    return axios.get<IPage<IManga>>(path+'?'+query, { cancelToken });
  },
  create: (payload: IManga, cancelToken?: CancelToken) => {
    return axios.post<IManga>(path, payload, { cancelToken });
  },
  byId: (id: number) => ({
    fetch: (options?: ISearchObject, cancelToken?: CancelToken) => {
      if (typeof options === 'undefined') options = {}
      const query: string = qs.stringify(options);
      return axios.get<IManga>(path+'/'+id+'?'+query, { cancelToken });
    },
    update: (payload: IManga, cancelToken?: CancelToken) => {
      return axios.put<IManga>(path+'/'+id, payload, { cancelToken });
    },
    delete: (cancelToken?: CancelToken) => {
      return axios.delete<number>(path+'/'+id, { cancelToken });
    },
    addRate: (cancelToken?: CancelToken) => {
      return axios.patch<boolean>(path+'/'+id, { cancelToken });
    }
  })
}

export default MangaApi;
