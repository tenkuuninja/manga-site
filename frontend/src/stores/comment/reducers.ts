import { IAction, ICommentStore } from 'interfaces';
import { Reducer } from 'redux';
import {
  FETCH_COMMENT_REQUEST,
  FETCH_COMMENT_SUCCESS,
  FETCH_COMMENT_FAILURE
} from './constants';

let initialState: ICommentStore = {
  payload: [],
  page: 0,
  count: 0,
  isLoading: false, 
  isError: false
}

const authReducer: Reducer = (state: ICommentStore = initialState, action: IAction): ICommentStore => {
  switch(action.type) {
    case FETCH_COMMENT_REQUEST:
      return {
        ...state, 
        isLoading: true
      }
    case FETCH_COMMENT_SUCCESS:
      return {
        ...state,
        payload: action.payload.content, 
        page: action.payload.page, 
        count: action.payload.totalPage, 
        isLoading: false, 
        isError: false
      }
    case FETCH_COMMENT_FAILURE:
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
