import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchListGenre } from 'stores/genre/actions';

export const InitializeState = function() {
  const dispatch = useDispatch();

  useEffect(function() {
    dispatch(fetchListGenre());
    // eslint-disable-next-line
  }, []);

  return(<></>);
}

export default InitializeState;
