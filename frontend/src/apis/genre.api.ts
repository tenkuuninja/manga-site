import { CancelToken } from 'axios';
import axios from './instance';
import { IPage, IGenre } from 'interfaces';

const path = 'api/genres';

const GenreApi = {
  fetchList: (cancelToken?: CancelToken) => {
    return axios.get<IPage<IGenre>>(path, { cancelToken });
  },
  fetch: (id: number, cancelToken?: CancelToken) => {
    return axios.get<IGenre>(path+'/'+id, { cancelToken });
  }
}

export default GenreApi;
