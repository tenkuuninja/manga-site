import React from 'react';
import { useLocation } from 'react-router';

interface DrawerProps {
  overlay: JSX.Element | ((state: boolean, setState: React.Dispatch<React.SetStateAction<boolean>>) => JSX.Element),
  children: any,
  className?: string
}

function Drawer({overlay, children, className}: DrawerProps) {
  const [isOpen, setOpen] = React.useState<boolean>(false);
  const { pathname } = useLocation();

  React.useEffect(function() {
    setOpen(false);
  }, [pathname]);

  if (overlay instanceof Function) {
    overlay = overlay(isOpen, setOpen);
  }
  
  return(
    <React.Fragment>
      <div onClick={() => setOpen(true)}>
        {children}
      </div>
      <div 
        className={`${isOpen ? "opacity-70 scale-100" : "opacity-0 scale-0"} transform fixed transition-opacity ease-linear duration-100 inset-0 bg-black z-40`}
        onClick={() => setOpen(false)}
      />
      <div 
        className={`${isOpen ? "translate-x-0 ease-in duration-200" : "-translate-x-full ease-out duration-150"} bg-white w-72 transform absolute transition-all shadow-lg border-r border-black border-opacity-30 inset-y-0 left-0 z-40 ${className}`}
        style={{maxWidth: '75vw'}}
      >
        <div className={`${isOpen ? "opacity-100" : "opacity-0"}  transition-opacity delay-300 ease-out duration-200 overflow-y-auto h-screen `} >
          {overlay}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Drawer;
