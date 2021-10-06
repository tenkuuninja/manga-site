import { IAction, IAuthStore } from 'interfaces';
import { Reducer } from 'redux';
import { ActionTypes } from './types';

let initialState: IAuthStore = {
  isLoggedIn: false, 
  user: {}, 
  isLoading: false, 
  isError: false
}

const authReducer: Reducer = (state: IAuthStore = initialState, action: IAction): IAuthStore => {
  switch(action.type) {
    case ActionTypes.LoginRequest:
      return {
        ...state, 
        isLoading: true
      }
    case ActionTypes.LoginSuccess:
      return {
        isLoggedIn: true, 
        user: action.payload.user, 
        isLoading: false, 
        isError: false
      }
    case ActionTypes.LoginFailure:
      return {
        ...state, 
        isLoggedIn: false, 
        isLoading: false, 
        isError: true
      }
    case ActionTypes.Logout:
      return {
        ...state, 
        isLoggedIn: false, 
        user: {}
      }
    case ActionTypes.UpdateUsernameSuccess:
      return {
        ...state, 
        user: {
          ...state.user, 
          username: action.payload.username
        }
      }
    case ActionTypes.UpdatePasswordSuccess:
      return state;
    case ActionTypes.UpdateAvatarSuccess:
      return {
        ...state, 
        user: {
          ...state.user, 
          avatar: action.payload.avatar
        }
      }
    default:
      return state;
  }
}

export default authReducer;
