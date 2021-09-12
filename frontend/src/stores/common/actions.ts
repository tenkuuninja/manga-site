import { MangaApi } from 'apis';
import { Dispatch } from 'redux';
import { CancelToken } from 'axios';
import {
  // SET_CONFIG,
  // UPDATE_CONFIG,
  FETCH_TOP_MANGA_REQUEST,
  FETCH_TOP_MANGA_SUCCESS,
  FETCH_TOP_MANGA_FAILURE,
  // FETCH_FOLLOW_MANGA_REQUEST,
  // FETCH_FOLLOW_MANGA_SUCCESS,
  // FETCH_FOLLOW_MANGA_FAILURE,
  // FETCH_READED_MANGA_REQUEST,
  // FETCH_READED_MANGA_SUCCESS,
  // FETCH_READED_MANGA_FAILURE,
  // ADD_READED,
  // SYNC_WITH_LOCALSTORAGE,
  // SET_LOCAL_NAME,
  // SET_LOCAL_EMAIL
} from './constants';

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

// export const fetchFollowStory = (userId) => async dispatch => {
//   dispatch({ type: FETCH_FOLLOW_MANGA_REQUEST });
//   try {
//     let result = await UserService.id(userId).fetchManga();
//     dispatch({ type: FETCH_FOLLOW_MANGA_SUCCESS, payload: {
//       follow: result.data.manga
//     } });
//   } catch (error) {
//     dispatch({ type: FETCH_FOLLOW_MANGA_FAILURE });
//   }
// }

// export const fetchReadedStory = () => async dispatch => {
//   dispatch({ type: FETCH_READED_MANGA_REQUEST });
//   try {
//     let result = await MangaService.getList({in: [6759, 1536, 768, 3465], orderByIn: true});
//     dispatch({ type: FETCH_READED_MANGA_SUCCESS, payload: {
//       readed: result.data.manga
//     } });
//   } catch (error) {
//     dispatch({ type: FETCH_READED_MANGA_FAILURE });
//   }
// }

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


