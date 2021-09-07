import { Action } from 'redux';

export interface IAction extends Action {
  readonly type: string,
  payload?: any
}
