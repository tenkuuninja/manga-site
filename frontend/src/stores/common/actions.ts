import { MangaApi, MeApi } from 'apis';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import { ISearchObject, ILocalCommon, IManga } from 'interfaces';

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
    result.data.content.sort((a, b) => {
      if (a.reads && b.reads && a.reads?.length > 0 && b.reads?.length > 0) {
        let [da, db] = [Date.parse(a.reads[0].updatedAt||''), Date.parse(b.reads[0].updatedAt||'')];
        return db-da
      }
      return 0
    });
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

export const addReadedManga = (data: IManga) => ({ type: ActionTypes.AddReaded, payload: { data } })
export const addFollowMangaInCommon = (data: IManga) => ({ type: ActionTypes.AddFollowManga, payload: { data } }) 
export const removeFollowMangaInCommon = (id: number) => ({ type: ActionTypes.RemoveFollowManga, payload: { id } })
export const followMangaInCommon = (id: number) => ({ type: ActionTypes.FollowManga, payload: { id } }) 
export const unfollowMangaInCommon = (id: number) => ({ type: ActionTypes.UnfollowManga, payload: { id } })

export const syncWithLocalStorage = () => async (dispatch: Dispatch) => {
  const defaultData: ILocalCommon = {
    name: '',
    email: ''
  }
  
  const data = JSON.parse(localStorage.getItem('utilities')||'{}');
  let isLocalUtilities = true;
  for (let key in defaultData) {
    if (!data.hasOwnProperty(key)) {
      isLocalUtilities = false;
    }
  }

  if (isLocalUtilities) {
    dispatch({ type: ActionTypes.SyncWithLocalstorage, payload: { data } });
  } else {
    localStorage.setItem('utilities', JSON.stringify(defaultData));
    dispatch({ type: ActionTypes.SyncWithLocalstorage, payload: { data: defaultData } });
  }
}

export const setLocalName = (name: string) => async (dispatch: Dispatch) => {
  const dataString = localStorage.getItem('utilities');
  if (dataString) {
    let dataJson = JSON.parse(dataString);
    dataJson.name = name;
    localStorage.setItem('utilities', JSON.stringify(dataJson));
    dispatch({ type: ActionTypes.SetLocalName, payload: { name } });
  }
}

export const setLocalEmail = (email: string) => async (dispatch: Dispatch) => {
  const dataString = localStorage.getItem('utilities');
  if (dataString) {
    let dataJson = JSON.parse(dataString);
    dataJson.email = email;
    localStorage.setItem('utilities', JSON.stringify(dataJson));
    dispatch({ type: ActionTypes.SetLocalEmail, payload: { email } });
  }
}

