import { IAction, IListMangaStore } from 'interfaces';
import { Reducer } from 'redux';
import { ActionTypes } from './types';

let initialState: IListMangaStore = {
  data: [],
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
        data: action.payload.content, 
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
    case ActionTypes.FollowManga:
      return {
        ...state,
        data: state.data.map(item => {
          if (action.payload.id === item.id) item.isFollowing = 1;
          return item;
        })
      }
    case ActionTypes.UnfollowManga:
      return {
        ...state,
        data: state.data.map(item => {
          if (action.payload.id === item.id) item.isFollowing = 0;
          return item;
        })
      }
    case ActionTypes.RemoveMangaById:
      return {
        ...state,
        data: state.data.filter(item => item.id !== action.payload.id)
      }
    default:
      return state;
  }
}

export default authReducer;
