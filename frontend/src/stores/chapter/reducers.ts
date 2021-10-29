import { IAction, IChapterStore } from 'interfaces';
import { Reducer } from 'redux';
import { ActionTypes } from './types';

let initialState: IChapterStore = {
  data: { mangaId: 0, number: 0, content: [] },
  isLoading: false, 
  isError: false
}

const authReducer: Reducer = (state: IChapterStore = initialState, action: IAction): IChapterStore => {
  switch(action.type) {
    case ActionTypes.FetchChapterRequest:
      return {
        ...state, 
        isLoading: true
      }
    case ActionTypes.FetchChapterSuccess:
      return {
        ...state,
        data: action.payload,  
        isLoading: false, 
        isError: false
      }
    case ActionTypes.FetchChapterFailure:
      return {
        ...state,
        isLoading: false, 
        isError: true
      }
    case ActionTypes.FollowManga:
      return {
        ...state,
        data: {
          ...state.data,
          manga: {
            ...state.data.manga,
            isFollowing: 1
          }
        }
      }
    case ActionTypes.UnfollowManga:
      return {
        ...state,
        data: {
          ...state.data,
          manga: {
            ...state.data.manga,
            isFollowing: 0
          }
        }
      }
    default:
      return state;
  }
}

export default authReducer;
