import { IManga } from './manga';

interface NavigationChapter {
  previous?: IChapter | null,
  next?: IChapter | null
}

export interface IChapter {
  id?: number;
  mangaId: number;
  title?: string;
  number: number;
  content: string[];
  totalPage?: number;
  updatedAt?: Date;

  manga?: IManga,
  navigation?: NavigationChapter
}
