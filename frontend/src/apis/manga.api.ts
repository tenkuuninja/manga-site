import { CancelToken } from 'axios';
import axios from './instance';
import qs from 'query-string';
import { IPage } from 'models';
import { IManga } from 'models/manga';

const path = 'api/mangas';

type IParamFetchMangaList = {
  search?: string;
  filter?: string | string[];
  genre?: string;
  notgenre?: string;
  sort?: string;
  page?: number;
  size?: number;
}

export const fetchListManga = (options?: IParamFetchMangaList, cancelToken?: CancelToken) => {
  if (typeof options === 'undefined') options = {}
  const query: string = qs.stringify(options);
  return axios.get<IPage<IManga>>(path+'?'+query, { cancelToken });
}

export const fetchManga = (id: number, cancelToken?: CancelToken) => {
  return axios.get<IManga>(path+'/'+id, { cancelToken });
}

export const createManga = (manga: IManga, cancelToken?: CancelToken) => {
  return axios.post<IManga>(path, manga, { cancelToken });
}

export const updateManga = (id: number, manga: IManga, cancelToken?: CancelToken) => {
  return axios.put<IManga>(path+'/'+id, manga, { cancelToken });
}

export const deleteManga = (id: number, cancelToken?: CancelToken) => {
  return axios.delete<number>(path+'/'+id, { cancelToken });
}

export const addRateManga = (id: number, cancelToken?: CancelToken) => {
  return axios.patch<boolean>(path+'/'+id, { cancelToken });
}
