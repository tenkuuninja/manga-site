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
  local: {
    email: string,
    name: string
  }
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
