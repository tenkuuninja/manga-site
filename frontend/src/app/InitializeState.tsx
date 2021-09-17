import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { autoLogin } from 'stores/auth/actions';
import { fetchListGenre } from 'stores/genre/actions';
import { fetchTopManga, fetchReadedManga, fetchFollowManga } from 'stores/common/actions';
import { IAppState } from 'interfaces';

export const InitializeState = function() {
  const { isLoggedIn } = useSelector((store: IAppState) => store.auth);
  const dispatch = useDispatch();

  useEffect(function() {
    dispatch(fetchListGenre());
    dispatch(fetchTopManga());
    let token = localStorage.getItem('token');
    if (token) {
      dispatch(autoLogin());
    }
    // eslint-disable-next-line
  }, []);

  useEffect(function() {
    if (isLoggedIn) {
      dispatch(fetchFollowManga());
      dispatch(fetchReadedManga());
    }
    // eslint-disable-next-line
  }, [isLoggedIn])

  return(<></>);
}

export default InitializeState;
