import { MeApi } from 'apis';
import MangaApi from 'apis/manga.api';
import axios, { CancelTokenSource } from 'axios';
import { ISearchObject } from 'interfaces'
import { Dispatch } from 'redux';
import { ActionTypes } from './types';

let cancelTokenSource: CancelTokenSource;

export const fetchListManga = (filter?: ISearchObject) => async (dispatch: Dispatch) => {
  if (cancelTokenSource !== undefined) cancelTokenSource.cancel();
  cancelTokenSource = axios.CancelToken.source();
  dispatch({ type: ActionTypes.FetchListMangaRequest });
  try {
    let result = await MangaApi.fetchList(filter, { cancelToken: cancelTokenSource.token });
    dispatch({ type: ActionTypes.FetchListMangaSuccess, payload: result.data });
  } catch (error) {
    dispatch({ type: ActionTypes.FetchListMangaFailure });
  }
}

export const fetchListMangaFollow = (filter?: ISearchObject) => async (dispatch: Dispatch) => {
  if (cancelTokenSource !== undefined) cancelTokenSource.cancel();
  cancelTokenSource = axios.CancelToken.source();
  dispatch({ type: ActionTypes.FetchListMangaRequest });
  try {
    let result = await MeApi.fetchManga(filter, { cancelToken: cancelTokenSource.token });
    dispatch({ type: ActionTypes.FetchListMangaSuccess, payload: result.data });
  } catch (error) {
    dispatch({ type: ActionTypes.FetchListMangaFailure });
  }
}

export const fetchListMangaReaded = (filter?: ISearchObject) => async (dispatch: Dispatch) => {
  if (cancelTokenSource !== undefined) cancelTokenSource.cancel();
  cancelTokenSource = axios.CancelToken.source();
  dispatch({ type: ActionTypes.FetchListMangaRequest });
  try {
    let result = await MeApi.fetchReaded(filter, { cancelToken: cancelTokenSource.token });
    result.data.content.sort((a, b) => {
      if (a.readed && b.readed && a.readed?.length > 0 && b.readed?.length > 0) {
        let [da, db] = [a.readed[0].updatedAt, b.readed[0].updatedAt];
        if (da instanceof Date && db instanceof Date)
          return db.valueOf()-da.valueOf()
      }
      return 0
    });
    dispatch({ type: ActionTypes.FetchListMangaSuccess, payload: result.data });
  } catch (error) {
    dispatch({ type: ActionTypes.FetchListMangaFailure });
  }
}

