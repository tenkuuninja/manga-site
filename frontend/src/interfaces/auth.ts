import { IUser } from './models/user';

export interface IAuth {
  accessToken?: string,
  user?:IUser
}
