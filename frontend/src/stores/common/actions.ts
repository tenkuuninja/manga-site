import { MangaApi, MeApi } from 'apis';
import { Dispatch } from 'redux';
import { CancelToken } from 'axios';
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
  FETCH_AUTO_COMPLETE_REQUEST,
  FETCH_AUTO_COMPLETE_SUCCESS,
  FETCH_AUTO_COMPLETE_FAILURE,
  // ADD_READED,
  // SYNC_WITH_LOCALSTORAGE,
  // SET_LOCAL_NAME,
  // SET_LOCAL_EMAIL
} from './constants';
import { ISearchObject } from 'interfaces';

export const fetchTopManga = (cancelToken?: CancelToken) => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_TOP_MANGA_REQUEST });
  try {
    let result = await MangaApi.fetchTop();
    dispatch({ type: FETCH_TOP_MANGA_SUCCESS, payload: {
      all: result.data.all,
      day: result.data.day,
      week: result.data.week,
      month: result.data.month
    } });
  } catch (error) {
    dispatch({ type: FETCH_TOP_MANGA_FAILURE });
  }
}

export const fetchFollowManga = (options?: ISearchObject,cancelToken?: CancelToken) => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_FOLLOW_MANGA_REQUEST });
  try {
    let result = await MeApi.fetchManga(options, cancelToken);
    dispatch({ type: FETCH_FOLLOW_MANGA_SUCCESS, payload: {
      follow: result.data.content
    } });
  } catch (error) {
    dispatch({ type: FETCH_FOLLOW_MANGA_FAILURE });
  }
}

export const fetchReadedManga = (options?: ISearchObject,cancelToken?: CancelToken) => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_READED_MANGA_REQUEST });
  try {
    let result = await MeApi.fetchReaded(options, cancelToken);
    dispatch({ type: FETCH_READED_MANGA_SUCCESS, payload: {
      readed: result.data.content
    } });
  } catch (error) {
    console.log(error)
    dispatch({ type: FETCH_READED_MANGA_FAILURE });
  }
}

export const fetchAutoComplete = (search: string, cancelToken?: CancelToken) => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_AUTO_COMPLETE_REQUEST });
  try {
    let result = await MangaApi.fetchList({ search }, cancelToken);
    dispatch({ type: FETCH_AUTO_COMPLETE_SUCCESS, payload: {
      content: result.data.content
    } });
  } catch (error) {
    console.log(error)
    dispatch({ type: FETCH_AUTO_COMPLETE_FAILURE });
  }
}

// export const addHistory = (data) => async dispatch => {
//   dispatch({ type: ADD_READED, payload: { story: data } });
// }

// export const syncWithLocalStorage = () => async dispatch => {
//   const dataString = localStorage.getItem('utilities');
//   if (dataString) {
//     dispatch({ type: SYNC_WITH_LOCALSTORAGE, payload: { data: JSON.parse(dataString) } });
//   } else {
//     localStorage.setItem('utilities', '{}');
//   }
// }

// export const setLocalName = (name) => async dispatch => {
//   const dataString = localStorage.getItem('utilities');
//   if (dataString) {
//     let dataJson = JSON.parse(dataString);
//     dataJson.name = name;
//     localStorage.setItem('utilities', JSON.stringify(dataJson));
//     dispatch({ type: SET_LOCAL_NAME, payload: { name } });
//   }
// }

// export const setLocalEmail = (email) => async dispatch => {
//   const dataString = localStorage.getItem('utilities');
//   if (dataString) {
//     let dataJson = JSON.parse(dataString);
//     dataJson.email = email;
//     localStorage.setItem('utilities', JSON.stringify(dataJson));
//     dispatch({ type: SET_LOCAL_EMAIL, payload: { email } });
//   }
// }


