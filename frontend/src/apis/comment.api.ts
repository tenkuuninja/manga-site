import { CancelToken } from 'axios';
import axios from './instance';
import qs from 'query-string';
import { IPage } from 'models';
import { IComment } from 'models';

const path = 'api/comments';

type IParamFetchCommentList = {
  search?: string;
  filter?: string | string[];
  sort?: string;
  page?: number;
  size?: number;
}

export const fetchListComment = (options?: IParamFetchCommentList, cancelToken?: CancelToken) => {
  if (typeof options === 'undefined') options = {}
  const query: string = qs.stringify(options);
  return axios.get<IPage<IComment>>(path+'?'+query, { cancelToken });
}

export const fetchComment = (id: number, cancelToken?: CancelToken) => {
  return axios.get<IComment>(path+'/'+id, { cancelToken });
}

export const createComment = (payload: IComment, cancelToken?: CancelToken) => {
  return axios.post<IComment>(path, payload, { cancelToken });
}

export const updateComment = (id: number, payload: IComment, cancelToken?: CancelToken) => {
  return axios.put<IComment>(path+'/'+id, payload, { cancelToken });
}

export const deleteComment = (id: number, cancelToken?: CancelToken) => {
  return axios.delete<number>(path+'/'+id, { cancelToken });
}

export const addRateManga = (id: number, cancelToken?: CancelToken) => {
  return axios.patch<boolean>(path+'/'+id, { cancelToken });
}
