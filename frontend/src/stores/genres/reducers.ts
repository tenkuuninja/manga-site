import { IAction, IGenre, IListGenreStore } from 'interfaces';
import { Reducer } from 'redux';
import { ActionTypes } from './types';

let initialState: IListGenreStore = {
  data: [],
  byId: {},
  isLoading: false, 
  isError: false
}

const authReducer: Reducer = (state: IListGenreStore = initialState, action: IAction): IListGenreStore => {
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
        byId: action.payload?.reduce(function(prev: { [id: number]: IGenre }, curr: IGenre) {
          prev[curr.id||0] = curr;
          return prev;
        }, {}) || {},
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
