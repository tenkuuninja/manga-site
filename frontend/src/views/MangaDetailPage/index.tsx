import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { fetchManga, increaseFavorite } from 'stores/manga/actions';
import st from './detail.module.css';
import Detail from './Detail';
import ChapterList from './ChapterList';
import Comment from 'views/components/Comment';
import AsideSticky from './AsideSticky';
import { IAppState } from 'interfaces';
import { addFollowMangaInCommon, removeFollowMangaInCommon } from 'stores/common/actions';
import { MeApi } from 'apis';
import { toast } from 'react-toastify';
import Error from 'views/components/Error';
import { followManga, unfollowManga } from 'stores/all/actions';

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
      toast.error('Bạn cần đăng nhập để theo dõi');
      return;
    }
    if (manga.data.isFollowing === 0) {
      dispatch(followManga(mangaId));
      dispatch(addFollowMangaInCommon(manga.data));
      MeApi.followManga(mangaId);
      toast.success('Đã theo dõi truyện '+manga.data.title);
    } else if (manga.data.isFollowing === 1) {
      dispatch(unfollowManga(mangaId));
      dispatch(removeFollowMangaInCommon(+mangaId));
      MeApi.unfollowManga(mangaId);
      toast.success('Đã hủy theo dõi truyện '+manga.data.title);
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

  if (manga.isError) {
    return <Error />
  }

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
