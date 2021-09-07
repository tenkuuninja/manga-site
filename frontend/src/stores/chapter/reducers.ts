import { IAction, IChapterStore } from 'interfaces';
import { Reducer } from 'redux';
import {
  FETCH_CHAPTER_REQUEST,
  FETCH_CHAPTER_SUCCESS,
  FETCH_CHAPTER_FAILURE
} from './constants';

let initialState: IChapterStore = {
  payload: { mangaId: 0, number: 0, content: [] },
  isLoading: false, 
  isError: false
}

const authReducer: Reducer = (state: IChapterStore = initialState, action: IAction): IChapterStore => {
  switch(action.type) {
    case FETCH_CHAPTER_REQUEST:
      return {
        ...state, 
        isLoading: true
      }
    case FETCH_CHAPTER_SUCCESS:
      return {
        ...state,
        payload: action.payload.content,  
        isLoading: false, 
        isError: false
      }
    case FETCH_CHAPTER_FAILURE:
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
