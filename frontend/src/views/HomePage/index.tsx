import React, { useEffect } from 'react';
import { IAppState, IManga } from 'interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { useCols } from 'hooks';
import { fetchLastestUpdateManga, fetchNewestManga, followMangaInHome, unfollowMangaInHome } from 'stores/home/actions';
import { getRelativeTimeFromNow } from 'utils/helper';
import { MeApi } from 'apis';
import { addFollowMangaInCommon, followMangaInCommon, removeFollowMangaInCommon, unfollowMangaInCommon } from 'stores/common/actions';
import SlideShow from './SlideShow';
import { CommonMangaCardCarousel, GenreCardCarousel, TopMangaCardCarousel } from './MangaCardCarousel';

const HomePage = function() {
  const { auth, common, home } = useSelector((store: IAppState) => store);
  const dispatch = useDispatch();
  const cols = useCols();

  useEffect(function() {
    if (home.lastest.data.length === 0) dispatch(fetchLastestUpdateManga());
    if (home.newest.data.length === 0) dispatch(fetchNewestManga());
    // eslint-disable-next-line
  }, []);

  const handleFollow = (manga: IManga) => {
    if (!auth.isLoggedIn) {
      return;
    }
    if (manga?.isFollowing === 0) {
      dispatch(addFollowMangaInCommon(manga));
      dispatch(followMangaInCommon(manga.id||0));
      dispatch(followMangaInHome(manga.id||0));
      MeApi.followManga(manga.id||0);
    } else if (manga?.isFollowing === 1) {
      dispatch(removeFollowMangaInCommon(manga.id||0));
      dispatch(unfollowMangaInCommon(manga.id||0));
      dispatch(unfollowMangaInHome(manga.id||0));
      MeApi.unfollowManga(manga.id||0);
    }
  }

  const updatedOverlay = (manga: IManga) => <div className="p-2">
    <span className="inline-block text-sm font-semibold leading-4 bg-red-500 text-white px-2 py-1 rounded-full">
      {getRelativeTimeFromNow(manga.updatedAt||'')}
    </span>
  </div>

  const readedOverlay = (manga: IManga) => <div className="p-2">
    <span className="inline-block text-sm font-semibold leading-4 bg-red-500 text-white px-2 py-1 rounded-full">
      {getRelativeTimeFromNow(manga?.reads?.length  ? manga?.reads[0].updatedAt :  manga.updatedAt || '')}
    </span>
  </div>
  
  return(
    <div className="space-y-8 mb-8">
      <SlideShow />
      {auth.isLoggedIn && 
      <CommonMangaCardCarousel 
        title="Tiếp tục đọc"
        data={common.readed.data}
        isLoading={common.readed.isLoading}
        isError={common.readed.isLoading}
        cols={cols}
        overlay={readedOverlay}
        handleFollow={handleFollow}
      />}
      <CommonMangaCardCarousel 
        title="Truyện mới cập nhật"
        data={home.lastest.data}
        isLoading={home.lastest.isLoading}
        isError={home.lastest.isError}
        cols={cols}
        overlay={updatedOverlay}
        handleFollow={handleFollow}
      />
      <GenreCardCarousel cols={cols-1} />
      <CommonMangaCardCarousel 
        title="Truyện tranh mới"
        data={home.newest.data}
        isLoading={home.newest.isLoading}
        isError={home.newest.isError}
        cols={cols}
        overlay={updatedOverlay}
        handleFollow={handleFollow}
      />
      <CommonMangaCardCarousel 
        title="Truyện được xem nhiều"
        data={common.top.all}
        isLoading={common.top.isLoading}
        isError={common.top.isError}
        cols={cols}
        overlay={updatedOverlay}
        handleFollow={handleFollow}
      />
      <TopMangaCardCarousel
        cols={cols}
        overlay={updatedOverlay}
        handleFollow={handleFollow}
      />
    </div>
  );
}

export default HomePage
