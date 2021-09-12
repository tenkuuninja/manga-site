import { IUser } from '../interfaces';

export interface IAuth {
  accessToken?: string,
  user?:IUser 
}
