import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { Breadcrumbs } from '@mui/material';
import { IAppState, IChapter } from 'interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { fetchChapter } from 'stores/chapter/actions';
import Comment from 'views/components/Comment';
import { followManga, unfollowManga } from 'stores/manga/actions';

interface IParams {
  mangaId: string;
  mangaSlug: string;
  chapterId: string;
  chapterNumber: string;
}

const MangaChapterPage = () => {
  const { auth, chapter } = useSelector((store: IAppState) => store);
  const dispatch = useDispatch();
  const match = useRouteMatch<IParams>();
  const history = useHistory();
  const [isShowControlBar, setShowControlBar] = useState<boolean>(true);
  const yRef = useRef<number>(0);
  const { manga, navigation} = chapter.data;
  const { mangaId, mangaSlug, chapterId, chapterNumber } = match.params;
  const chaptersReverse = manga?.chapters?.reverse();

  function scrollToTop() {
    window.scroll({top: 0, left: 0, behavior: 'smooth' });
  }

  function getChapterUrl(chapter?: IChapter | null):string {
    return `/doc-truyen-${mangaId || 0}-${chapter?.id || 0}-${mangaSlug || 0}-chap-${(''+chapter?.number || '0').replace('.','-')}.html`;
  }

  function handleFollow() {
    if (!auth.isLoggedIn) {
      return;
    }
    if (manga?.isFollowing === 0) {
      dispatch(followManga(+mangaId));
    } else if (manga?.isFollowing === 1) {
      dispatch(unfollowManga(+mangaId));
    }
  }

  useEffect(function() {
    function handleScrollEvent() {
      setShowControlBar(yRef.current > window.scrollY ? true : false);
      yRef.current = window.scrollY;
    }
    window.addEventListener('scroll', handleScrollEvent);
    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, [yRef.current]);

  useEffect(function() {
    dispatch(fetchChapter(+chapterId));
  }, [mangaId, chapterId]);

  const navigationButton = <div className="text-center space-x-4 clear-both">
    <Link 
      className={`${navigation?.previous ? 'inline-block' : 'hidden'} items-center px-3 py-1 bg-blue-400 hover:bg-blue-500 text-white rounded`}
      to={getChapterUrl(navigation?.previous)}
    >
      <Icon icon="bi:arrow-left" className="mr-2 align-middle" />
      Chap trước
    </Link>
    <Link 
      className={`${navigation?.next ? 'inline-block' : 'hidden'} items-center px-3 py-1 bg-blue-400 hover:bg-blue-500 text-white rounded`}
      to={getChapterUrl(navigation?.next)}
    >
      Chap sau
      <Icon icon="bi:arrow-right" className="ml-2" />
    </Link>
  </div>


  return (
    <section className="container mx-auto p-4">
      <Breadcrumbs className="mb-2 text-sm font-bold" >
        <Link to="/" className="flex items-center">
          <Icon icon="bx:bx-home" className="mr-1 text-base" />
          Trang chủ
        </Link>
        <Link to="/truyen-moi-cap-nhat.html" className="flex items-center">
          <Icon icon="bi:grid-3x3-gap-fill" className="mr-1 text-base" />
          Danh sách
        </Link>
        <Link to={`/truyen-tranh-${manga?.id}-${manga?.titleSlug}.html`} className="flex items-center">
          <Icon icon="bx:bx-book-alt" className="mr-1 text-base" />
          {manga?.title}
        </Link>
        <p className="truncate cursor-pointer text-gray-600">
          Chap {chapterNumber.replace('-','.')}
        </p>
      </Breadcrumbs>
      <h1 className="text-3xl font-bold my-4">
        Đọc truyện {manga?.title} chap {chapter.data.number}
      </h1> 
      {navigationButton}
      <div className="my-10">
        {chapter.data.content?.map((item: string, i) => 
          <img 
            key={i}
            className="text-center max-w-full h-96"
            src={`${item}`} 
            alt={`Hình ảnh ${i} của ${manga?.title} chap ${chapter.data.number}`}
          />
        )}
      </div>
      {navigationButton}
      {/* <Comment /> */}
      <section className={`fixed bottom-0 left-0 ${isShowControlBar && 'transform translate-y-full'} transition-transform ease-out duration-200 h-14 py-2 w-full bg-gray-50 border-t border-gray-300 font-light`}>
        <div className='container px-2 h-10 flex justify-between text-lg'>
          <div className=''>
            <Link to='/' className="flex items-center h-10 space-x-2">
              <Icon icon="bx:bx-home" className="text-xl" />
              <span className="hidden md:inline">Trang chủ</span>
            </Link>
          </div>
          <div className='flex items-center h-10 space-x-3'>
            <Icon 
              icon="bi:arrow-left-circle" 
              className={`text-3xl cursor-pointer ${!navigation?.previous && 'opacity-60'}`}
              onClick={() => navigation?.previous && history.push(getChapterUrl(navigation?.previous))}
            />
            <div className="cursor-pointer text-base">
              <select 
                className='select-arrow inline-block text-sm -md:w-48 +lg:w-72 h-8 rounded-md border border-gray-400 appearance-none'
                defaultValue={getChapterUrl(chapter.data)} 
                onChange={(e) => history.push(e.target.value)}
              >
                {chaptersReverse?.map((c, i) => 
                  <option 
                    value={getChapterUrl(c)} 
                    disabled={getChapterUrl(chapter.data) === getChapterUrl(c)}
                    key={i}>
                      Chapter {c.number}{c.title? ': ' + c.title : ''}
                  </option>
                )}
              </select>
            </div>
            <Icon 
              icon="bi:arrow-right-circle" 
              className={`text-3xl cursor-pointer ${!navigation?.next && 'opacity-60'}`}
              onClick={() => navigation?.next && history.push(getChapterUrl(navigation?.next))}
            />
          </div>
          <div className=''>
            <div className="flex items-center h-10 space-x-2 cursor-pointer" onClick={handleFollow}>
              <Icon icon={manga?.isFollowing ? "bi:heart-fill" : "bi:heart"} className="text-xl" />
              <span className="hidden md:inline">{manga?.isFollowing ? "Hủy theo dõi" : "Theo dõi"}</span>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default MangaChapterPage;
