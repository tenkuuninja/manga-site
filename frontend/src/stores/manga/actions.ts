import MangaApi from 'apis/manga.api';
import { ISearchObject } from 'interfaces'
import axios, { CancelTokenSource } from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import { ActionTypes as ChapterActionTypes } from '../chapter/types';
import { MeApi } from 'apis';

let cancelTokenSource: CancelTokenSource;

export const fetchManga = (id: number, option?: ISearchObject) => async (dispatch: Dispatch) => {
  if (cancelTokenSource !== undefined) cancelTokenSource.cancel();
  cancelTokenSource = axios.CancelToken.source();
  dispatch({ type: ActionTypes.FetchMangaRequest });
  try {
    let result = await MangaApi.byId(id).fetch(option, { cancelToken: cancelTokenSource.token });
    dispatch({ type: ActionTypes.FetchMangaSuccess, payload: result.data });
  } catch (error) {
    dispatch({ type: ActionTypes.FetchMangaFailure });
  }
}

export const followManga = (id: number) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: ActionTypes.FollowManga });
    dispatch({ type: ChapterActionTypes.FollowManga });
    await MeApi.followManga(id);
  } catch (error) {
    
  }
}

export const unfollowManga = (id: number) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: ActionTypes.UnfollowManga });
    dispatch({ type: ChapterActionTypes.UnfollowManga });
    await MeApi.unfollowManga(id);
  } catch (error) {
    
  }
}

export const increaseFavorite = (id: number) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: ActionTypes.IncreaseFavorite });
    await MangaApi.byId(id).increaseFavorite();
  } catch (error) {
    
  }
}

