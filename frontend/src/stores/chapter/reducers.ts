import { IAction, IChapter, IDataStore } from 'interfaces';
import { Reducer } from 'redux';
import { ActionTypes } from './types';
// import { ActionTypes as AllActionType } from '../all/types';

let initialState: IDataStore<IChapter> = {
  data: { mangaId: 0, number: 0, content: [] },
  isLoading: false, 
  isError: false
}

const authReducer: Reducer = (state: IDataStore<IChapter> = initialState, action: IAction): IDataStore<IChapter> => {
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
    // case AllActionType.FollowManga:
    //   return {
    //     ...state,
    //     data: {
    //       ...state.data,
    //       manga: {
    //         ...state.data.manga,
    //         isFollowing: 1
    //       }
    //     }
    //   }
    // case AllActionType.UnfollowManga:
    //   return {
    //     ...state,
    //     data: {
    //       ...state.data,
    //       manga: {
    //         ...state.data.manga,
    //         isFollowing: 0
    //       }
    //     }
    //   }
    default:
      return state;
  }
}

export default authReducer;
