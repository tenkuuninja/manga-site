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

export const fetchListMangaFollowAfterUnfolowWithoutStatus = (id: number, filter?: ISearchObject) => async (dispatch: Dispatch) => {
  if (cancelTokenSource !== undefined) cancelTokenSource.cancel();
  cancelTokenSource = axios.CancelToken.source();
  try {
    dispatch({ type: ActionTypes.RemoveMangaById, payload: { id } });
    await MeApi.unfollowManga(id);
    let result = await MeApi.fetchManga(filter, { cancelToken: cancelTokenSource.token });
    dispatch({ type: ActionTypes.FetchListMangaSuccess, payload: result.data });
  } catch (error) {
    
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

export const followMangaInList = (id: number) => ({ type: ActionTypes.FollowManga, payload: { id } });
export const unfollowMangaInList = (id: number) => ({ type: ActionTypes.UnfollowManga, payload: { id } });

export const fetchListMangaReaded = (filter?: ISearchObject) => async (dispatch: Dispatch) => {
  if (cancelTokenSource !== undefined) cancelTokenSource.cancel();
  cancelTokenSource = axios.CancelToken.source();
  dispatch({ type: ActionTypes.FetchListMangaRequest });
  try {
    let result = await MeApi.fetchReaded(filter, { cancelToken: cancelTokenSource.token });
    result.data.content.sort((a, b) => {
      if (a.reads && b.reads && a.reads?.length > 0 && b.reads?.length > 0) {
        let [da, db] = [Date.parse(a.reads[0].updatedAt||''), Date.parse(b.reads[0].updatedAt||'')];
        return db-da
      }
      return 0
    });
    dispatch({ type: ActionTypes.FetchListMangaSuccess, payload: result.data });
  } catch (error) {
    dispatch({ type: ActionTypes.FetchListMangaFailure });
  }
}

