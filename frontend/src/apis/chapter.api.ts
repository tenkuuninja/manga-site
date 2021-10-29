import { AxiosRequestConfig } from 'axios';
import axios from './instance';
import qs from 'query-string';
import { IChapter, ISearchObject } from 'interfaces';

const path = 'api/chapters';

export const ChapterApi = {
  create: (payload: IChapter, config: AxiosRequestConfig = {}) => {
    return axios.post<IChapter>(path, payload, config);
  },
  byId: (id: number) => ({
    fetch: (options?: ISearchObject, config: AxiosRequestConfig = {}) => {
      if (typeof options === 'undefined') options = {}
      const query: string = qs.stringify(options);
      return axios.get<IChapter>(path+'/'+id+'?'+query, config);
    },
    update: (payload: IChapter, config: AxiosRequestConfig = {}) => {
      return axios.put<IChapter>(path+'/'+id, payload, config);
    },
    delete: (config: AxiosRequestConfig = {}) => {
      return axios.delete<number>(path+'/'+id, config);
    }
  })
}

export default ChapterApi;
