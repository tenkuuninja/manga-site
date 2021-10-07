import MangaApi from 'apis/manga.api';
import { ISearchObject } from 'interfaces'
import axios, { CancelTokenSource } from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';

let cancelTokenSource: CancelTokenSource;

export const register = (id: number, option?: ISearchObject) => async (dispatch: Dispatch) => {
  if (cancelTokenSource !== undefined) cancelTokenSource.cancel();
  cancelTokenSource = axios.CancelToken.source();
  dispatch({ type: ActionTypes.FetchMangaRequest });
  try {
    let result = await MangaApi.byId(id).fetch(option, { cancelToken: cancelTokenSource.token });
    dispatch({ type: ActionTypes.FetchMangaRequest, payload: result.data });
  } catch (error) {
    dispatch({ type: ActionTypes.FetchMangaSuccess });
  }
}

