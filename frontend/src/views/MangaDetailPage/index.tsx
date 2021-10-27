import React, { useEffect, useState } from 'react';
import { IAppState, IChapter } from 'interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { fetchManga, followManga, increaseFavorite, unfollowManga } from 'stores/manga/actions';
import { Link } from 'react-router-dom';
import { countryType } from 'utils/static';
import { 
  Rating,
  Breadcrumbs,
} from '@mui/material';
import { getRelativeTimeFromNow } from 'utils/helper';
import { Icon } from '@iconify/react';
import st from './detail.module.css';
import Comment from 'views/components/Comment';

interface IParams {
  mangaId: string;
  mangaSlug: string;
}

const amountItemShowPreview = 10;

const MangaDetailPage = () => {
  const manga = useSelector((store: IAppState) => store.manga);
  const dispatch = useDispatch();
  const match = useRouteMatch<IParams>();
  const [showAllChapter, setShowAllChapter] = useState<boolean>(false);
  const mangaId = +match.params.mangaId;

  function onFollow() {
    if (manga.data.isFollowing === 0) {
      dispatch(followManga(mangaId));
    } else if (manga.data.isFollowing === 1) {
      dispatch(unfollowManga(mangaId));
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

  const { 
    title, 
    titleSlug, 
    titleSynonym, 
    imageUrl, 
    description, 
    favorite, 
    isFinish, 
    country, 
    chapter, 
    author, 
    rate, 
    view, 
    isFollowing, 
    genres, 
    chapters, 
    updatedAt 
  } = manga.data;

  const rateCount = rate === undefined ? 1 : [1,2,3,4,5].reduce((prev, curr) => {
    return prev += (rate[curr as keyof typeof rate] || 0) * curr;
  }, 0);

  return (
    <React.Fragment>
      <div className={`${st.background} h-80 -mb-24 lg:-mb-48`} ></div>
      <section className={`${st.container} container bg-white mx-auto z-10`}>
        <main className="p-4">
          <Breadcrumbs className="mb-2 text-sm font-bold" >
            <Link to="/" className="flex items-center">
              <Icon icon="bx:bx-home" className="mr-1 text-base" />
              Trang chủ
            </Link>
            <Link to="/truyen-moi-cap-nhat.html" className="flex items-center">
              <Icon icon="bi:grid-3x3-gap-fill" className="mr-1 text-base" />
              Danh sách
            </Link>
            <p className="truncate cursor-pointer text-gray-600">
              {title}
            </p>
          </Breadcrumbs>
          <div>
            <div className='hidden -md:block'>
              {/* <AvatarMobile /> */}
            </div>
            <div className='space-y-1'>
              <h1 className='text-4xl font-black py-1'>{title}</h1>
              {titleSynonym?.length && <p className='text-xl font-light'>{titleSynonym.join(', ')}</p>}
              <div className='flex items-center space-x-2'>
                <Rating readOnly value={rate?.all || 5} />
                ({rateCount})
              </div>
              <p className='space-x-2'>
                <span className='inline-block'><Icon icon="grommet-icons:update" /></span>
                <span>Cập nhật từ {(updatedAt)}</span>
              </p>
              <p className=''><Icon icon="bi:book" /> {chapter} chương &bull; {isFinish ? 'Đã hoàn thành' : 'Đang cập nhật'}</p>
              <p className='space-x-4'>
                <span><Icon icon="bi:eye" /> {view}</span>
                <span><Icon icon="bi:heart" /> {favorite}</span>
              </p>
              {author?.length && <p>Tác giả: {author.join(', ')}</p>}
              <ul className='text-sm font-medium space-x-1'>
                <li className='inline-block py-2 pr-1 text-red-500 hover:text-red-600'>
                  <Link className='block' to={`/quoc-gia-${countryType[country as keyof typeof countryType || 'jp'].slug}.html`}>
                    {countryType[country as keyof typeof countryType || 'jp'].title}
                  </Link>
                </li>
                {genres?.map(genre => <li className='inline-block py-2 px-1 text-blue-500 hover:text-blue-600' key={genre.id}>
                  <Link className='block' to={`/the-loai-${genre.id}-${genre.titleSlug}.html`}>
                    {genre.title}
                  </Link>
                </li>)}
              </ul>
              <p>{description}</p>
              <ul className='block font-medium pt-2'>
                <li className='inline-block px-4 py-1 bg-green-500 hover:bg-green-600 text-white rounded-2xl mr-1 mt-1'>
                  <Link className='block' to={`/the-loai-.html`}> Đọc từ đầu</Link>
                </li>
                <li className='inline-block px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl mr-1 mt-1 cursor-pointer' onClick={() => onFollow()}>
                  <span className='block'>{!isFollowing ? 'Theo dõi' : 'Hủy Theo dõi'}</span>
                </li>
                <li className='inline-block px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded-2xl mr-1 mt-1 cursor-pointer' onClick={handleIncreaseFavorite}>
                  <span className='block'> Thích</span>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h2 className='text-2xl mt-4 mb-2'>Danh sách chương</h2>
            <ul className='divide-y clear-both overflow-hidden'>
              {chapters?.map((chapter: IChapter, i: number) => 
              // <li key={i} className={`block w-full clear-both overflow-hidden hover:bg-gray-100 ${(amountItemShowPreview<i && !showAll) && 'hidden'}`}>
              <li key={i} className={`${(amountItemShowPreview<i && !showAllChapter) && 'hidden'}`}>
                <Link 
                  to={`/doc-truyen-${chapter.mangaId}-${chapter.id}-${titleSlug}-chap-${(''+chapter.number).replace('.', '-')}.html`} 
                  className='block overflow-hidden hover:bg-gray-50 p-4 transition-colors duration-100'
                >
                  <div className='float-left'>
                    <span>Chapter {chapter.number}{chapter.title? ': ' + chapter.title : ''}</span>
                  </div>
                  <div className='float-right text-sm'>
                    <span>{getRelativeTimeFromNow(chapter.updatedAt)}</span>
                  </div>
                </Link>
              </li>)}
            </ul>
            <div className={`px-1 py-2 text-sm ${(amountItemShowPreview >= (chapters?.length||0) || showAllChapter) && 'hidden'}`}>
              <span 
                className='inline-block w-full border border-blue-400 rounded text-center text-blue-400 hover:text-blue-500 hover:border-blue-500 py-2 cursor-pointer' 
                onClick={() => setShowAllChapter(true)}
              >
                Xem tất cả ({chapters?.length})
              </span>
            </div>
          </div>  
          <Comment />        
        </main>
        <aside className="hidden lg:block p-4 border-l border-black border-opacity-10">
          <div className="sticky top-5 bg-white">
            <div className="relative mx-auto my-5 w-72 h-80">
              <img className="absolute h-5/6 top-1/2 transform -translate-y-1/2 left-0 filter blur" src={imageUrl} alt='' />
              <img className="absolute h-5/6 top-1/2 transform -translate-y-1/2 right-0 filter blur" src={imageUrl} alt='' />
              <img className="absolute h-full top-1/2 transform -translate-x-1/2 -translate-y-1/2 left-1/2 shadow" src={imageUrl} alt='' />
            </div>  
          </div>
        </aside>
      </section>
    </React.Fragment>
  );
}

export default MangaDetailPage
