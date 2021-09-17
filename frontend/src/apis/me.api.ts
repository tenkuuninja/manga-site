import { CancelToken } from 'axios';
import axios from './instance';
import qs from 'query-string';
import { IManga, IPage, ISearchObject } from 'interfaces';

const path = 'api/me';

export const MeApi = {
  fetchManga: (options?: ISearchObject, cancelToken?: CancelToken) => {
    const query = qs.stringify(options || {});
    return axios.get<IPage<IManga>>(path+'/mangas?'+query, { cancelToken });
  },
  fetchReaded: (options?: ISearchObject, cancelToken?: CancelToken) => {
    const query = qs.stringify(options || {});
    return axios.get<IPage<IManga>>(path+'/reads?'+query, { cancelToken });
  }
}

export default MeApi;
