import React from 'react';
import { useSelector } from 'react-redux';
import { IAppState } from 'interfaces';

import Logo from './Logo';
import Genre from './Genre';
import Category from './Category';
import Search from './Search';
import AdvenceSearch from './AdvenceSearch';
import DropdownManga from './DropdownManga';
import Personal from './Personal';

const DesktopHeader = function() {
  const { follow, readed } = useSelector((store: IAppState) => store.common);
  const { isLoggedIn } = useSelector((store: IAppState) => store.auth);
  return(
    <div className="hidden lg:flex items-center h-18 px-6 text-sm">
      <Logo />
      <Genre />
      <Category />
      <Search />
      <AdvenceSearch />
      {isLoggedIn && <React.Fragment>
        <DropdownManga
          data={readed.data}
          isLoading={readed.isLoading}
          isError={readed.isError}
          title="Lịch sử"
          text="Lịch sử đọc truyện"
          url={`/lich-su-doc-truyen.html`}
        />
        <DropdownManga
          data={follow.data}
          isLoading={follow.isLoading}
          isError={follow.isError}
          title="Theo dõi"
          text="Truyện đang theo dõi"
          url={`/truyen-dang-theo-doi.html`}
        />
      </React.Fragment>}
      <Personal />
    </div>
  );
}

export default DesktopHeader;