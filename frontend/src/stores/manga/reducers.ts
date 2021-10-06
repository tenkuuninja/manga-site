import { IAction, IMangaStore } from 'interfaces';
import { Reducer } from 'redux';
import { ActionTypes } from './types';

let initialState: IMangaStore = {
  payload: {},
  isLoading: false, 
  isError: false
}

const authReducer: Reducer = (state: IMangaStore = initialState, action: IAction): IMangaStore => {
  switch(action.type) {
    case ActionTypes.FetchMangaRequest:
      return {
        ...state, 
        isLoading: true
      }
    case ActionTypes.FetchMangaSuccess:
      return {
        ...state,
        payload: action.payload.content, 
        isLoading: false, 
        isError: false
      }
    case ActionTypes.FetchMangaFailure:
      return {
        ...state,
        isLoading: false, 
        isError: true
      }
    default:
      return state;
  }
}

export default authReducer;
