import ChapterApi from 'apis/chapter.api';
import { Dispatch } from 'redux';
import axios, { CancelTokenSource } from 'axios';
import { ActionTypes } from './types';

let cancelTokenSource: CancelTokenSource;

export const fetchChapter = (id: number, options: any) => async (dispatch: Dispatch) => {
  cancelTokenSource.cancel();
  cancelTokenSource = axios.CancelToken.source();
  dispatch({ type: ActionTypes.FetchChapterRequest });
  try {
    let result = await ChapterApi.byId(id).fetch(options, { cancelToken: cancelTokenSource.token });
    dispatch({ type: ActionTypes.FetchChapterSuccess, payload: result.data.content });
  } catch (error) {
    dispatch({ type: ActionTypes.FetchChapterFailure });
  }
}

