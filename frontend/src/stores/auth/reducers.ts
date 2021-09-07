import { IUser } from 'models';
import { IAction } from 'models/action';
import { Reducer } from 'redux';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  UPDATE_USERNAME_SUCCESS,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_AVATAR_SUCCESS
} from './constants';

interface IAuthState {
  isLoggedIn: boolean;
  user: IUser | {} | null, 
  isLoading: boolean, 
  isError: boolean
}

let initialState: IAuthState = {
  isLoggedIn: false, 
  user: {}, 
  isLoading: false, 
  isError: false
}

const authReducer: Reducer = (state: IAuthState = initialState, action: IAction): IAuthState => {
  switch(action.type) {
    case LOGIN_REQUEST:
      return {
        ...state, 
        isLoading: true
      }
    case LOGIN_SUCCESS:
      return {
        isLoggedIn: true, 
        user: action.payload.user, 
        isLoading: false, 
        isError: false
      }
    case LOGIN_FAILURE:
      return {
        ...state, 
        isLoggedIn: false, 
        isLoading: false, 
        isError: true
      }
    case LOGOUT:
      return {
        ...state, 
        isLoggedIn: false, 
        user: {}
      }
    case UPDATE_USERNAME_SUCCESS:
      return {
        ...state, 
        user: {
          ...state.user, 
          username: action.payload.username
        }
      }
    case UPDATE_PASSWORD_SUCCESS:
      return state;
    case UPDATE_AVATAR_SUCCESS:
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
