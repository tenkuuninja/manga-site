import AuthApi from 'apis/auth.api';
import { IUser } from 'interfaces';
import { Dispatch } from 'redux';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  UPDATE_USERNAME_SUCCESS,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_AVATAR_SUCCESS
} from './constants';

export const register = (body : IUser) => async (dispatch: Dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    let result = await AuthApi.register(body);
    localStorage.setItem('token', 'Bearer '+result.data.accessToken);
    dispatch({ type: LOGIN_SUCCESS, payload: {
      token: result.data.accessToken,
      user: result.data.user
    } });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE });
  }
}

export const login = (body: {username: string, password: string}) => async (dispatch: Dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    let result = await AuthApi.loginWithPassword(body);
    localStorage.setItem('token', 'Bearer '+result.data.accessToken);
    dispatch({ type: LOGIN_SUCCESS, payload: {
      token: result.data.accessToken,
      user: result.data.user
    } });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE });
  }
}

export const logout = () => (dispatch: Dispatch) => {
  localStorage.setItem('token', '');
  dispatch({ type: LOGOUT });
}

export const autoLogin = () => async (dispatch: Dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    let result = await AuthApi.loginWithToken();
    dispatch({ type: LOGIN_SUCCESS, payload: {
      user: result.data.user
    } });
  } catch (error) {
    // dispatch({ type: LOGIN_FAILURE });
  }
}
