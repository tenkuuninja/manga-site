import { IManga } from './manga';
import { IUser } from './user';

export interface CommentAttributes {
  id: number;
  mangaId: number;
  userId: number;
  parentId: number;
  chapter: number;
  name: string;
  email: string;
  content: string;
  point: number;
  manga?: IManga;
  user?: IUser;
}
