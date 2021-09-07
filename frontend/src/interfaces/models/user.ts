import { IRole } from './role';

export interface IUser {
  id?: number;
  username: string;
  password?: string;
  email: string;
  avatar?: string;
  roleId?: number;
  status?: string;
  verifyToken?: string;
  resetToken?: string;
  setting?: any;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  role?: IRole
}