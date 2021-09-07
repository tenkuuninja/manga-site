import { IAction, IAuthStore } from 'interfaces';
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

let initialState: IAuthStore = {
  isLoggedIn: false, 
  user: {}, 
  isLoading: false, 
  isError: false
}

const authReducer: Reducer = (state: IAuthStore = initialState, action: IAction): IAuthStore => {
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
