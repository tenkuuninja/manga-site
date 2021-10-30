import { IUser, IManga, IChapter, IComment, IGenre } from '../interfaces';

export interface IAuthStore {
  isLoggedIn: boolean;
  user: IUser | null;
  isLoading: boolean; 
  isError: boolean;
}

export interface IListDataStore<T> {
  data: T[];
  isLoading: boolean;
  isError: boolean;
}

export interface IDataStore<T> {
  data: T;
  isLoading: boolean;
  isError: boolean;
}

export interface IListGenreStore extends IListDataStore<IManga> {
  byId: {
    [id: number]: IGenre
  }
}

export interface IListMangaStore extends IListDataStore<IManga> {
  page: number;
  totalPage: number;
}

export interface ICommentsStore extends IListDataStore<IComment> {
  data: IComment[]
  add: {
    isLoading: boolean;
    isError: boolean;
    parentId: number | null;
  };
  page: number;
  count: number;
  isLoading: boolean; 
  isError: boolean
}

export interface ILocalCommon {
  email: string;
  name: string;
}

export interface ICommonStore {
  top: {
    all: IManga[];
    month: IManga[];
    week: IManga[];
    day: IManga[];
    isLoading: boolean; 
    isError: boolean
  };
  follow: IListDataStore<IManga>;
  readed: IListDataStore<IManga>;
  autoComplete: IListDataStore<IManga>;
  local: ILocalCommon;
  topLoading: number
}

export interface IAppState {
  auth: IAuthStore;
  common: ICommonStore;
  genres: IListGenreStore;
  mangas: IListMangaStore;
  manga: IDataStore<IManga>;
  chapter: IDataStore<IChapter>;
  comments: ICommentsStore;
}
