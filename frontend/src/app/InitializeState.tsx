import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { autoLogin } from 'stores/auth/actions';
import { fetchListGenre } from 'stores/genres/actions';
import { fetchTopManga, fetchReadedManga, fetchFollowManga, increaseTopLoading, decreaseTopLoading, syncWithLocalStorage } from 'stores/common/actions';
import { IAppState } from 'interfaces';
import axiosInstance from 'apis/instance';

export const InitializeState = function() {
  const { isLoggedIn } = useSelector((store: IAppState) => store.auth);
  const dispatch = useDispatch();

  useEffect(function() {
    dispatch(fetchListGenre());
    dispatch(fetchTopManga());
    dispatch(syncWithLocalStorage());
    let token = localStorage.getItem('token');
    if (token) {
      dispatch(autoLogin());
    }

    
    axiosInstance.interceptors.request.use(function(config) {
      dispatch(increaseTopLoading());
      return config;
    }, function(error) {
      dispatch(decreaseTopLoading());
      return Promise.reject(error);
    });
    axiosInstance.interceptors.response.use(function(response) {
      dispatch(decreaseTopLoading());
      return response;
    }, function(error) {
      dispatch(decreaseTopLoading());
      return Promise.reject(error);
    });

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
