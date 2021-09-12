import { CancelToken } from 'axios';
import axios from './instance';
import qs from 'query-string';
import { IChapter } from 'interfaces';

const path = 'api/chapters';

export const ChapterApi = {
  create: (payload: IChapter, cancelToken?: CancelToken) => {
    return axios.post<IChapter>(path, payload, { cancelToken });
  },
  byId: (id: number) => ({
    fetch: (options?: any, cancelToken?: CancelToken) => {
      if (typeof options === 'undefined') options = {}
      const query: string = qs.stringify(options);
      return axios.get<IChapter>(path+'/'+id+'?'+query, { cancelToken });
    },
    update: (payload: IChapter, cancelToken?: CancelToken) => {
      return axios.put<IChapter>(path+'/'+id, payload, { cancelToken });
    },
    delete: (cancelToken?: CancelToken) => {
      return axios.delete<number>(path+'/'+id, { cancelToken });
    }
  })
}

export default ChapterApi;
