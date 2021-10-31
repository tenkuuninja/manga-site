import React, { useEffect, useRef, useState } from 'react'
import LoadingBar from 'react-top-loading-bar';
import axiosInstance from 'apis/instance';
 
const TopLoading = () => {
  const [count, setCount] = useState<number>(0);
  const ref = useRef<any>(null)

  useEffect(function() {
    axiosInstance.interceptors.request.use(function(config) {
      setCount(count => count+1);
      return config;
    }, function(error) {
      setCount(count => Math.max(count-1, 0));
      return Promise.reject(error);
    });
    axiosInstance.interceptors.response.use(function(response) {
      setCount(count => Math.max(count-1, 0));
      return response;
    }, function(error) {
      setCount(count => Math.max(count-1, 0));
      return Promise.reject(error);
    });

    // eslint-disable-next-line
  }, []);

  useEffect(function() {
    if (count === 0) {
      ref.current.complete()
    } else {
      ref.current.continuousStart()
    }
  }, [count]);
 
  return (
    <div className="fixed top-0 inset-x-0 z-50">
      <LoadingBar color='#f11946' ref={ref} />
    </div>
  )
}
 
export default TopLoading