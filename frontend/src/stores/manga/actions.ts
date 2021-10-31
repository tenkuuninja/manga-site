import MangaApi from 'apis/manga.api';
import axios, { CancelTokenSource } from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';

let cancelTokenSource: CancelTokenSource;

export const fetchManga = (id: number) => async (dispatch: Dispatch) => {
  if (cancelTokenSource !== undefined) cancelTokenSource.cancel();
  cancelTokenSource = axios.CancelToken.source();
  dispatch({ type: ActionTypes.FetchMangaRequest });
  try {
    let result = await MangaApi.byId(id).fetch({ sort: '-chapters.number' }, { cancelToken: cancelTokenSource.token });
    dispatch({ type: ActionTypes.FetchMangaSuccess, payload: result.data });
  } catch (error) {
    dispatch({ type: ActionTypes.FetchMangaFailure });
  }
}

export const followMangaInDetail = () => ({ type: ActionTypes.FollowManga });
export const unfollowMangaInDetail = () => ({ type: ActionTypes.UnfollowManga });

export const increaseFavorite = (id: number) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: ActionTypes.IncreaseFavorite });
    await MangaApi.byId(id).increaseFavorite();
  } catch (error) {
    
  }
}

