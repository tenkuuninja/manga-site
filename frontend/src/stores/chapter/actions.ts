import ChapterApi from 'apis/chapter.api';
import { Dispatch } from 'redux';
import { CancelToken } from 'axios';
import { ActionTypes } from './types';

export const fetchChapter = (id: number, options: any, cancelToken: CancelToken) => async (dispatch: Dispatch) => {
  dispatch({ type: ActionTypes.FetchChapterRequest });
  try {
    let result = await ChapterApi.byId(id).fetch(options, cancelToken);
    dispatch({ type: ActionTypes.FetchChapterSuccess, payload: result.data.content });
  } catch (error) {
    dispatch({ type: ActionTypes.FetchChapterFailure });
  }
}

