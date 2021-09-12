import { IUser, IManga, IChapter, IComment, IGenre } from '../interfaces';

export interface IAuthStore {
  isLoggedIn: boolean;
  user: IUser | {} | null, 
  isLoading: boolean, 
  isError: boolean
}

export interface ICatalogStore {
  payload: IManga[],
  page: number,
  totalPage: number,
  isLoading: boolean, 
  isError: boolean
}

export interface IMangaStore {
  payload: IManga,
  isLoading: boolean, 
  isError: boolean
}

export interface IMangaListStore {
  payload: IManga[],
  isLoading: boolean, 
  isError: boolean
}

export interface IChapterStore {
  payload: IChapter,
  isLoading: boolean, 
  isError: boolean
}

export interface ICommentStore {
  payload: IComment[],
  page: number,
  count: number,
  isLoading: boolean, 
  isError: boolean
}

export interface IGenreStore {
  payload: IGenre[],
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
  local: {
    email: string,
    name: string
  }
}

export interface IAppState {
  auth: IAuthStore,
  catalog: ICatalogStore,
  manga: IMangaStore,
  // similar: IMangaListStore,
  chapter: IChapterStore,
  common: ICommonStore,
  genre: IGenreStore,
  comment: ICommentStore

}
