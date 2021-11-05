import { AxiosRequestConfig } from 'axios';
import axios from './instance';
import qs from 'query-string';
import { IManga, IPage, ISearchObject, IUser } from 'interfaces';

const path = 'api/me';

export const MeApi = {
  updatePassword: (oldPassword: string, password: string, config: AxiosRequestConfig = {}) => {
    return axios.patch<IUser>(path+'/password', { oldPassword, password }, config);
  },
  updateAvatar: (file: File, config: AxiosRequestConfig = { headers: { 'Content-Type': 'multipart/form-data' } }) => {
    let formData = new FormData();
    formData.append('avatar', file)
    return axios.patch<IUser>(path+'/avatar', formData, config);
  },
  fetchManga: (options?: ISearchObject, config: AxiosRequestConfig = {}) => {
    const query = qs.stringify(options || {}, { arrayFormat: 'bracket' });
    return axios.get<IPage<IManga>>(path+'/mangas?'+query, config);
  },
  fetchReaded: (options?: ISearchObject, config: AxiosRequestConfig = {}) => {
    const query = qs.stringify(options || {}, { arrayFormat: 'bracket' });
    return axios.get<IPage<IManga>>(path+'/reads?'+query, config);
  },
  followManga: (mangaId: number, config: AxiosRequestConfig = {}) => {
    return axios.post<boolean>(path+'/mangas/'+mangaId, config);
  },
  unfollowManga: (mangaId: number, config: AxiosRequestConfig = {}) => {
    return axios.delete<boolean>(path+'/mangas/'+mangaId, config);
  },
  read: (chapterId: number, config: AxiosRequestConfig = {}) => {
    return axios.post<boolean>(path+'/reads/', { chapterId }, config);
  },
}

export default MeApi;
