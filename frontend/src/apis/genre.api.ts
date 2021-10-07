import { AxiosRequestConfig } from 'axios';
import axios from './instance';
import { IGenre } from 'interfaces';

const path = 'api/genres';

export const GenreApi = {
  fetchList: (config: AxiosRequestConfig = {}) => {
    return axios.get<IGenre[]>(path, config);
  },
  fetch: (id: number, config: AxiosRequestConfig = {}) => {
    return axios.get<IGenre>(path+'/'+id, config);
  }
}

export default GenreApi;
