import { IAction, IGenreStore } from 'interfaces';
import { Reducer } from 'redux';
import { ActionTypes } from './types';

let initialState: IGenreStore = {
  data: [],
  isLoading: false, 
  isError: false
}

const authReducer: Reducer = (state: IGenreStore = initialState, action: IAction): IGenreStore => {
  switch(action.type) {
    case ActionTypes.FetchGenreRequest:
      return {
        ...state, 
        isLoading: true
      }
    case ActionTypes.FetchGenreSuccess:
      return {
        ...state,
        data: action.payload,  
        isLoading: false, 
        isError: false
      }
    case ActionTypes.FetchGenreFailure:
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
