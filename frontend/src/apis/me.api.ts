import { AxiosRequestConfig } from 'axios';
import axios from './instance';
import qs from 'query-string';
import { IManga, IPage, ISearchObject } from 'interfaces';
import { followManga } from 'stores/manga/actions';

const path = 'api/me';

export const MeApi = {
  fetchManga: (options?: ISearchObject, config: AxiosRequestConfig = {}) => {
    const query = qs.stringify(options || {});
    return axios.get<IPage<IManga>>(path+'/mangas?'+query, config);
  },
  fetchReaded: (options?: ISearchObject, config: AxiosRequestConfig = {}) => {
    const query = qs.stringify(options || {});
    return axios.get<IPage<IManga>>(path+'/reads?'+query, config);
  },
  followManga: (mangaId: number, config: AxiosRequestConfig = {}) => {
    return axios.post<boolean>(path+'/mangas/'+mangaId, config);
  },
  unfollowManga: (mangaId: number, config: AxiosRequestConfig = {}) => {
    return axios.delete<boolean>(path+'/mangas/'+mangaId, config);
  }
}

export default MeApi;
