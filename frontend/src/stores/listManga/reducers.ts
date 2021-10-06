import { IAction, IListMangaStore } from 'interfaces';
import { Reducer } from 'redux';
import { ActionTypes } from './types';

let initialState: IListMangaStore = {
  payload: [],
  page: 0,
  totalPage: 0,
  isLoading: false, 
  isError: false
}

const authReducer: Reducer = (state: IListMangaStore = initialState, action: IAction): IListMangaStore => {
  switch(action.type) {
    case ActionTypes.FetchListMangaRequest:
      return {
        ...state, 
        isLoading: true
      }
    case ActionTypes.FetchListMangaSuccess:
      return {
        ...state, 
        payload: action.payload.content, 
        page: action.payload.page, 
        totalPage: action.payload.totalPage, 
        isLoading: false, 
        isError: false
      }
    case ActionTypes.FetchListMangaFailure:
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
