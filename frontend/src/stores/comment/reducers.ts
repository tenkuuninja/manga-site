import { IAction, IComment, ICommentStore } from 'interfaces';
import { Reducer } from 'redux';
import { ActionTypes } from './types';

let initialState: ICommentStore = {
  data: [],
  current: {
    data: {},
    isLoading: false,
    isError: false,
  },
  add: {
    isLoading: false,
    isError: false,
    parentId: null,
  },
  page: 0,
  count: 0,
  isLoading: false, 
  isError: false
}

const authReducer: Reducer = (state: ICommentStore = initialState, action: IAction): ICommentStore => {
  switch(action.type) {
    case ActionTypes.ClearCommentData:
      return {
        ...state, 
        data: []
      }
    case ActionTypes.FetchCommentRequest:
      return {
        ...state, 
        isLoading: true
      }
    case ActionTypes.FetchCommentSuccess:
      return {
        ...state,
        data: state.data.concat(action.payload.content), 
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
    case ActionTypes.AddCommentRequest:
      return {
        ...state, 
        add: {
          ...state.add,
          isLoading: true,
          parentId: action.payload.parentId
        }
      }
    case ActionTypes.AddCommentSuccess:
      if (typeof action.payload?.parentId === 'number') {
        return {
          ...state,
          data: state.data.map((cmt: IComment) => {
            if (cmt.id === action.payload?.parentId) {
              cmt?.replies?.push(action.payload);
            }
            return cmt;
          }),
          add: {
            ...state.add,
            isLoading: false, 
            isError: false
          }
        }
      } else {
        state.data.unshift(action.payload);
        return {
          ...state,
          add: { 
            ...state.add,
            isLoading: false ,
            isError: false
          }
        }
      }
    case ActionTypes.AddCommentFailure:
      return {
        ...state,
        add: {
          ...state.add,
          isLoading: false, 
          isError: true
        }
      }
    default:
      return state;
  }
}

export default authReducer;
