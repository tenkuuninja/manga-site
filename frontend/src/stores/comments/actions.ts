import { CommentApi, MangaApi } from 'apis';
import { IComment, ISearchObject } from 'interfaces'
import { Dispatch } from 'redux';
import { ActionTypes } from './types';

export const fetchCommentByMangaId = (mangaId: number, filter?: ISearchObject) => async (dispatch: Dispatch) => {
  dispatch({ type: ActionTypes.FetchCommentRequest });
  try {
    let result = await MangaApi.byId(mangaId).fetchComment(filter);
    dispatch({ type: ActionTypes.FetchCommentSuccess, payload: result.data });
  } catch (error) {
    dispatch({ type: ActionTypes.FetchCommentFailure });
  }
}


export const fetchMoreCommentByMangaId = (mangaId: number, filter?: ISearchObject) => async (dispatch: Dispatch) => {
  dispatch({ type: ActionTypes.FetchCommentRequest });
  try {
    let result = await MangaApi.byId(mangaId).fetchComment(filter);
    dispatch({ type: ActionTypes.FetchCommentSuccess, payload: result.data });
  } catch (error) {
    dispatch({ type: ActionTypes.FetchCommentFailure });
  }
}

export const addComment = (body: IComment) => async (dispatch: Dispatch) => {
  dispatch({ type: ActionTypes.AddCommentRequest, payload: {
    parentId: body.parentId
  } });
  try {
    let result = await CommentApi.createComment(body);
    dispatch({ type: ActionTypes.AddCommentSuccess, payload: result.data });
  } catch (error) {
    dispatch({ type: ActionTypes.AddCommentFailure });
  }
}

