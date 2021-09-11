import React from 'react';
import st from './dropdown.module.css';

type place = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'

interface DropdownProps {
  overlay: JSX.Element,
  children: any,
  placement?: place
}

function Dropdown({overlay, children, placement='bottom-left'}: DropdownProps) {
  let place = placement.split('-');
  return(
    <div className={`${st.trigger} relative`}>
      {children}
      <div className={`${st.content} absolute z-40 ${place[0]==='top'?'bottom-full':'top-full'} ${place[1]==='left'?'left-0':'right-0'}`}>
        {overlay}
      </div>
    </div>
  );
}

export default Dropdown;
