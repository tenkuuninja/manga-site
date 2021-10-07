import GenreApi from 'apis/genre.api';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';

export const fetchListGenre = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionTypes.FetchGenreRequest });
  try {
    let result = await GenreApi.fetchList();
    dispatch({ type: ActionTypes.FetchGenreSuccess, payload: result.data });
  } catch (error) {
    dispatch({ type: ActionTypes.FetchGenreFailure });
  }
}

