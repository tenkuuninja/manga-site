import { IChapter } from './chapter';
import { IGenre } from './genre';

interface IRate {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

export interface IManga {
  id: number;
  title: string;
  titleSlug: string;
  titleSynonym: string[];
  imageUrl: string;
  description: string;
  country: 'jp' | 'cn' | 'kr' | null;
  author: string[];
  isFinish: boolean;
  chapter: number;
  favorite: number;
  rate: IRate;
  view: number;
  viewDay: number;
  viewWeek: number,
  viewMonth: number;
  totalFollowing? : number;
  chapters?: IChapter;
  genres?: IGenre[];
}
