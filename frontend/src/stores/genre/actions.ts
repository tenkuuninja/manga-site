import GenreApi from 'apis/genre.api';
import { IManga } from 'interfaces';
import { Dispatch } from 'redux';
import { CancelToken } from 'axios';
import {
  FETCH_GENRE_REQUEST,
  FETCH_GENRE_SUCCESS,
  FETCH_GENRE_FAILURE
} from './constants';

export const fetchListGenre = (cancelToken?: CancelToken) => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_GENRE_REQUEST });
  try {
    let result = await GenreApi.fetchList(cancelToken);
    dispatch({ type: FETCH_GENRE_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({ type: FETCH_GENRE_FAILURE });
  }
}

