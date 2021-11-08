import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import qs from 'query-string';
import { 
  fetchListManga, 
  fetchListMangaFollowAfterUnfolowWithoutStatus, 
  fetchListMangaFollow, 
  fetchListMangaReaded, 
  followMangaInList,
  unfollowMangaInList
} from 'stores/mangas/actions';
import { IAppState, IGenre, IManga, ISearchObject } from 'interfaces';
import { MangaCardVertical } from 'views/components/MangaCard';
import { Pagination } from '@mui/material';
import { ListVerticalCardSkeleton } from './Skeleton';
import { getRelativeTimeFromNow } from 'utils/helper';
import { Icon } from '@iconify/react';
import { addFollowMangaInCommon, removeFollowMangaInCommon } from 'stores/common/actions';
import { MeApi } from 'apis';
import FilterForm from './FilterForm';
import { toast } from 'react-toastify';

interface IParams {
  [index: string]: string
}

const ListPage = () => {
  const { auth, mangas, genres } = useSelector((store: IAppState) => store)
  const dispatch = useDispatch();
  const match = useRouteMatch<IParams>();
  const location = useLocation<IParams>();
  const history = useHistory();
  const [title, setTitle] = useState<string>('');
  const [noContent, setNoContent] = useState<boolean>(false);
  const search = qs.parse(location.search);
  const page = +`${search.page}` || 1;

  function handleFollow(manga: IManga) {
    if (!auth.isLoggedIn) {
      toast.error('Bạn cần đăng nhập để theo dõi');
      return;
    }
    if (manga?.isFollowing === 0) {
      dispatch(followMangaInList(manga.id||0));
      dispatch(addFollowMangaInCommon(manga));
      MeApi.followManga(manga.id||0);
      toast.success('Đã theo dõi truyện '+manga.title);
    } else if (manga?.isFollowing === 1) {
      dispatch(removeFollowMangaInCommon(manga.id||0));
      if (match.path === '/truyen-dang-theo-doi.html') {
        dispatch(fetchListMangaFollowAfterUnfolowWithoutStatus(manga.id||0));
      } else {
        dispatch(unfollowMangaInList(manga.id||0));
        MeApi.unfollowManga(manga.id||0);
      }
      toast.success('Đã hủy theo dõi truyện '+manga.title);
    }
  }

  function getUrlByPage(page: number) {
    let search = qs.parse(location.search);
    search.page = `${page}`;
    return location.pathname+'?'+qs.stringify(search);
  }

  useEffect(function() {
    setNoContent(false);
    switch (match.path) {
      case '/truyen-moi-cap-nhat.html':
        dispatch(fetchListManga({ page }));
        setTitle('Truyện mới cập nhật');
        break;
      case '/truyen-tranh-moi.html':
        dispatch(fetchListManga({ page, sort: '-createdAt' }));
        setTitle('Truyện tranh mới');
        break;
      case '/truyen-da-hoan-thanh.html':
        dispatch(fetchListManga({ page, filter: 'isFinish:eq:1' }));
        setTitle('Truyện đã hoàn thành');
        break;
      case '/top-truyen-yeu-thich.html':
        dispatch(fetchListManga({ page, sort: '-favorite' }));
        setTitle('Truyện được yêu thích');
        break;
      case '/top-truyen-tranh.html':
        dispatch(fetchListManga({ page, sort: '-view' }));
        setTitle('top truyện tranh');
        break;
      case '/top-thang.html':
        dispatch(fetchListManga({ page, sort: '-viewMonth' }));
        setTitle('Top truyện tranh tháng');
        break;
      case '/top-tuan.html':
        dispatch(fetchListManga({ page, sort: '-viewWeek' }));
        setTitle('Top truyện tranh tuần');
        break;
      case '/top-ngay.html':
        dispatch(fetchListManga({ page, sort: '-viewDay' }));
        setTitle('Top truyện tranh ngày');
        break;
      case '/truyen-dang-theo-doi.html':
        if (auth.isLoggedIn) {
          dispatch(fetchListMangaFollow({ page }));
        }
        setTitle('Truyện đang theo dõi');
        break;
      case '/lich-su-doc-truyen.html':
        if (auth.isLoggedIn) {
          dispatch(fetchListMangaReaded({ page }))
        }
        setTitle('Lịch sử đọc truyện');
        break;
      case '/tim-kiem.html':
        dispatch(fetchListManga({ page, search: qs.parse(location.search)?.q?.toString() || '' }));
        setTitle('Kết quả tìm kiếm');
        break;
      case '/tim-kiem-nang-cao.html':
        let sortType = ['-updatedAt', '-createdAt', '-view', '-favorite'];
        const search = qs.parse(location.search);
        let searchObject: ISearchObject = { filter:[] }
        if (!Array.isArray(searchObject.filter)) searchObject.filter = []
        if (typeof search.g === 'string' && /^\d+(,\d+)*$/g.test(search.g)) {
          searchObject.genre = search.g;
        }
        if (typeof search.ng === 'string' && /^\d+(,\d+)*$/g.test(search.ng)) {
          searchObject.notgenre = search.ng;
        }
        if (typeof search.mc === 'string' && /^\d+$/g.test(search.mc)) {
          searchObject.filter.push('chapter:gte:'+search.mc);
        }
        if (typeof search.c === 'string' && /^(jp|kr|cn)$/g.test(search.c)) {
          searchObject.filter.push('country:eq:'+search.c);
        }
        if (typeof search.f === 'string' && /^\d+$/g.test(search.f)) {
          searchObject.filter.push('isFinish:eq:'+search.f);
        }
        if (typeof search.s === 'string' && /^\d+$/g.test(search.s)) {
          searchObject.sort = sortType?.[+search.s] || '';
        }
        if (typeof search.search === 'string') {
          searchObject.search = search.search;
        }
        console.log(searchObject)
        dispatch(fetchListManga({ page, ...searchObject }));
        setTitle('Tìm kiếm nâng cao');
        break;
      case '/quoc-gia-:countrySlug([a-z-]+).html':
        const countrySlugs = { 
          'nhat-ban': { name: 'Nhật Bản', code: 'jp' }, 
          'trung-quoc': { name: 'Trung Quốc', code: 'cn' }, 
          'han-quoc': { name: 'Hàn Quốc', code: 'kr' } 
        }
        if (match.params.countrySlug in countrySlugs) {
          const country = countrySlugs[match.params.countrySlug as keyof typeof countrySlugs]
          dispatch(fetchListManga({ page, filter: 'country:eq:'+country.code }));
          setTitle('Truyện tranh '+country.name);
        } else {
          setNoContent(true);
        }
        break;
      case '/the-loai-:genreId(\\d+)-:genreSlug([a-z-]+).html':
        let thisGenre: IGenre = genres.byId[+match.params.genreId]
        if (thisGenre) {
          dispatch(fetchListManga({ page, genre: match.params.genreId }));
          setTitle('Thể loại '+thisGenre.title);
        } else {
          setNoContent(true);
        }
        break;
    
      default:
        break;
    }
    // eslint-disable-next-line
  }, [match.url, location.search, genres.data.length]);

  if (noContent) {
    
  }

  let overlayCard = (manga: IManga) => {
    switch (match.path) {
      case '/truyen-dang-theo-doi.html':
        return <div className="p-1">
          <span className="inline-block text-sm font-semibold leading-4 bg-red-500 text-white px-2 py-1 rounded-full">
            {getRelativeTimeFromNow(manga.updatedAt||'')}
          </span>
          <span className="text-2xl float-right">
            <Icon 
              icon="ri:close-circle-line" 
              className="rounded-full bg-white"
              onClick={(e) => {
                e.preventDefault();
                dispatch(fetchListMangaFollowAfterUnfolowWithoutStatus(manga.id||0, { page }));
                dispatch(removeFollowMangaInCommon(manga.id||0));
              }}
            />
          </span>
        </div>
      case '/lich-su-doc-truyen.html':
        let date: string | undefined = manga?.reads?.length  ? manga?.reads[0].updatedAt : '';
        return <div className="p-1">
          <span className="inline-block text-sm font-semibold leading-4 bg-red-500 text-white px-2 py-1 rounded-full">
            {getRelativeTimeFromNow(date||'')}
          </span>
        </div>
      default: 
        return <div className="p-1">
          <span className="inline-block text-sm font-semibold leading-4 bg-red-500 text-white px-2 py-1 rounded-full">
            {getRelativeTimeFromNow(manga.updatedAt||'')}
          </span>
        </div>
    }
  }

  let listContent: JSX.Element = <></>
  if (mangas.isLoading || mangas.isError) {
    listContent = <ListVerticalCardSkeleton />
  } else {
    listContent = 
    <ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-x-3 gap-y-6 py-4'>
      {mangas.data.map((manga: IManga, i) => <li key={i}>
        <MangaCardVertical 
          data={manga} 
          overlay={overlayCard(manga)}
          handleFollow={handleFollow}
        />
      </li>)}
    </ul>
  }

  let filterForm = match.path === '/tim-kiem-nang-cao.html' ? <FilterForm /> : null;

  return(
    <div className="max-w-335 mx-auto my-4 p-4">
      <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-2'>
        {title}
      </h1>
      {filterForm}
      {listContent}
      <div className="my-4">
        <Pagination 
          count={mangas.totalPage} 
          hidePrevButton
          hideNextButton
          showFirstButton 
          showLastButton 
          page={page}
          onChange={(e, value: number) => value !== null && history.push(getUrlByPage(value))}
          className="flex justify-center"
        />
      </div>
    </div>
  );
}

export default ListPage;
