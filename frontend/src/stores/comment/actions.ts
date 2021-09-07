import CommentApi from 'apis/comment.api';
import { ISearchObject } from 'interfaces'
import { CancelToken } from 'axios';
import { Dispatch } from 'redux';
import {
  FETCH_COMMENT_REQUEST,
  FETCH_COMMENT_SUCCESS,
  FETCH_COMMENT_FAILURE
} from './constants';

export const fetchListComment = (filter?: ISearchObject, cancelToken?: CancelToken) => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_COMMENT_REQUEST });
  try {
    let result = await CommentApi.fetchList(filter, cancelToken);
    dispatch({ type: FETCH_COMMENT_SUCCESS, payload: result.data.content });
  } catch (error) {
    dispatch({ type: FETCH_COMMENT_FAILURE });
  }
}

