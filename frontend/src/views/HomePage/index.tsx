import React, { useEffect, useState } from 'react';
import { IAppState, IManga } from 'interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { MangaCardVertical } from 'views/components/MangaCard';
import Carousel from "views/components/Carousel";
import { useCols } from 'hooks';
import { fetchLastestUpdateManga, fetchNewestManga, followMangaInHome, unfollowMangaInHome } from 'stores/home/actions';
import { Link } from 'react-router-dom';
import { getRelativeTimeFromNow } from 'utils/helper';
import { MeApi } from 'apis';
import { addFollowMangaInCommon, followMangaInCommon, removeFollowMangaInCommon, unfollowMangaInCommon } from 'stores/common/actions';

interface CommonMangaCardCarouselProps {
  title: string;
  data: IManga[];
  isLoading: boolean;
  isError: boolean;
  cols: number;
  overlay: (manga: IManga) => JSX.Element;
  handleFollow: (manga: IManga) => void;
}

const CommonMangaCardCarousel = (props: CommonMangaCardCarouselProps) => {
  if (props.isLoading || props.isError) {
    return <></>
  }

  return (
    <section className="container max-w-335 px-4 mx-auto">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold my-4">
        {props.title}
      </h2>
      <Carousel columnsPerSlide={props.cols} columnsPerScroll={props.cols} columnSpacing={16} >
        {props.data.map((item, i) => 
          <MangaCardVertical key={i} data={item} overlay={props.overlay(item)} handleFollow={props.handleFollow} /> 
        )}
      </Carousel>
    </section>
  );
}


const HomePage = function() {
  const { auth, common, genres, home } = useSelector((store: IAppState) => store);
  const dispatch = useDispatch();
  const [typeTop, setTypeTop] = useState<'day' | 'week' | 'month'>('day');
  const cols = useCols();

  useEffect(function() {
    if (home.lastest.data.length === 0) dispatch(fetchLastestUpdateManga());
    if (home.newest.data.length === 0) dispatch(fetchNewestManga());
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
    <span className="inline-block text-sm font-semibold leading-4 bg-blue-400 text-white p-1 rounded">
      {getRelativeTimeFromNow(manga.updatedAt||'')}
    </span>
  </div>

  const readedOverlay = (manga: IManga) => <div className="p-2">
    <span className="inline-block text-sm font-semibold leading-4 bg-blue-400 text-white p-1 rounded">
      {getRelativeTimeFromNow(manga?.reads?.length  ? manga?.reads[0].updatedAt :  manga.updatedAt || '')}
    </span>
  </div>

  const genreCarousel = genres.isLoading || genres.isError ? '' :
    <section className="container max-w-335 px-4 mx-auto">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold my-4">
        Các thể loại
      </h2>
      <Carousel columnsPerSlide={cols-1} columnsPerScroll={cols-1} columnSpacing={8} >
        {Array.from({length: Math.floor(genres.data.length/2)}, (_, i) => i*2).map((i) => 
          <div className="text-center font-bold space-y-2" key={i}>
            <Link 
              to={`/the-loai-${genres.data[i]?.id}-${genres.data[i]?.titleSlug}.html`}
              className="block px-2 py-3 border border-black border-opacity-20"
            >
              {genres.data[i]?.title}
            </Link>
            <Link 
              to={`/the-loai-${genres.data[i+1]?.id}-${genres.data[i+1]?.titleSlug}.html`}
              className="block px-2 py-3 border border-black border-opacity-20"
            >
              {genres.data[i+1]?.title}
            </Link>
          </div>
        )}
      </Carousel>
    </section>

  const topMangaCarousel = common.top.isLoading ? '' :
    <section className="container max-w-335 px-4 mx-auto">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-4">
        Xếp hạng truyện
      </h2>
      <div className="my-2 ml-2 text-lg space-x-4 font-bold">
        <span 
          className={`${typeTop === 'day' ? 'opacity-100' : 'opacity-70'} transition-opacity cursor-pointer`} 
          onClick={() => setTypeTop('day')}
        >
          Hôm nay
        </span>
        <span 
          className={`${typeTop === 'week' ? 'opacity-100' : 'opacity-70'} transition-opacity cursor-pointer`} 
          onClick={() => setTypeTop('week')}
        >
          Tuần này
        </span>
        <span 
          className={`${typeTop === 'month' ? 'opacity-100' : 'opacity-70'} transition-opacity cursor-pointer`} 
          onClick={() => setTypeTop('month')}
        >
            Tháng này
          </span>
      </div>
      <Carousel columnsPerSlide={cols} columnsPerScroll={cols} columnSpacing={16} >
        {common.top[typeTop].map((item, i) => <MangaCardVertical 
            key={i} 
            data={item} 
            overlay={updatedOverlay(item)} 
            handleFollow={handleFollow}
          /> 
        )}
      </Carousel>
    </section>
  

  return(
    <React.Fragment>
      <div className="space-y-8 my-8">
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
        {genreCarousel}
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
        {topMangaCarousel}
      </div>
    </React.Fragment>
  );
}

export default HomePage
