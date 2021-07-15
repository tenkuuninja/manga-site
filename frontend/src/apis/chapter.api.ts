import { CancelToken } from 'axios';
import axios from './instance';
import { IChapter } from 'models';

const path = 'api/chapters';

export const fetchChapter = (id: number, cancelToken?: CancelToken) => {
  return axios.get<IChapter>(path+'/'+id, { cancelToken });
}

export const createChapter = (payload: IChapter, cancelToken?: CancelToken) => {
  return axios.post<IChapter>(path, payload, { cancelToken });
}

export const updateChapter = (id: number, payload: IChapter, cancelToken?: CancelToken) => {
  return axios.put<IChapter>(path+'/'+id, payload, { cancelToken });
}

export const deleteChapter = (id: number, cancelToken?: CancelToken) => {
  return axios.delete<number>(path+'/'+id, { cancelToken });
}

