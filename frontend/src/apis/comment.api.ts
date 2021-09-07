import { CancelToken } from 'axios';
import axios from './instance';
import qs from 'query-string';
import { IPage, ISearchObject } from 'interfaces';
import { IComment } from 'interfaces';

const path = 'api/comments';


export const fetchComment = (id: number, cancelToken?: CancelToken) => {
  return axios.get<IComment>(path+'/'+id, { cancelToken });
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

const CommentApi = {
  fetchList: (options?: ISearchObject, cancelToken?: CancelToken) => {
    if (typeof options === 'undefined') options = {}
    const query: string = qs.stringify(options);
    return axios.get<IPage<IComment>>(path+'?'+query, { cancelToken });
  },
  createComment: (payload: IComment, cancelToken?: CancelToken) => {
    return axios.post<IComment>(path, payload, { cancelToken });
  },
  byId: (id: number) => ({

  })
}

export default CommentApi;
