import { IAction, IDataStore, IManga } from 'interfaces';
import { Reducer } from 'redux';
import { ActionTypes } from './types';

let initialState: IDataStore<IManga> = {
  data: {},
  isLoading: false, 
  isError: false
}

const authReducer: Reducer = (state: IDataStore<IManga> = initialState, action: IAction): IDataStore<IManga> => {
  switch(action.type) {
    case ActionTypes.FetchMangaRequest:
      return {
        ...state, 
        isLoading: true
      }
    case ActionTypes.FetchMangaSuccess:
      return {
        ...state,
        data: action.payload, 
        isLoading: false, 
        isError: false
      }
    case ActionTypes.FetchMangaFailure:
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
          isFollowing: 1
        }
      }
    case ActionTypes.UnfollowManga:
      return {
        ...state,
        data: {
          ...state.data,
          isFollowing: 0
        }
      }
    case ActionTypes.IncreaseFavorite:
      return {
        ...state,
        data: {
          ...state.data,
          favorite: (state.data?.favorite||0) + 1
        }
      }
    default:
      return state;
  }
}

export default authReducer;
