import MangaApi from 'apis/manga.api';
import { ISearchObject } from 'interfaces'
import { CancelToken } from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';

export const register = (id: number, option?: ISearchObject, cancelToken?: CancelToken) => async (dispatch: Dispatch) => {
  dispatch({ type: ActionTypes.FetchMangaRequest });
  try {
    let result = await MangaApi.byId(id).fetch(option, cancelToken);
    dispatch({ type: ActionTypes.FetchMangaRequest, payload: result.data });
  } catch (error) {
    dispatch({ type: ActionTypes.FetchMangaSuccess });
  }
}

