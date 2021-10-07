import { AxiosRequestConfig } from 'axios';
import axios from './instance';
import qs from 'query-string';
import { IPage, ISearchObject } from 'interfaces';
import { IComment } from 'interfaces';

const path = 'api/comments';


export const fetchComment = (id: number, config: AxiosRequestConfig = {}) => {
  return axios.get<IComment>(path+'/'+id, config);
}

export const updateComment = (id: number, payload: IComment, config: AxiosRequestConfig = {}) => {
  return axios.put<IComment>(path+'/'+id, payload, config);
}

export const deleteComment = (id: number, config: AxiosRequestConfig = {}) => {
  return axios.delete<number>(path+'/'+id, config);
}

export const addRateManga = (id: number, config: AxiosRequestConfig = {}) => {
  return axios.patch<boolean>(path+'/'+id, config);
}

export const CommentApi = {
  fetchList: (options?: ISearchObject, config: AxiosRequestConfig = {}) => {
    if (typeof options === 'undefined') options = {}
    const query: string = qs.stringify(options);
    return axios.get<IPage<IComment>>(path+'?'+query, config);
  },
  createComment: (payload: IComment, config: AxiosRequestConfig = {}) => {
    return axios.post<IComment>(path, payload, config);
  },
  byId: (id: number) => ({

  })
}

export default CommentApi;
