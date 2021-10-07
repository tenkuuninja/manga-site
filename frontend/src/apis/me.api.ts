import { AxiosRequestConfig } from 'axios';
import axios from './instance';
import qs from 'query-string';
import { IManga, IPage, ISearchObject } from 'interfaces';

const path = 'api/me';

export const MeApi = {
  fetchManga: (options?: ISearchObject, config: AxiosRequestConfig = {}) => {
    const query = qs.stringify(options || {});
    return axios.get<IPage<IManga>>(path+'/mangas?'+query, config);
  },
  fetchReaded: (options?: ISearchObject, config: AxiosRequestConfig = {}) => {
    const query = qs.stringify(options || {});
    return axios.get<IPage<IManga>>(path+'/reads?'+query, config);
  }
}

export default MeApi;
