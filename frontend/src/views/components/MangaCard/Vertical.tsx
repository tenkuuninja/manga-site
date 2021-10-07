import React from 'react';
import { IGenre, IManga } from 'interfaces';
import { Link } from 'react-router-dom';
import { countryType } from 'utils/static';
import PopupHover from '../PopupHover';

interface MangaCardVerticalProps {
  data: IManga,
  className?: string,
  overlay?: string | JSX.Element
}

export const MangaCardVertical = function(props: MangaCardVerticalProps) {
  const { id, title, titleSlug, imageUrl, description, chapter, isFinish, country, genres } = props.data
  return(
    <>
    <PopupHover
      placement={'right'}
      spacing={10}
      overlay={
      <div className={`dropdown-content animate-pop-in z-20`}>
        <div className='overflow-hidden rounded-lg bg-white shadow-lg border border-gray-200 w-96 p-2'>
          <h3 className='font-semibold text-lg'>{title}</h3>
          <p className='text-xs text-green-500'>Cập nhật từ <span className='text-sm text-green-600 font-medium'>abc</span></p>
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
          <p className='overflow-hidden overflow-ellipsis leading-5 mt-1'>{description}</p>
          <div className='text-lg mt-1'>
            <div className='inline-block w-full text-center font-bold py-1 rounded-lg text-red-500 border-red-500 border-2 hover:border-red-600 hover:text-white hover:bg-red-600 transition'>
              <Link className='block' to={`/truyen-tranh-${id}-${titleSlug}.html`}>Thông tin truyện</Link>
            </div>
          </div>
        </div>
      </div>
      }
    >

    <figure className={`dropdown relative ${props.className||''}`}>
      <div className='rounded-md overflow-hidden bg-white border-gray-200'>
        <div className='overflow-hidden relative h-60'>
          <Link to={`/truyen-tranh-${id}-${titleSlug}.html`}>
            <img className='w-full' src={imageUrl} alt={`Truyện Tranh ${title}`}/>
          </Link>
          <div className='absolute h-5 w-full bottom-0 bg-gray-800 opacity-60'>

          </div>
        </div>
        <div className='px-1 py-2 text-center'>
          <Link to={`/truyen-tranh-${id}-${titleSlug}.html`}>
            <h3 className='truncate-lines font-semibold leading-5 overflow-hidden overflow-ellipsis'>{title}</h3>
          </Link>
          <Link to={`/truyen-tranh-${id}-${titleSlug}.html`}>
            <p className='text-sm'>{chapter} chapter</p>
          </Link>
        </div>
      </div>
    </figure>
    </PopupHover>      
    </>
  )
}

export default MangaCardVertical;
