import { IAction, ICommonStore } from 'interfaces';
import { Reducer } from 'redux';
import {
  // SET_CONFIG,
  // UPDATE_CONFIG,
  FETCH_TOP_MANGA_REQUEST,
  FETCH_TOP_MANGA_SUCCESS,
  FETCH_TOP_MANGA_FAILURE,
  FETCH_FOLLOW_MANGA_REQUEST,
  FETCH_FOLLOW_MANGA_SUCCESS,
  FETCH_FOLLOW_MANGA_FAILURE,
  FETCH_READED_MANGA_REQUEST,
  FETCH_READED_MANGA_SUCCESS,
  FETCH_READED_MANGA_FAILURE,
  ADD_READED,
  SYNC_WITH_LOCALSTORAGE,
  SET_LOCAL_NAME,
  SET_LOCAL_EMAIL
} from './constants';

let initialState: ICommonStore = {
  // config: {},
  top: { all: [], day: [], week: [], month: [], isLoading: true, isError: false },
  follow: { payload: [], isLoading: false, isError: false },
  readed: { payload: [], isLoading: false, isError: false, },
  local: {
    name: '',
    email: ''
  }
}

const commonReducer: Reducer = (state: ICommonStore = initialState, action: IAction) => {
  switch (action.type) {
    // case SET_CONFIG:
    //   return { ...state, config: action.payload.config }
    // case UPDATE_CONFIG:
    //   return { ...state, config: { ...state.config, [action.payload.key]: action.payload.value } }
    case FETCH_TOP_MANGA_REQUEST:
      return {...state, top: {...state.top, isLoading: true, isError: false}}
    case FETCH_TOP_MANGA_SUCCESS:
      return {...state, top: {
        ...state.top,
        all: action.payload.all, 
        day: action.payload.day, 
        week: action.payload.week, 
        month: action.payload.month,
        isLoading: false,
        isError: false
      }}
    case FETCH_TOP_MANGA_FAILURE:
      return {...state, top: {...state.top, isLoading: false, isError: true}}
    case FETCH_FOLLOW_MANGA_REQUEST:
      return {...state, follow: {...state.follow, isLoading: true }}
    case FETCH_FOLLOW_MANGA_SUCCESS:
      return {...state, follow: {payload: action.payload.follow, isLoading: false, isError: false}}
    case FETCH_FOLLOW_MANGA_FAILURE:
      return {...state, follow: {...state.follow, isError: true}}
    case FETCH_READED_MANGA_REQUEST:
      return {...state, readed: {...state.readed, isLoading: true}}
    case FETCH_READED_MANGA_SUCCESS:
      return {...state, readed: {payload: action.payload.readed, isLoading: false, isError: false}}
    case FETCH_READED_MANGA_FAILURE:
      return {...state, readed: {...state.readed, isError: true}}
    case ADD_READED:
      state.readed.payload.unshift(action.payload.story);
      return state;
    case SYNC_WITH_LOCALSTORAGE:
      return {...state, local: action.payload.data}
    case SET_LOCAL_NAME:
      return {...state, local: {...state.local, name: action.payload.name}}
    case SET_LOCAL_EMAIL:
      return {...state, local: {...state.local, email: action.payload.email}}
    default:
      return state;
  }
}

export default commonReducer;
