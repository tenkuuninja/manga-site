import MangaApi from 'apis/manga.api';
import { ISearchObject } from 'interfaces'
import { CancelToken } from 'axios';
import { Dispatch } from 'redux';
import {
  FETCH_CATALOG_REQUEST,
  FETCH_CATALOG_SUCCESS,
  FETCH_CATALOG_FAILURE
} from './constants';

export const register = (id: number, option?: ISearchObject, cancelToken?: CancelToken) => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_CATALOG_REQUEST });
  try {
    let result = await MangaApi.byId(id).fetch(option, cancelToken);
    dispatch({ type: FETCH_CATALOG_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({ type: FETCH_CATALOG_FAILURE });
  }
}

