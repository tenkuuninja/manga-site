import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { IGenre, IManga } from 'interfaces';
import { Link } from 'react-router-dom';
import { countryType } from 'utils/static';
import { convertNumberToHumanRead, getRelativeTimeFromNow } from 'utils/helper';
import { Icon } from '@iconify/react';

interface MangaCardVerticalProps {
  data: IManga,
  className?: string,
  overlay?: string | JSX.Element;
  handleFollow?: (data: IManga) => void;
}

interface PopupHoverProps {
  overlay: JSX.Element;
  children: any;
}

function PopupHover({ overlay, children }: PopupHoverProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isHover = useRef<boolean>(false);
  const [portal, setPortal] = useState<React.ReactPortal | null>(null);

  const o = <div ref={wrapperRef} className="absolute invisible" >
      <div ref={contentRef} >
        {overlay}
      </div>
    </div>

  const handleMouseIn = (e: React.MouseEvent) => {
    isHover.current = true;
    if (!portal) {
      setPortal(createPortal(o, document.body));
    } else {
      updatePosition();
      wrapperRef.current?.classList.remove('invisible');
      contentRef.current?.classList.add('animate-pop-in');
    }
  }
  
  const handleMouseOut = (e: React.MouseEvent) => {
    isHover.current = false;
    wrapperRef.current?.classList.add('invisible');
    contentRef.current?.classList.remove('animate-pop-in');
  }

  function updatePosition() {
    if (wrapperRef.current && triggerRef.current && contentRef.current) {
      let triggerClient = triggerRef.current.getBoundingClientRect();
      let wrapperClient = wrapperRef.current.getBoundingClientRect();
      let width = window.innerWidth;
      let remain = width - ((triggerClient.left||0) + (triggerClient.width||0))
      if (remain < 400 ) {
        wrapperRef.current.style.top = `${triggerClient.top+ window.scrollY+triggerClient.height/2-wrapperClient.height/2}px`
        wrapperRef.current.style.left = `${triggerClient.left-wrapperClient.width}px`
        contentRef.current.style.marginRight = `${10}px`
      } else {
        wrapperRef.current.style.top = `${triggerClient.top+ window.scrollY+triggerClient.height/2-wrapperClient.height/2}px`
        wrapperRef.current.style.left = `${triggerClient.left+triggerClient.width}px`
        contentRef.current.style.marginLeft = `${10}px`
      }
    }
  }
  
  useEffect(function() {
    if(portal && isHover.current) {
      updatePosition()
      wrapperRef.current?.classList.remove('invisible')
      contentRef.current?.classList.add('animate-pop-in')
    }
    // eslint-disable-next-line
  }, [portal]);

  useEffect(function() {
    if (portal) {
      setPortal(createPortal(o, document.body));
    }
    // eslint-disable-next-line
  }, [overlay]);

  if (portal) {
    return (
      <div ref={triggerRef} onMouseEnter={handleMouseIn} onMouseLeave={handleMouseOut} >
        {children}
        {portal}
      </div>
    );
  }

  return(
    <div ref={triggerRef} onMouseEnter={handleMouseIn} onMouseLeave={handleMouseOut} >
      {children}
    </div>
  );
}

export const MangaCardVertical = function(props: MangaCardVerticalProps) {
  const { id, title, titleSlug, imageUrl, description, favorite, rate, view, chapter, isFinish, country, updatedAt = '', isFollowing, genres } = props.data;

  return(
    <PopupHover
      overlay={
      <div className={`hidden lg:block animate-pop-in z-20`}>
        <div className='overflow-hidden rounded-lg bg-white shadow-lg border border-gray-200 w-96 p-4'>
          <h3 className='font-semibold text-lg'>{title}</h3>
          <p className='text-xs text-primary-500'>C???p nh???t t??? <span className='text-sm text-primary-600 font-semibold'>{getRelativeTimeFromNow(updatedAt)}</span></p>
          <p className=' text-sm'>{chapter} ch????ng &bull; {isFinish ? '???? ho??n th??nh' : '??ang c???p nh???t'}</p>
          <p className="text-sm space-x-8">
            <span ><Icon icon="bi:eye" /> {convertNumberToHumanRead(view||0)}</span>
            <span ><Icon icon="bi:heart" /> {convertNumberToHumanRead(favorite||0)}</span>
            <span ><Icon icon="bi:star" /> {(rate?.all||5).toFixed(1)}</span>
          </p>
          <ul className='text-sm font-medium my-2'>
            <li className='inline-block px-2 py-0.5 border border-red-500 text-red-500 hover:text-white hover:bg-red-500 rounded-2xl transition mr-1 mt-1'>
              <Link className='block' to={`/quoc-gia-${countryType[country as keyof typeof countryType].slug}.html`}>
                {countryType[country as keyof typeof countryType].title}
              </Link>
            </li>
            {genres?.map((genre: IGenre) => 
            <li className='inline-block px-2 py-0.5 border border-primary-500 text-primary-500 hover:text-white hover:bg-primary-500 rounded-2xl transition mr-1 mt-1' key={genre.id}>
              <Link className='block' to={`/the-loai-${genre.id}-${genre.titleSlug}.html`}>
                {genre.title}
              </Link>
            </li>)}
          </ul>
          <p className='truncate-lines line-clamp-10 leading-5 text-sm mt-1'>{description}</p>
          <div className='flex items-center text-lg mt-2'>
            <Link 
              className='flex-grow block text-white text-center font-bold rounded py-1 bg-primary-400 hover:bg-primary-500 transition' 
              to={`/truyen-tranh-${id}-${titleSlug}.html`}
            >
              Th??ng tin truy???n
            </Link>
            <Icon className="text-2xl ml-4" icon={isFollowing ? "bi:heart-fill" : "bi:heart"} onClick={() => props.handleFollow && props.handleFollow(props.data)} />
          </div>
        </div>
      </div>
      }
    >
      <Link to={`/truyen-tranh-${id}-${titleSlug}.html`}>
        <div className='rounded-md overflow-hidden bg-white border-gray-200'>
          <div className='overflow-hidden relative bg-no-repeat bg-center bg-cover border border-gray-200' style={{ paddingTop: '133%', backgroundImage: `url(https://img.idesign.vn/2018/10/23/id-loading-1.gif)` }}>
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
