import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useRouteMatch } from 'react-router';
import qs from 'query-string';
import { fetchListManga, fetchListMangaFollow, fetchListMangaReaded } from 'stores/mangas/actions';
import { IAppState, IManga } from 'interfaces';
import { MangaCardVertical } from 'views/components/MangaCard';
import { Pagination } from '@mui/material';
import { ListVerticalCardSkeleton } from './Skeleton';
import { getRelativeTimeFromNow } from 'utils/helper';
import { Icon } from '@iconify/react';

interface IParams {
  [index: string]: string
}

const ListPage = () => {
  const { mangas, genres } = useSelector((store: IAppState) => store)
  const dispatch = useDispatch();
  const match = useRouteMatch<IParams>();
  const location = useLocation<IParams>();
  const [title, setTitle] = useState<string>('');
  const [noContent, setNoContent] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

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
        dispatch(fetchListMangaFollow({ page }));
        setTitle('Truyện đang theo dõi');
        break;
      case '/lich-su-doc-truyen.html':
        dispatch(fetchListMangaReaded({ page }))
        setTitle('Lịch sử đọc truyện');
        break;
      case '/tim-kiem.html':
        dispatch(fetchListManga({ page, search: qs.parse(location.search)?.q?.toString() || '' }));
        setTitle('Kết quả tùm kiếm');
        break;
      case '/tim-kiem-nang-cao.html':
        dispatch(fetchListManga({ page }));
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
        let thisGenre = genres.data.filter(i => i.id === +match.params.genreId)
        if (thisGenre.length > 0) {
          dispatch(fetchListManga({ page, genre: match.params.genreId }));
          setTitle('Thể loại '+thisGenre[0].title);
        } else {
          setNoContent(true);
        }
        break;
    
      default:
        break;
    }
    // eslint-disable-next-line
  }, [match.url, page, genres.data.length]);

  useEffect(function() {
    setPage(1);
  }, [match.path]);

  if (noContent) {
    
  }

  let overlayCard = (manga: IManga) => {
    switch (match.path) {
      case '/truyen-dang-theo-doi.html':
        return <div className="p-2 flex justify-between">
          <span className="inline-block text-sm font-semibold leading-4 bg-blue-400 text-white p-1 rounded">{getRelativeTimeFromNow(manga.updatedAt||'')}</span>
          <span className="text-2xl">
            <Icon 
              icon="ri:close-circle-line" 
              className="rounded-full bg-white"
              onClick={(e) => {
                e.preventDefault();
              }}
            />
          </span>
        </div>
      case '/lich-su-doc-truyen.html':
        let date: string | undefined = manga?.reads?.length  ? manga?.reads[0].updatedAt : '';
        return <div className="p-2">
          <span className="inline-block text-sm font-semibold leading-4 bg-blue-400 text-white p-1 rounded">{getRelativeTimeFromNow(date||'')}</span>
        </div>
      default:
        return <div className="p-2">
          <span className="inline-block text-sm font-semibold leading-4 bg-blue-400 text-white p-1 rounded">{getRelativeTimeFromNow(manga.updatedAt||'')}</span>
        </div>
    }
  }

  let listContent: JSX.Element = <></>
  if (mangas.isLoading || mangas.isError) {
    listContent = <ListVerticalCardSkeleton />
  } else {
    listContent = 
    <ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-x-3 gap-y-6 py-4'>
      {mangas.data.map((manga: IManga) => <li key={manga.id}>
        <MangaCardVertical 
          data={manga} 
          overlay={overlayCard(manga)}
        />
      </li>)}
    </ul>
  }

  return(
    <div className="max-w-335 mx-auto my-4 p-4">
      <h1 className='text-3xl lg:text-4xl font-bold mb-2'>
        {title}
      </h1>
      {listContent}
      <div className="my-4">
        <Pagination 
          count={mangas.totalPage} 
          showFirstButton 
          showLastButton 
          page={page}
          onChange={(e, value: number) => value !== null && setPage(value)}
          className="flex justify-center"
        />
      </div>
    </div>
  );
}

export default ListPage;
