export interface IPage<T> {
  content: T[];
  count: number;
  page: number;
  size: number;
  totalPage: number;
}
