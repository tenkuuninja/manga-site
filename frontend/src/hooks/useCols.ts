import { useEffect, useState } from 'react';
import { useWindowSize } from './useWindowSize';

export function useCols() {
  let [width,] = useWindowSize();
  let [cols, setCols] = useState(0);
  useEffect(function() {
    if(width < 576) {
      setCols(1);
    } else if (width >= 576 && width < 768) {
      setCols(2);
    } else if (width >= 768 && width < 992) {
      setCols(3);
    } else if (width >= 992 && width < 1200) {
      setCols(5);
    } else {
      setCols(6)
    }
  }, [width]);
  return cols;
}

export default useCols;
