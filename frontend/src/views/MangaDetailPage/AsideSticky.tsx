import React from 'react';
import { IAppState } from 'interfaces';
import { useSelector } from 'react-redux';
import { AsideStickySkeleton } from './Skeleton';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { convertNumberToHumanRead } from 'utils/helper';

interface IAsideStickyProps {
  handleFollow: () => void;
  handleIncreaseFavorite: () => void;
}

const AsideSticky = (props: IAsideStickyProps) => {
  const manga = useSelector((store: IAppState) => store.manga);

  if (manga.isLoading || manga.isError) {
    return(<AsideStickySkeleton />);
  }

  const { id, titleSlug, imageUrl, rate, view, isFollowing, readed, chapters } = manga.data;

  return (
    <div className="sticky top-5 bg-white">
      <div className="relative mx-auto my-5 w-72 h-80">
        <img className="absolute h-5/6 top-1/2 transform -translate-y-1/2 left-0 filter blur" src={imageUrl} alt='' />
        <img className="absolute h-5/6 top-1/2 transform -translate-y-1/2 right-0 filter blur" src={imageUrl} alt='' />
        <img className="absolute h-full top-1/2 transform -translate-x-1/2 -translate-y-1/2 left-1/2 shadow" src={imageUrl} alt='' />
      </div>  
      <div className="flex justify-around items-center text-lg my-4 px-20">
        <span><Icon icon="bi:eye" /> {convertNumberToHumanRead(view||0)}</span>
        <span><Icon icon="bi:star" /> {(rate?.all||5).toFixed(1)}</span>
      </div>
      <ul className='block font-semibold text-xl pt-2 space-y-4 px-8'>
        {!!readed &&
          <li className='inline-block px-4 bg-pink-500 hover:bg-pink-600 text-white rounded-2xl w-full'>
            <Link className='inline-flex justify-center items-center space-x-2 py-2 w-full' to={`/doc-truyen-${id}-${readed.lastChapterId}-${titleSlug}-chap-${(''+readed.lastChapter).replace('.', '-')}.html`}>
              <Icon icon="bi:book" /> 
              <span>Đọc tiếp</span>
            </Link>
          </li>
        }
        {chapters && chapters.length > 1 &&
          <li className='inline-block px-4 bg-green-500 hover:bg-green-600 text-white rounded-2xl w-full'>
            <Link className='inline-flex justify-center items-center space-x-2 py-2 w-full' to={`/doc-truyen-${id}-${chapters[chapters.length-1].id}-${titleSlug}-chap-${(''+chapters[chapters.length-1].number).replace('.','-')}.html`}>
              <Icon icon="bi:book" /> 
              <span>Đọc từ đầu</span>
            </Link>
          </li>
        }
        <li 
          className='inline-block px-4 bg-blue-500 hover:bg-blue-600 text-white text-center rounded-2xl w-full cursor-pointer' 
          onClick={props.handleFollow}
        >
          <div className='inline-flex justify-center items-center space-x-2 py-2'>
            <Icon icon={!isFollowing ? "bi:bookmark" : "bi:bookmark-check"} />
            <span className='block'>{!isFollowing ? 'Theo dõi' : 'Hủy Theo dõi'}</span>
          </div>
        </li>
        <li 
          className='inline-block px-4 bg-red-500 hover:bg-red-600 text-white text-center rounded-2xl w-full cursor-pointer' 
          onClick={props.handleIncreaseFavorite}
        >
          <div className='inline-flex justify-center items-center space-x-2 py-2'>
            <Icon icon={!isFollowing ? "bi:heart" : "bi:heart"} />
            <span className='block'> Thích</span>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default AsideSticky
