import { CancelToken } from 'axios';
import axios from './instance';
import qs from 'query-string';
import { IPage } from 'interfaces';
import { IManga } from 'interfaces/models/manga';

const path = 'api/mangas';

export type IParamFetchMangaList = {
  search?: string;
  filter?: string | string[];
  genre?: string;
  notgenre?: string;
  sort?: string;
  page?: number;
  size?: number;
  include?: string | string[]
}

const MangaApi = {
  fetchList: (options?: IParamFetchMangaList, cancelToken?: CancelToken) => {
    if (typeof options === 'undefined') options = {}
    const query: string = qs.stringify(options);
    return axios.get<IPage<IManga>>(path+'?'+query, { cancelToken });
  },
  create: (payload: IManga, cancelToken?: CancelToken) => {
    return axios.post<IManga>(path, payload, { cancelToken });
  },
  byId: (id: number) => ({
    fetch: (options?: IParamFetchMangaList, cancelToken?: CancelToken) => {
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
