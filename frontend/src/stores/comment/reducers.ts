import { IAction, ICommentStore } from 'interfaces';
import { Reducer } from 'redux';
import { ActionTypes } from './types';

let initialState: ICommentStore = {
  data: [],
  page: 0,
  count: 0,
  isLoading: false, 
  isError: false
}

const authReducer: Reducer = (state: ICommentStore = initialState, action: IAction): ICommentStore => {
  switch(action.type) {
    case ActionTypes.FetchCommentRequest:
      return {
        ...state, 
        isLoading: true
      }
    case ActionTypes.FetchCommentSuccess:
      return {
        ...state,
        data: action.payload.content, 
        page: action.payload.page, 
        count: action.payload.totalPage, 
        isLoading: false, 
        isError: false
      }
    case ActionTypes.FetchCommentFailure:
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
