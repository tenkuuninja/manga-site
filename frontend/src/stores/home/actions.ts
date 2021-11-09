import MangaApi from 'apis/manga.api';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';

export const fetchLastestUpdateManga = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionTypes.FetchLastestUpdateRequest });
  try {
    let result = await MangaApi.fetchList();
    dispatch({ type: ActionTypes.FetchLastestUpdateSuccess, payload: result.data.content });
  } catch (error) {
    dispatch({ type: ActionTypes.FetchLastestUpdateFailure });
  }
}

export const fetchNewestManga = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionTypes.FetchNewestRequest });
  try {
    let result = await MangaApi.fetchList({ sort: '-createdAt' });
    dispatch({ type: ActionTypes.FetchNewestSuccess, payload: result.data.content });
  } catch (error) {
    dispatch({ type: ActionTypes.FetchNewestFailure });
  }
}

export const fetchFinishManga = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionTypes.FetchFinishRequest });
  try {
    let result = await MangaApi.fetchList();
    dispatch({ type: ActionTypes.FetchFinishSuccess, payload: result.data.content });
  } catch (error) {
    dispatch({ type: ActionTypes.FetchFinishFailure });
  }
}

