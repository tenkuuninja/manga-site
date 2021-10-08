import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useRouteMatch } from 'react-router';
import qs from 'query-string';
import { fetchListManga, fetchListMangaFollow, fetchListMangaReaded } from 'stores/listManga/actions';
import { IAppState, IManga } from 'interfaces';
import { MangaCardVertical } from 'views/components/MangaCard';
import { Pagination } from '@mui/material';

interface IParams {
  [index: string]: string
}

const ListPage = () => {
  const { listManga } = useSelector((store: IAppState) => store)
  const dispatch = useDispatch();
  const match = useRouteMatch<IParams>();
  const location = useLocation<IParams>();
  const [noContent, setNoContent] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  console.log(match, location, qs.parse(location.search)?.q)

  useEffect(function() {
    setNoContent(false);
    switch (match.path) {
      case '/truyen-moi-cap-nhat.html':
        dispatch(fetchListManga({ page }));
        break;
      case '/truyen-tranh-moi.html':
        dispatch(fetchListManga({ page, sort: '-createdAt' }));
        break;
      case '/truyen-da-hoan-thanh.html':
        dispatch(fetchListManga({ page, filter: 'isFinish:eq:1' }));
        break;
      case '/top-truyen-yeu-thich.html':
        dispatch(fetchListManga({ page, sort: '-favorite' }));
        break;
      case '/top-truyen-tranh.html':
        dispatch(fetchListManga({ page, sort: '-view' }));
        break;
      case '/top-thang.html':
        dispatch(fetchListManga({ page, sort: '-viewMonth' }));
        break;
      case '/top-tuan.html':
        dispatch(fetchListManga({ page, sort: '-viewWeek' }));
        break;
      case '/top-ngay.html':
        dispatch(fetchListManga({ page, sort: '-viewDay' }));
        break;
      case '/truyen-dang-theo-doi.html':
        dispatch(fetchListMangaFollow({ page }));
        break;
      case '/lich-su-doc-truyen.html':
        dispatch(fetchListMangaReaded({ page }))
        break;
      case '/tim-kiem.html':
        dispatch(fetchListManga({ page, search: qs.parse(location.search)?.q?.toString() || '' }));
        break;
      case '/tim-kiem-nang-cao.html':
        dispatch(fetchListManga({ page }));
        break;
      case '/quoc-gia-:countrySlug([a-z-]+).html':
        const countrySlugs = { 'nhat-ban': 'jp', 'trung-quoc': 'cn', 'han-quoc': 'kr' }
        if (match.params.countrySlug in countrySlugs) {
          const countryLetter = countrySlugs[match.params.countrySlug as keyof typeof countrySlugs]
          dispatch(fetchListManga({ filter: 'country:eq:'+countryLetter }));
        } else {
          setNoContent(true);
        }
        break;
      case '/the-loai-:genreId(\\d+)-:genreSlug([a-z-]+).html':
        dispatch(fetchListManga({ page, genre: match.params.genreId }));
        break;
    
      default:
        break;
    }
  }, [match.url, page]);

  return(
    <div className="max-w-335 mx-auto">
      List Page
      <ul className='grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-x-3 gap-y-6 p-4'>
        {listManga.data.map((manga: IManga) => <li key={manga.id}>
          <MangaCardVertical data={manga} />
        </li>)}
      </ul>
      <div className="my-4">
        <Pagination 
          count={listManga.totalPage} 
          showFirstButton 
          showLastButton 
          defaultPage={page}
          onChange={(e, value: number) => setPage(value)}
          className="flex justify-center"
        />
      </div>
    </div>
  );
}

export default ListPage;
