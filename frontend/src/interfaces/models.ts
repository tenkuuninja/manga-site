
export interface IChapter {
  id?: number;
  mangaId?: number;
  title?: string;
  number?: number;
  content?: string[];
  totalPage?: number;
  updatedAt?: Date;

  manga?: IManga,
  navigation?: NavigationChapter
}

export interface IComment {
  id?: number;
  mangaId?: number | null;
  userId?: number | null;
  parentId?: number | null;
  chapter?: number | null;
  name?: string | null;
  email?: string;
  content: string;
  point?: number;
  updatedAt?: Date;
  deletedAt?: Date | null;
  
  manga?: IManga;
  user?: IUser;
}

export interface IGenre {
  id?: number,
  title?: string,
  titleSlug?: string,
  description?: string,
  imageUrl?: string
}

export interface IManga {
  id?: number;
  title?: string;
  titleSlug?: string;
  titleSynonym?: string[];
  imageUrl?: string;
  description?: string;
  country?: 'jp' | 'cn' | 'kr' | null;
  author?: string[];
  isFinish?: boolean;
  chapter?: number;
  favorite?: number;
  rate?: IRate;
  view?: number;
  viewDay?: number;
  viewWeek?: number,
  viewMonth?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  
  totalFollowing?: number;
  readed?: IUser[],
  chapters?: IChapter;
  genres?: IGenre[];
}

export interface IRole {
  id?: number;
  name?: string;
  color?: string;
  permission?: any;
  allowDelete?: boolean;
}

export interface IUser {
  id?: number;
  username?: string;
  password?: string;
  email?: string;
  avatar?: string;
  roleId?: number;
  status?: string;
  verifyToken?: string;
  resetToken?: string;
  setting?: any;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;

  role?: IRole
  MangaReaded?: IMangaReaded
}

export interface IMangaReaded {
  mangaId?: number
  userId?: number
  readed?: number[]
  lastChapter?: number
  lastChapterId?: number
  updatedAt?: Date
}





interface NavigationChapter {
  previous?: IChapter | null,
  next?: IChapter | null
}

interface IRate {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

