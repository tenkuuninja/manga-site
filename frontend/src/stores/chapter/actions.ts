import ChapterApi from 'apis/chapter.api';
import { Dispatch } from 'redux';
import axios, { CancelTokenSource } from 'axios';
import { ActionTypes } from './types';
import { ActionTypes as CommonActionType } from '../common/types';
import { ActionTypes as MangaActionType } from '../manga/types';
import { IAppState } from 'interfaces';
import { MeApi } from 'apis';

let cancelTokenSource: CancelTokenSource;

export const fetchChapter = (id: number) => async (dispatch: Dispatch, getState: any) => {
  if (cancelTokenSource !== undefined) cancelTokenSource.cancel();
  cancelTokenSource = axios.CancelToken.source();
  dispatch({ type: ActionTypes.FetchChapterRequest });
  try {
    let result = await ChapterApi.byId(id).fetch({ include: 'navigation' }, { cancelToken: cancelTokenSource.token });
    dispatch({ type: ActionTypes.FetchChapterSuccess, payload: result.data });
    const { auth }: IAppState = getState();
    if (auth.isLoggedIn && typeof result.data.id === 'number' && typeof auth?.user?.id === 'number') {
      MeApi.read(result.data.id).then(res => {}).catch(err => {});
      dispatch({ type: MangaActionType.AddReadedManga, payload: { number: result.data.number } });
      dispatch({ type: CommonActionType.AddReaded, payload: result.data.manga });
    }
  } catch (error) {
    dispatch({ type: ActionTypes.FetchChapterFailure });
  }
}

export const followMangaInChapter = () => ({ type: ActionTypes.FollowManga });
export const unfollowMangaInChapter = () => ({ type: ActionTypes.UnfollowManga });

