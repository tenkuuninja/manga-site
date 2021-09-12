import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { autoLogin } from 'stores/auth/actions';
import { fetchListGenre } from 'stores/genre/actions';
import { fetchTopManga } from 'stores/common/actions';

export const InitializeState = function() {
  const dispatch = useDispatch();

  useEffect(function() {
    dispatch(autoLogin());
    dispatch(fetchListGenre());
    dispatch(fetchTopManga());
    // eslint-disable-next-line
  }, []);

  return(<></>);
}

export default InitializeState;
