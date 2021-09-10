import React from 'react';

import DesktopHeader from './Desktop';
import MobileHeader from './Mobile';

function Header() {
  return(
    <header className="h-18 z-50 shadow-md">
      <MobileHeader />
      <DesktopHeader />
    </header>
  );
}

export default Header;
