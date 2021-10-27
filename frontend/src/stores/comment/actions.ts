import { MangaApi } from 'apis';
import { ISearchObject } from 'interfaces'
import { Dispatch } from 'redux';
import { ActionTypes } from './types';

export const fetchListCommentByMangaId = (mangaId: number, filter?: ISearchObject) => async (dispatch: Dispatch) => {
  dispatch({ type: ActionTypes.FetchCommentRequest });
  try {
    let result = await MangaApi.byId(mangaId).fetchComment(filter);
    dispatch({ type: ActionTypes.FetchCommentSuccess, payload: result.data });
  } catch (error) {
    dispatch({ type: ActionTypes.FetchCommentFailure });
  }
}

