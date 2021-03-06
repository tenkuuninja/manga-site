import React, { useState } from 'react';
import { IAppState, IChapter } from 'interfaces';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRelativeTimeFromNow } from 'utils/helper';
import { ChapterListSkeleton } from './Skeleton';
import { Icon } from '@iconify/react';
const amountItemShowPreview = 10;

const MangaDetailPage = () => {
  const manga = useSelector((store: IAppState) => store.manga);
  const [showAllChapter, setShowAllChapter] = useState<boolean>(false);

  const { titleSlug, chapters } = manga.data;

  if (manga.isLoading || manga.isError) {
    return (<ChapterListSkeleton />);
  }

  return (
    <div>
      <h2 className='text-2xl mt-4 mb-2'>Danh sách chương</h2>
      <ul className='divide-y clear-both overflow-hidden'>
        {chapters?.map((chapter: IChapter, i: number) => 
        // <li key={i} className={`block w-full clear-both overflow-hidden hover:bg-gray-100 ${(amountItemShowPreview<i && !showAll) && 'hidden'}`}>
        <li key={i} className={`${(amountItemShowPreview<i && !showAllChapter) && 'hidden'}`}>
          <Link 
            to={`/doc-truyen-${chapter.mangaId}-${chapter.id}-${titleSlug}-chap-${(''+chapter.number).replace('.', '-')}.html`} 
            className='block overflow-hidden hover:bg-gry-50 hover:text-primary-500 p-4 transition-colors duration-100'
          >
            <div className='float-left'>
              <span>Chapter {chapter.number}{chapter.title? ': ' + chapter.title : ''}</span>
            </div>
            <div className='float-right text-sm space-x-4'>
              {manga.data.readed?.readedObj?.[chapter?.number||0] &&
                <span><Icon icon="bi:eye" /></span>
              }
              <span>{getRelativeTimeFromNow(chapter.updatedAt, 259200)}</span>
            </div>
          </Link>
        </li>)}
      </ul>
      <div className={`px-1 py-2 text-sm ${(amountItemShowPreview >= (chapters?.length||0) || showAllChapter) && 'hidden'}`}>
        <span 
          className='inline-block w-full border border-primary-400 rounded text-center text-primary-400 hover:text-primary-500 hover:border-primary-500 py-2 cursor-pointer' 
          onClick={() => setShowAllChapter(true)}
        >
          Xem tất cả ({chapters?.length})
        </span>
      </div>
    </div>  
  );
}

export default MangaDetailPage
