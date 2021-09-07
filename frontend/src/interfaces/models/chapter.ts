import { IManga } from './manga';

interface NavigationChapter {
  current: IChapter,
  previous: IChapter,
  next: IChapter
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
