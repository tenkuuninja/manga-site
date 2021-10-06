import GenreApi from 'apis/genre.api';
import { Dispatch } from 'redux';
import { CancelToken } from 'axios';
import { ActionTypes } from './types';

export const fetchListGenre = (cancelToken?: CancelToken) => async (dispatch: Dispatch) => {
  dispatch({ type: ActionTypes.FetchGenreRequest });
  try {
    let result = await GenreApi.fetchList(cancelToken);
    dispatch({ type: ActionTypes.FetchGenreSuccess, payload: result.data });
  } catch (error) {
    dispatch({ type: ActionTypes.FetchGenreFailure });
  }
}

