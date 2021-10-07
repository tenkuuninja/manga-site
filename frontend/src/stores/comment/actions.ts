import CommentApi from 'apis/comment.api';
import { ISearchObject } from 'interfaces'
import { Dispatch } from 'redux';
import { ActionTypes } from './types';

export const fetchListComment = (filter?: ISearchObject) => async (dispatch: Dispatch) => {
  dispatch({ type: ActionTypes.FetchCommentRequest });
  try {
    let result = await CommentApi.fetchList(filter);
    dispatch({ type: ActionTypes.FetchCommentSuccess, payload: result.data.content });
  } catch (error) {
    dispatch({ type: ActionTypes.FetchCommentFailure });
  }
}

