import { AxiosRequestConfig } from 'axios';
import axios from './instance';
import qs from 'query-string';
import { IPage, IManga, ISearchObject, IMangaTop, IChapter, IComment } from 'interfaces';

const path = 'api/mangas';

export const MangaApi = {
  fetchList: (options?: ISearchObject, config: AxiosRequestConfig = {}) => {
    const query: string = qs.stringify(options || {}, { arrayFormat: 'bracket' });
    return axios.get<IPage<IManga>>(path+'?'+query, config);
  },
  fetchTop: (config: AxiosRequestConfig = {}) => {
    return axios.get<IMangaTop>(path+'/top', config);
  },
  create: (payload: IManga, config: AxiosRequestConfig = {}) => {
    return axios.post<IManga>(path, payload, config);
  },
  byId: (id: number) => ({
    fetch: (options?: ISearchObject, config: AxiosRequestConfig = {}) => {
      const query: string = qs.stringify(options || {}, { arrayFormat: 'bracket' });
      return axios.get<IManga>(path+'/'+id+'?'+query, config);
    },
    fetchChapter: (options?: ISearchObject, config: AxiosRequestConfig = {}) => {
      const query: string = qs.stringify(options || {}, { arrayFormat: 'bracket' });
      return axios.get<IPage<IChapter>>(path+'/'+id+'/chapters?'+query, config);
    },
    fetchComment: (options?: ISearchObject, config: AxiosRequestConfig = {}) => {
      const query: string = qs.stringify(options || {}, { arrayFormat: 'bracket' });
      return axios.get<IPage<IComment>>(path+'/'+id+'/comments?'+query, config);
    },
    update: (payload: IManga, config: AxiosRequestConfig = {}) => {
      return axios.put<IManga>(path+'/'+id, payload, config);
    },
    delete: (config: AxiosRequestConfig = {}) => {
      return axios.delete<number>(path+'/'+id, config);
    },
    addRate: (config: AxiosRequestConfig = {}) => {
      return axios.patch<boolean>(path+'/'+id, config);
    },
    increaseFavorite: (config: AxiosRequestConfig = {}) => {
      return axios.patch<boolean>(path+'/'+id+'/increment', { favorite: 1 }, config);
    }
  })
}

export default MangaApi;
