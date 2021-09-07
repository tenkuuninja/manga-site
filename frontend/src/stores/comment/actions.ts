import CommentApi, { IParamFetchCommentList } from 'apis/comment.api';
import { CancelToken } from 'axios';
import { Dispatch } from 'redux';
import {
  FETCH_COMMENT_REQUEST,
  FETCH_COMMENT_SUCCESS,
  FETCH_COMMENT_FAILURE
} from './constants';

export const fetchListComment = (filter?: IParamFetchCommentList, cancelToken?: CancelToken) => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_COMMENT_REQUEST });
  try {
    let result = await CommentApi.fetchList(filter, cancelToken);
    dispatch({ type: FETCH_COMMENT_SUCCESS, payload: result.data.content });
  } catch (error) {
    dispatch({ type: FETCH_COMMENT_FAILURE });
  }
}

