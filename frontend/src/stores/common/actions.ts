import { MangaApi, MeApi } from 'apis';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import { ISearchObject } from 'interfaces';

export const fetchTopManga = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionTypes.FetchTopMangaRequest });
  try {
    let result = await MangaApi.fetchTop();
    dispatch({ type: ActionTypes.FetchTopMangaSuccess, payload: {
      all: result.data.all,
      day: result.data.day,
      week: result.data.week,
      month: result.data.month
    } });
  } catch (error) {
    dispatch({ type: ActionTypes.FetchTopMangaFailure });
  }
}

export const fetchFollowManga = (options?: ISearchObject) => async (dispatch: Dispatch) => {
  dispatch({ type: ActionTypes.FetchFollowMangaRequest });
  try {
    let result = await MeApi.fetchManga(options);
    dispatch({ type: ActionTypes.FetchFollowMangaSuccess, payload: {
      follow: result.data.content
    } });
  } catch (error) {
    dispatch({ type: ActionTypes.FetchFollowMangaFailure });
  }
}

export const fetchReadedManga = (options?: ISearchObject) => async (dispatch: Dispatch) => {
  dispatch({ type: ActionTypes.FetchReadedMangaRequest });
  try {
    let result = await MeApi.fetchReaded(options);
    dispatch({ type: ActionTypes.FetchReadedMangaSuccess, payload: {
      readed: result.data.content
    } });
  } catch (error) {
    console.log(error)
    dispatch({ type: ActionTypes.FetchReadedMangaFailure });
  }
}

export const fetchAutoComplete = (search: string) => async (dispatch: Dispatch) => {
  dispatch({ type: ActionTypes.FetchAutoCompleteRequest });
  try {
    let result = await MangaApi.fetchList({ search });
    dispatch({ type: ActionTypes.FetchAutoCompleteSuccess, payload: {
      content: result.data.content
    } });
  } catch (error) {
    console.log(error)
    dispatch({ type: ActionTypes.FetchAutoCompleteFailure });
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


