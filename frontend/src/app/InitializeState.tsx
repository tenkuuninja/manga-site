import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { autoLogin } from 'stores/auth/actions';
import { fetchListGenre } from 'stores/genres/actions';
import { fetchTopManga, fetchReadedManga, fetchFollowManga, syncWithLocalStorage } from 'stores/common/actions';
import { IAppState } from 'interfaces';
import axios from 'apis/instance';

export const InitializeState = function() {
  const { isLoggedIn, token } = useSelector((store: IAppState) => store.auth);
  const dispatch = useDispatch();

  useEffect(function() {
    dispatch(fetchListGenre());
    dispatch(fetchTopManga());
    dispatch(syncWithLocalStorage());
    let token = localStorage.getItem('token');
    if (token) {
      dispatch(autoLogin());
    }

    // eslint-disable-next-line
  }, []);

  useEffect(function() {
    if (isLoggedIn && token) {
      axios.defaults.headers.common['Authorization'] = token;
      dispatch(fetchFollowManga());
      dispatch(fetchReadedManga());
    }
    // eslint-disable-next-line
  }, [isLoggedIn, token])

  return(<></>);
}

export default InitializeState;
