import { IManga } from "./models";
export interface IPage<T> {
  content: T[];
  count: number;
  page: number;
  size: number;
  totalPage: number;
}

export interface ISearchObject {
  search?: string;
  filter?: string | string[];
  genre?: string;
  notgenre?: string;
  sort?: string | string[];
  page?: number;
  size?: number;
  include?: string | string[]
}

export interface IMangaTop {
  all: IManga;
  day: IManga;
  week: IManga;
  month: IManga;
}
