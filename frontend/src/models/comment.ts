import { IManga } from './manga';
import { IUser } from './user';

export interface CommentAttributes {
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
