import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { fetchManga, followMangaInDetail, increaseFavorite, unfollowMangaInDetail } from 'stores/manga/actions';
import st from './detail.module.css';
import Detail from './Detail';
import ChapterList from './ChapterList';
import Comment from 'views/components/Comment';
import AsideSticky from './AsideSticky';
import { IAppState } from 'interfaces';
import { followMangaInCommon, unfollowMangaInCommon } from 'stores/common/actions';

interface IParams {
  mangaId: string;
  mangaSlug: string;
}

const MangaDetailPage = () => {
  const { auth, manga } = useSelector((store: IAppState) => store);
  const dispatch = useDispatch();
  const match = useRouteMatch<IParams>();
  const mangaId = +match.params.mangaId;

  function handleFollow() {
    if (!auth.isLoggedIn) {
      return;
    }
    if (manga.data.isFollowing === 0) {
      dispatch(followMangaInDetail());
      dispatch(followMangaInCommon(manga.data));
    } else if (manga.data.isFollowing === 1) {
      dispatch(unfollowMangaInDetail());
      dispatch(unfollowMangaInCommon(+mangaId));
    }
  }

  function handleIncreaseFavorite() {
    if (1) {
      dispatch(increaseFavorite(mangaId));
    }
  }

  useEffect(function() {
    dispatch(fetchManga(+match.params.mangaId));
    // eslint-disable-next-line
  }, [match.params.mangaId]);

  return (
    <React.Fragment>
      <div className={`${st.background} h-80 -mb-24 lg:-mb-48`} ></div>
      <section className={`${st.container} container bg-white mx-auto z-10`}>
        <main className="p-4">
          <Detail handleFollow={handleFollow} handleIncreaseFavorite={handleIncreaseFavorite} />
          <ChapterList /> 
          <Comment />        
        </main>
        <aside className="hidden lg:block p-4 border-l border-black border-opacity-10">
          <AsideSticky handleFollow={handleFollow} handleIncreaseFavorite={handleIncreaseFavorite} />
        </aside>
      </section>
    </React.Fragment>
  );
}

export default MangaDetailPage
