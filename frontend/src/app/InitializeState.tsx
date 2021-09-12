import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { autoLogin } from 'stores/auth/actions';
import { fetchListGenre } from 'stores/genre/actions';
import { fetchTopManga, fetchReadedManga } from 'stores/common/actions';
import { MeApi } from 'apis';

export const InitializeState = function() {
  const dispatch = useDispatch();



  useEffect(function() {
    dispatch(fetchListGenre());
    dispatch(fetchTopManga());
    let token = localStorage.getItem('token');
    if (token) {
      dispatch(autoLogin());
      dispatch(fetchReadedManga());
    }
    // eslint-disable-next-line
  }, []);

  return(<></>);
}

export default InitializeState;
