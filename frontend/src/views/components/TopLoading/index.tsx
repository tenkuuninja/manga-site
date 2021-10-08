import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import LoadingBar from 'react-top-loading-bar'
import { IAppState } from 'interfaces'
 
const TopLoading = () => {
  const topLoading = useSelector((store: IAppState) => store.common.topLoading)
  const ref = useRef<any>(null)

  useEffect(function() {
    if (topLoading === 0) {
      ref.current.complete()
    } else {
      ref.current.continuousStart()
    }
  }, [topLoading]);
 
  return (
    <div className="fixed top-0 inset-x-0 z-50">
      <LoadingBar color='#f11946' ref={ref} />
    </div>
  )
}
 
export default TopLoading