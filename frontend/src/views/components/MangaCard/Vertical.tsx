import React, { useEffect, useRef, useState } from 'react';
import { IGenre, IManga } from 'interfaces';
import { Link } from 'react-router-dom';
import { countryType } from 'utils/static';
import PopupHover from '../PopupHover';
import { getRelativeTimeFromNow } from 'utils/helper';
import { useWindowSize } from 'hooks';

interface MangaCardVerticalProps {
  data: IManga,
  className?: string,
  overlay?: string | JSX.Element
}

export const MangaCardVertical = function(props: MangaCardVerticalProps) {
  const [placement, setPlacement] = useState<'left'|'right'>('right');
  const cardRef = useRef<HTMLDivElement>(null);
  const [width] = useWindowSize();
  const { id, title, titleSlug, imageUrl, description, chapter, isFinish, country, updatedAt = '', genres } = props.data

  useEffect(function() {
    let remain = width - ((cardRef.current?.offsetLeft||0) + (cardRef.current?.offsetWidth||0))
    if (remain < 400 ) {
      if (placement !== 'left') setPlacement('left');
    } else {
      if (placement !== 'right') setPlacement('right');
    }
    // eslint-disable-next-line
  }, [width]);

  return(
    <PopupHover
      placement={placement}
      spacing={10}
      overlay={
      <div className={`hidden lg:block animate-pop-in z-20`}>
        <div className='overflow-hidden rounded-lg bg-white shadow-lg border border-gray-200 w-96 p-4'>
          <h3 className='font-semibold text-lg'>{title}</h3>
          <p className='text-xs text-green-500'>Cập nhật từ <span className='text-sm text-green-600 font-semibold'>{getRelativeTimeFromNow(updatedAt)}</span></p>
          <p className=' text-sm'>{chapter} chương &bull; {isFinish ? 'Đã hoàn thành' : 'Đang cập nhật'}</p>
          <ul className='text-sm font-medium'>
            <li className='inline-block px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-2xl mr-1 mt-1'>
              <Link className='block' to={`/quoc-gia-${countryType[country as keyof typeof countryType].slug}.html`}>
                {countryType[country as keyof typeof countryType].title}
              </Link>
            </li>
            {genres?.map((genre: IGenre) => <li className='inline-block px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl mr-1 mt-1' key={genre.id}>
              <Link className='block' to={`/the-loai-${genre.id}-${genre.titleSlug}.html`}>
                {genre.title}
              </Link>
            </li>)}
          </ul>
          <p className='truncate-lines line-clamp-10 leading-5 mt-1'>{description}</p>
          <div className='text-lg mt-1'>
            <div className='inline-block w-full text-center font-bold py-1 rounded-lg text-red-500 border-red-500 border-2 hover:border-red-600 hover:text-white hover:bg-red-600 transition'>
              <Link className='block' to={`/truyen-tranh-${id}-${titleSlug}.html`}>Thông tin truyện</Link>
            </div>
          </div>
        </div>
      </div>
      }
    >
      <Link to={`/truyen-tranh-${id}-${titleSlug}.html`}>
        <div ref={cardRef} className='rounded-md overflow-hidden bg-white border-gray-200'>
          <div className='overflow-hidden relative bg-no-repeat bg-center bg-cover border border-black border-opacity-20' style={{ paddingTop: '133%', backgroundImage: `url(https://img.idesign.vn/2018/10/23/id-loading-1.gif)` }}>
            <img className='absolute top-0 object-cover w-full h-full' src={imageUrl} alt=" " />
            <div className="absolute inset-0">{props.overlay}</div>
            {/* <div className='absolute h-5 w-full bottom-0 bg-gray-800 opacity-60'></div> */}
          </div>
          <div className='px-1 py-2 text-center'>
            <h3 className='truncate-lines text-sm md:text-base font-semibold  overflow-hidden overflow-ellipsis'>{title}</h3>
          </div>
        </div>
      </Link>
    </PopupHover>    
  )
}

export default MangaCardVertical;
