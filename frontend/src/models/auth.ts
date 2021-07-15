import { IUser } from './user';

export interface IAuth {
  accessToken?: string,
  user?:IUser
}
