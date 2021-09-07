import MangaApi from 'apis/manga.api';
import { ISearchObject } from 'interfaces'
import { Dispatch } from 'redux';
import {
  FETCH_CATALOG_REQUEST,
  FETCH_CATALOG_SUCCESS,
  FETCH_CATALOG_FAILURE
} from './constants';

export const fetchListManga = (filter?: ISearchObject) => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_CATALOG_REQUEST });
  try {
    let result = await MangaApi.fetchList(filter);
    dispatch({ type: FETCH_CATALOG_SUCCESS, payload: result.data.content });
  } catch (error) {
    dispatch({ type: FETCH_CATALOG_FAILURE });
  }
}

