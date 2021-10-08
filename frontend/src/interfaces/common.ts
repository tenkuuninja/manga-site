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
  sort?: string;
  page?: number;
  size?: number;
  include?: string | string[]
}
