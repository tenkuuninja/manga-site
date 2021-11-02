import AuthApi from 'apis/auth.api';
import { IUser } from 'interfaces';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';

export const register = (body : IUser) => async (dispatch: Dispatch) => {
  dispatch({ type: ActionTypes.LoginRequest });
  try {
    let result = await AuthApi.register(body);
    localStorage.setItem('token', 'Bearer '+result.data.accessToken);
    dispatch({ type: ActionTypes.LoginSuccess, payload: {
      token: result.data.accessToken,
      user: result.data.user
    } });
  } catch (error) {
    dispatch({ type: ActionTypes.LoginFailure });
  }
}

export const login = (body: {username: string, password: string}) => async (dispatch: Dispatch) => {
  dispatch({ type: ActionTypes.LoginRequest });
  try {
    let result = await AuthApi.loginWithPassword(body);
    let token = 'Bearer '+result.data.accessToken;
    localStorage.setItem('token', token);
    dispatch({ type: ActionTypes.LoginSuccess, payload: {
      token: result.data.accessToken,
      user: result.data.user
    } });
  } catch (error) {
    dispatch({ type: ActionTypes.LoginFailure });
  }
}

export const logout = () => (dispatch: Dispatch) => {
  localStorage.setItem('token', '');
  dispatch({ type: ActionTypes.Logout });
}

export const autoLogin = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionTypes.LoginRequest });
  try {
    let result = await AuthApi.loginWithToken();
    dispatch({ type: ActionTypes.LoginSuccess, payload: {
      token: localStorage.getItem('token'),
      user: result.data.user
    } });
  } catch (error) {
    // dispatch({ type: ActionTypes.LoginFailure });
  }
}

export const updateAvatar = (avatar: string) => ({ type: ActionTypes.UpdateAvatarSuccess, payload: { avatar } })
