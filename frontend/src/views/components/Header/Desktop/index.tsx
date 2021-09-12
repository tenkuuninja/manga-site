import React from 'react';
import { useSelector } from 'react-redux';
import { IAppState } from 'interfaces';

import Logo from './Logo';
import Genre from './Genre';
import Category from './Category';
import Search from './Search';
// import DropdownManga from './DropdownManga';
import Personal from './Personal';

const DesktopHeader = function() {
  // const a = useSelector((store: IAppState) => store.)
  return(
    <div className="flex items-center h-18 px-6 text-sm">
      <Logo />
      <Genre />
      <Category />
      <Search />
      {/* <DropdownManga /> */}
      <Personal />
    </div>
  );
}

export default DesktopHeader;