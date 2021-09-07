import ChapterApi from 'apis/chapter.api';
import { Dispatch } from 'redux';
import { CancelToken } from 'axios';
import {
  FETCH_CHAPTER_REQUEST,
  FETCH_CHAPTER_SUCCESS,
  FETCH_CHAPTER_FAILURE
} from './constants';

export const fetchChapter = (id: number, options: any, cancelToken: CancelToken) => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_CHAPTER_REQUEST });
  try {
    let result = await ChapterApi.byId(id).fetch(options, cancelToken);
    dispatch({ type: FETCH_CHAPTER_SUCCESS, payload: result.data.content });
  } catch (error) {
    dispatch({ type: FETCH_CHAPTER_FAILURE });
  }
}

