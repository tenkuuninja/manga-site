import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { IGenre, IManga } from 'interfaces';
import { Link } from 'react-router-dom';
import { countryType } from 'utils/static';
import { getRelativeTimeFromNow } from 'utils/helper';
import { useWindowSize } from 'hooks';
import { Icon } from '@iconify/react';

interface MangaCardVerticalProps {
  data: IManga,
  className?: string,
  overlay?: string | JSX.Element;
  handleFollow?: () => void;
}

interface PopupHoverProps {
  overlay: JSX.Element;
  children: any;
}

function PopupHover({ overlay, children }: PopupHoverProps) {
  // const triggerRef = useRef<HTMLDivElement>(null);
  // const [triggerRect, triggerRef] = useClientRect();
  const triggerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [width] = useWindowSize();

  const handleMouseIn = (e: React.MouseEvent) => {
    setOpen(true);
    wrapperRef.current?.classList.remove('invisible')
    contentRef.current?.classList.add('animate-pop-in')
  }
  
  const handleMouseOut = (e: React.MouseEvent) => {
    setOpen(false);
    wrapperRef.current?.classList.add('invisible')
    contentRef.current?.classList.remove('animate-pop-in')
  }
  
  useEffect(function() {
    if (wrapperRef.current && triggerRef.current && contentRef.current) {
      let triggerClient = triggerRef.current.getBoundingClientRect();
      let wrapperClient = wrapperRef.current.getBoundingClientRect();
      let remain = width - ((triggerClient.left||0) + (triggerClient.width||0))
      if (remain < 400 ) {
        wrapperRef.current.style.top = `${triggerClient.top+triggerClient.height/2-wrapperClient.height/2}px`
        wrapperRef.current.style.left = `${triggerClient.left-wrapperClient.width}px`
        contentRef.current.style.marginRight = `${10}px`
      } else {
        wrapperRef.current.style.top = `${triggerClient.top+triggerClient.height/2-wrapperClient.height/2}px`
        wrapperRef.current.style.left = `${triggerClient.left+triggerClient.width}px`
        contentRef.current.style.marginLeft = `${10}px`
      }
    }
    // eslint-disable-next-line
  }, [width, isOpen]);

  useEffect(function() {

  });


  return(
    <div ref={triggerRef} onMouseOver={handleMouseIn} onMouseOut={handleMouseOut} >
      {children}
      {createPortal(
        <div ref={wrapperRef} className="absolute invisible" >
          <div ref={contentRef} >
            {overlay}
          </div>
        </div>
      , document.body)}
    </div>
  );
}

export const MangaCardVertical = function(props: MangaCardVerticalProps) {
  const { id, title, titleSlug, imageUrl, description, chapter, isFinish, country, updatedAt = '', isFollowing, genres } = props.data;

  return(
    <PopupHover
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
          <div className='flex items-center text-lg mt-2'>
            <Link 
              className='flex-grow block text-white text-center font-bold rounded py-1 bg-blue-500 opacity-90 hover:opacity-100 transition' 
              to={`/truyen-tranh-${id}-${titleSlug}.html`}
            >
              Thông tin truyện
            </Link>
            <Icon className="text-2xl ml-4" icon={isFollowing ? "bi:heart-fill" : "bi:heart"} onClick={props.handleFollow} />
          </div>
        </div>
      </div>
      }
    >
      <Link to={`/truyen-tranh-${id}-${titleSlug}.html`}>
        <div className='rounded-md overflow-hidden bg-white border-gray-200'>
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
