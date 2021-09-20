import { MeApi } from 'apis';
import MangaApi from 'apis/manga.api';
import { CancelToken } from 'axios';
import { ISearchObject } from 'interfaces'
import { Dispatch } from 'redux';
import {
  FETCH_CATALOG_REQUEST,
  FETCH_CATALOG_SUCCESS,
  FETCH_CATALOG_FAILURE
} from './constants';

export const fetchListManga = (filter?: ISearchObject, cancelToken?: CancelToken) => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_CATALOG_REQUEST });
  try {
    let result = await MangaApi.fetchList(filter, cancelToken);
    dispatch({ type: FETCH_CATALOG_SUCCESS, payload: result.data.content });
  } catch (error) {
    dispatch({ type: FETCH_CATALOG_FAILURE });
  }
}

export const fetchListMangaFollow = (filter?: ISearchObject, cancelToken?: CancelToken) => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_CATALOG_REQUEST });
  try {
    let result = await MeApi.fetchManga(filter, cancelToken);
    dispatch({ type: FETCH_CATALOG_SUCCESS, payload: result.data.content });
  } catch (error) {
    dispatch({ type: FETCH_CATALOG_FAILURE });
  }
}

export const fetchListMangaReaded = (filter?: ISearchObject, cancelToken?: CancelToken) => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_CATALOG_REQUEST });
  try {
    let result = await MeApi.fetchReaded(filter, cancelToken);
    result.data.content.sort((a, b) => {
      if (a.readed && b.readed && a.readed?.length > 0 && b.readed?.length > 0) {
        let [da, db] = [a.readed[0].updatedAt, b.readed[0].updatedAt];
        if (da instanceof Date && db instanceof Date)
          return db.valueOf()-da.valueOf()
      }
      return 0
    });
    dispatch({ type: FETCH_CATALOG_SUCCESS, payload: result.data.content });
  } catch (error) {
    dispatch({ type: FETCH_CATALOG_FAILURE });
  }
}

