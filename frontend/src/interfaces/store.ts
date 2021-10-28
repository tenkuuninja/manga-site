import { IUser, IManga, IChapter, IComment, IGenre } from '../interfaces';

export interface IAuthStore {
  isLoggedIn: boolean;
  user: IUser | null, 
  isLoading: boolean, 
  isError: boolean
}

export interface IListMangaStore {
  data: IManga[],
  page: number,
  totalPage: number,
  isLoading: boolean, 
  isError: boolean
}

export interface IMangaStore {
  data: IManga,
  isLoading: boolean, 
  isError: boolean
}

export interface IMangaListStore {
  data: IManga[],
  isLoading: boolean, 
  isError: boolean
}

export interface IChapterStore {
  data: IChapter,
  isLoading: boolean, 
  isError: boolean
}

export interface ICommentStore {
  data: IComment[],
  current: {
    data: IComment;
    isLoading: boolean; 
    isError: boolean;
  };
  add: {
    isLoading: boolean;
    isError: boolean;
    parentId: number | null;
  };
  page: number,
  count: number,
  isLoading: boolean, 
  isError: boolean
}

export interface IGenreStore {
  data: IGenre[],
  isLoading: boolean, 
  isError: boolean
}

export interface ILocalCommon {
  email: string;
  name: string;
}

export interface ICommonStore {
  top: {
    all: IManga[],
    month: IManga[],
    week: IManga[],
    day: IManga[],
    isLoading: boolean, 
    isError: boolean
  },
  follow: IMangaListStore,
  readed: IMangaListStore,
  autoComplete: IMangaListStore,
  local: ILocalCommon;
  topLoading: number
}

export interface IAppState {
  auth: IAuthStore,
  listManga: IListMangaStore,
  manga: IMangaStore,
  // similar: IMangaListStore,
  chapter: IChapterStore,
  common: ICommonStore,
  genre: IGenreStore,
  comment: ICommentStore

}
