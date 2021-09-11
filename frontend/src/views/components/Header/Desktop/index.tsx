import React from 'react';

import Logo from './Logo';
import Genre from './Genre';
import Category from './Category';

const DesktopHeader = function() {
  return(
    <div className="flex items-center h-18 px-6 text-sm">
      <Logo />
      <Genre />
      <Category />
    </div>
  );
}

export default DesktopHeader;