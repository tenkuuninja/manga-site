import { IAction, ICatalogStore } from 'interfaces';
import { Reducer } from 'redux';
import {
  FETCH_CATALOG_REQUEST,
  FETCH_CATALOG_SUCCESS,
  FETCH_CATALOG_FAILURE
} from './constants';

let initialState: ICatalogStore = {
  payload: [],
  page: 0,
  totalPage: 0,
  isLoading: false, 
  isError: false
}

const authReducer: Reducer = (state: ICatalogStore = initialState, action: IAction): ICatalogStore => {
  switch(action.type) {
    case FETCH_CATALOG_REQUEST:
      return {
        ...state, 
        isLoading: true
      }
    case FETCH_CATALOG_SUCCESS:
      return {
        ...state,
        payload: action.payload.content, 
        page: action.payload.page, 
        totalPage: action.payload.totalPage, 
        isLoading: false, 
        isError: false
      }
    case FETCH_CATALOG_FAILURE:
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
