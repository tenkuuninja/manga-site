import { IAction, IHomeStore, IManga } from 'interfaces';
import { Reducer } from 'redux';
import { ActionTypes } from './types';

let initialState: IHomeStore = {
  lastest: {
    data: [],
    isLoading: false,
    isError: false,
  },
  newest: {
    data: [],
    isLoading: false,
    isError: false,
  },
  finish: {
    data: [],
    isLoading: false,
    isError: false,
  }
}

const authReducer: Reducer = (state: IHomeStore = initialState, action: IAction): IHomeStore => {
  switch(action.type) {
    case ActionTypes.FetchLastestUpdateRequest:
      return {
        ...state, 
        lastest: {
          ...state.lastest,
          isLoading: true
        }
      }
    case ActionTypes.FetchLastestUpdateSuccess:
      return {
        ...state, 
        lastest: {
          data: action.payload,
          isLoading: false,
          isError: false
        }
      }
    case ActionTypes.FetchLastestUpdateFailure:
      return {
        ...state, 
        lastest: {
          ...state.lastest,
          isLoading: false,
          isError: true
        }
      }
    case ActionTypes.FetchNewestRequest:
      return {
        ...state, 
        newest: {
          ...state.newest,
          isLoading: true
        }
      }
    case ActionTypes.FetchNewestSuccess:
      return {
        ...state, 
        newest: {
          data: action.payload,
          isLoading: false,
          isError: false
        }
      }
    case ActionTypes.FetchNewestFailure:
      return {
        ...state, 
        newest: {
          ...state.newest,
          isLoading: false,
          isError: true
        }
      }
    case ActionTypes.FetchFinishRequest:
      return {
        ...state, 
        finish: {
          ...state.finish,
          isLoading: true
        }
      }
    case ActionTypes.FetchFinishSuccess:
      return {
        ...state, 
        finish: {
          data: action.payload,
          isLoading: false,
          isError: false
        }
      }
    case ActionTypes.FetchFinishFailure:
      return {
        ...state, 
        finish: {
          ...state.finish,
          isLoading: false,
          isError: true
        }
      }
    case ActionTypes.FollowManga:
      let handleFollow = (item: IManga) => {
        if (action.payload.id === item.id) item.isFollowing = 1;
        return item;
      }
      return {
        ...state, 
        lastest: {
          ...state.lastest,
          data: state.lastest.data.map(handleFollow)
        },
        newest: {
          ...state.newest,
          data: state.newest.data.map(handleFollow)
        },
        finish: {
          ...state.finish,
          data: state.finish.data.map(handleFollow)
        },
      }
    case ActionTypes.FollowManga:
      let handleUnfollow = (item: IManga) => {
        if (action.payload.id === item.id) item.isFollowing = 0;
        return item;
      }
      return {
        ...state, 
        lastest: {
          ...state.lastest,
          data: state.lastest.data.map(handleUnfollow)
        },
        newest: {
          ...state.newest,
          data: state.newest.data.map(handleUnfollow)
        },
        finish: {
          ...state.finish,
          data: state.finish.data.map(handleUnfollow)
        },
      }
    default:
      return state;
  }
}

export default authReducer;
