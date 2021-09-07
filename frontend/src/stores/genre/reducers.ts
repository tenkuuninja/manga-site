import { IAction, IGenreStore } from 'interfaces';
import { Reducer } from 'redux';
import {
  FETCH_GENRE_REQUEST,
  FETCH_GENRE_SUCCESS,
  FETCH_GENRE_FAILURE
} from './constants';

let initialState: IGenreStore = {
  payload: [],
  isLoading: false, 
  isError: false
}

const authReducer: Reducer = (state: IGenreStore = initialState, action: IAction): IGenreStore => {
  switch(action.type) {
    case FETCH_GENRE_REQUEST:
      return {
        ...state, 
        isLoading: true
      }
    case FETCH_GENRE_SUCCESS:
      return {
        ...state,
        payload: action.payload,  
        isLoading: false, 
        isError: false
      }
    case FETCH_GENRE_FAILURE:
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
