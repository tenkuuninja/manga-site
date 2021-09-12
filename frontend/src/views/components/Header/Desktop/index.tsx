import React from 'react';
import { useSelector } from 'react-redux';
import { IAppState } from 'interfaces';

import Logo from './Logo';
import Genre from './Genre';
import Category from './Category';
import Search from './Search';
import DropdownManga from './DropdownManga';
import Personal from './Personal';

const DesktopHeader = function() {
  const { readed } = useSelector((store: IAppState) => store.common)
  return(
    <div className="flex items-center h-18 px-6 text-sm">
      <Logo />
      <Genre />
      <Category />
      <Search />
      <DropdownManga
        data={readed.payload}
        isLoading={readed.isLoading}
        isError={readed.isError}
        title="Lịch sử"
        text="Lịch sử đọc truyện"
        url={`/lich-su-doc-truyen.html`}
      />
      <Personal />
    </div>
  );
}

export default DesktopHeader;