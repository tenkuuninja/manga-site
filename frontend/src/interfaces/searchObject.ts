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
