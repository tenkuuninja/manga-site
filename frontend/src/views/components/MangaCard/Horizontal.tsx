import React from 'react';
import { IManga } from 'interfaces';
import { Link } from 'react-router-dom';
import { countryType } from 'utils/static';

interface MangaCardHorizontalProps {
  manga: IManga
  viewType?: 'view' | 'viewDay' | 'viewWeek' | 'viewMonth'
}

export const MangaCardHorizontal = function(props: MangaCardHorizontalProps) {
  let {id, title, titleSlug, imageUrl, country, genres} = props.manga;
  return(
    <Link to={`/truyen-tranh-${id}-${titleSlug}.html`}>
      <div className='flex overflow-hidden space-x-2 p-4'>
        <div 
          className='flex-shrink-0 overflow-hidden rounded-lg w-20 h-20 bg-no-repeat bg-center bg-cover border border-black border-opacity-20' 
          style={{ backgroundImage: `url(https://img.idesign.vn/2018/10/23/id-loading-1.gif)` }}
        >
          <img className='w-full' src={imageUrl} alt='' />
        </div>
        <div className='flex-grow relative'>
          <p className='truncate-lines font-semibold text-base leading-5'>{title}</p>
          <div className='absolute bottom-0'>
            {props.viewType && <p className=' '>{props.manga[props.viewType]}</p>}
            <p className='text-red-500 hover:text-red-600'>
              <span>{countryType[country || 'jp'].title}</span>&nbsp;
              {genres !== undefined && <span>{genres[0]?.title}</span>}
            </p>
            {!props.viewType && <p className='hover:text-blue-400 font-semibold'>Xem chi tiết</p>}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MangaCardHorizontal;
