import { IAction, ICommonStore, IManga } from 'interfaces';
import { Reducer } from 'redux';
import { ActionTypes } from './types';

let initialState: ICommonStore = {
  // config: {},
  top: { all: [], day: [], week: [], month: [], isLoading: true, isError: false },
  follow: { data: [], isLoading: false, isError: false },
  readed: { data: [], isLoading: false, isError: false, },
  autoComplete: { data: [], isLoading: true, isError: false, },
  local: {
    name: '',
    email: ''
  },
}

const commonReducer: Reducer = (state: ICommonStore = initialState, action: IAction): ICommonStore => {
  switch (action.type) {
    // case ActionTypes.SetConfig:
    //   return { ...state, config: action.payload.config }
    // case ActionTypes.UpdateConfig:
    //   return { ...state, config: { ...state.config, [action.payload.key]: action.payload.value } }
    case ActionTypes.FetchTopMangaRequest:
      return {...state, top: {...state.top, isLoading: true, isError: false}}
    case ActionTypes.FetchTopMangaSuccess:
      return {...state, top: {
        ...state.top,
        all: action.payload.all, 
        day: action.payload.day, 
        week: action.payload.week, 
        month: action.payload.month,
        isLoading: false,
        isError: false
      }}
    case ActionTypes.FetchTopMangaFailure:
      return {...state, top: {...state.top, isLoading: false, isError: true}}
    case ActionTypes.FetchFollowMangaRequest:
      return {...state, follow: {...state.follow, isLoading: true }}
    case ActionTypes.FetchFollowMangaSuccess:
      return {...state, follow: {data: action.payload.follow, isLoading: false, isError: false}}
    case ActionTypes.FetchFollowMangaFailure:
      return {...state, follow: {...state.follow, isError: true}}
    case ActionTypes.FetchReadedMangaRequest:
      return {...state, readed: {...state.readed, isLoading: true}}
    case ActionTypes.FetchReadedMangaSuccess:
      return {...state, readed: {data: action.payload.readed, isLoading: false, isError: false}}
    case ActionTypes.FetchReadedMangaFailure:
      return {...state, readed: {...state.readed, isError: true}}
    case ActionTypes.FetchAutoCompleteRequest:
      return {...state, autoComplete: {...state.autoComplete, isLoading: true}}
    case ActionTypes.FetchAutoCompleteSuccess:
      return {...state, autoComplete: {data: action.payload.content, isLoading: false, isError: false}}
    case ActionTypes.FetchAutoCompleteFailure:
      return {...state, autoComplete: {...state.autoComplete, isError: true}}
    case ActionTypes.AddReaded:
      state.readed.data = state.readed.data.filter(item => item.id !== action.payload.data);
      state.readed.data.unshift(action.payload.data);
      return state;
    case ActionTypes.AddFollowManga:
      return {
        ...state,
        follow: {
          ...state.follow,
          data: [
            action.payload.data,
            ...state.follow.data.filter(item => item.id !== action.payload.data)
          ]
        }
      };
    case ActionTypes.RemoveFollowManga:
      return {
        ...state,
        follow: {
          ...state.follow,
          data: state.follow.data.filter(item => item.id !== action.payload.id)
        }
      };
    case ActionTypes.FollowManga:
      let handleFollow = (item: IManga) => {
        if (action.payload.id === item.id) item.isFollowing = 1;
        return item;
      }
      return {
        ...state, 
        readed: {
          ...state.readed,
          data: state.readed.data.map(handleFollow)
        },
        top: {
          ...state.top,
          day: state.top.day.map(handleFollow),
          week: state.top.week.map(handleFollow),
          month: state.top.month.map(handleFollow),
        }
      }
    case ActionTypes.UnfollowManga:
      let handleUnfollow = (item: IManga) => {
        if (action.payload.id === item.id) item.isFollowing = 0;
        return item;
      }
      return {
        ...state, 
        readed: {
          ...state.readed,
          data: state.readed.data.map(handleUnfollow)
        },
        top: {
          ...state.top,
          day: state.top.day.map(handleUnfollow),
          week: state.top.week.map(handleUnfollow),
          month: state.top.month.map(handleUnfollow),
        }
      }
    case ActionTypes.SyncWithLocalstorage:
      return {...state, local: action.payload.data}
    case ActionTypes.SetLocalName:
      return {...state, local: {...state.local, name: action.payload.name}}
    case ActionTypes.SetLocalEmail:
      return {...state, local: {...state.local, email: action.payload.email}}
    default:
      return state;
  }
}

export default commonReducer;
