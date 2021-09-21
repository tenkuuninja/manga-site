import React from 'react';
import Search from './Search';
import Logo from './Logo';
import MenuDrawer from './MenuDrawer';

const MobileHeader = function() {
  return(
    <div className="flex lg:hidden justify-between items-center h-14 p-1">
      <MenuDrawer />
      <Logo />
      <Search />
    </div>
  );
}

export default MobileHeader;