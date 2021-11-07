import React, { useEffect, useRef } from 'react'
import LoadingBar from 'react-top-loading-bar';
import axiosInstance from 'apis/instance';
 
const TopLoading = () => {
  const count = useRef<number>(0);
  const loading = useRef<boolean>(false);
  const ref = useRef<any>(null);

  function handleLoading() {
    if (count.current === 0 && loading.current) {
      ref.current.complete();
      loading.current = false;
    } else if (count.current > 0 && !loading.current) {
      ref.current.continuousStart();
      loading.current = true;
    }
  }

  useEffect(function() {
    axiosInstance.interceptors.request.use(function(config) {
      count.current += 1;
      handleLoading();
      return config;
    }, function(error) {
      count.current = Math.max(count.current-1, 0);
      handleLoading();
      return Promise.reject(error);
    });
    axiosInstance.interceptors.response.use(function(response) {
      count.current = Math.max(count.current-1, 0);
      handleLoading();
      return response;
    }, function(error) {
      count.current = Math.max(count.current-1, 0);
      handleLoading();
      return Promise.reject(error);
    });

    // eslint-disable-next-line
  }, []);
 
  return (
    <div className="fixed top-0 inset-x-0 z-50">
      <LoadingBar color='#f11946' ref={ref} />
    </div>
  )
}
 
export default TopLoading