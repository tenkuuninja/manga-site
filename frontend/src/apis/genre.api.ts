import { CancelToken } from 'axios';
import axios from './instance';
import qs from 'query-string';
import { IPage, IGenre } from 'models';

const path = 'api/genres';

export const fetchListGenre = (cancelToken?: CancelToken) => {
  return axios.get<IPage<IGenre>>(path, { cancelToken });
}

export const fetchGenre = (id: number, cancelToken?: CancelToken) => {
  return axios.get<IGenre>(path+'/'+id, { cancelToken });
}

// export const createGenre = (payload: IGenre, cancelToken?: CancelToken) => {
//   return axios.post<IGenre>(path, payload, { cancelToken });
// }

// export const updateGenre = (id: number, payload: IGenre, cancelToken?: CancelToken) => {
//   return axios.put<IGenre>(path+'/'+id, payload, { cancelToken });
// }

// export const deleteGenre = (id: number, cancelToken?: CancelToken) => {
//   return axios.delete<number>(path+'/'+id, { cancelToken });
// }
