import { IManga } from './manga';

export interface IChapter {
  id?: number;
  mangaId: number;
  title?: string;
  number: number;
  content: string[];
  totalPage?: number;
  updatedAt?: Date;
  manga?: IManga
}
