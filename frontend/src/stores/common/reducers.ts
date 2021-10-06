import { IAction, ICommonStore } from 'interfaces';
import { Reducer } from 'redux';
import { ActionTypes } from './types';

let initialState: ICommonStore = {
  // config: {},
  top: { all: [], day: [], week: [], month: [], isLoading: true, isError: false },
  follow: { payload: [], isLoading: false, isError: false },
  readed: { payload: [], isLoading: false, isError: false, },
  autoComplete: { payload: [], isLoading: true, isError: false, },
  local: {
    name: '',
    email: ''
  }
}

const commonReducer: Reducer = (state: ICommonStore = initialState, action: IAction) => {
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
      return {...state, follow: {payload: action.payload.follow, isLoading: false, isError: false}}
    case ActionTypes.FetchFollowMangaFailure:
      return {...state, follow: {...state.follow, isError: true}}
    case ActionTypes.FetchReadedMangaRequest:
      return {...state, readed: {...state.readed, isLoading: true}}
    case ActionTypes.FetchReadedMangaSuccess:
      return {...state, readed: {payload: action.payload.readed, isLoading: false, isError: false}}
    case ActionTypes.FetchReadedMangaFailure:
      return {...state, readed: {...state.readed, isError: true}}
    case ActionTypes.FetchAutoCompleteRequest:
      return {...state, autoComplete: {...state.autoComplete, isLoading: true}}
    case ActionTypes.FetchAutoCompleteSuccess:
      return {...state, autoComplete: {payload: action.payload.content, isLoading: false, isError: false}}
    case ActionTypes.FetchAutoCompleteFailure:
      return {...state, autoComplete: {...state.autoComplete, isError: true}}
    case ActionTypes.AddReaded:
      state.readed.payload.unshift(action.payload.story);
      return state;
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
