import React, { useEffect, useRef } from 'react';
import { useWindowSize } from 'hooks';
import { Icon } from '@iconify/react';

interface CarouselProps {
  children: JSX.Element[];
  className?: string;
  classNameNavigation?: string;
  columnsPerSlide?: number;
  columnsPerScroll?: number;
  columnSpacing?: number;
}

const Carousel = ({ 
  children, 
  className = '', 
  columnsPerSlide = 1,
  columnsPerScroll = 1,
  columnSpacing = 0,
}: CarouselProps) => {
  const container = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLUListElement>(null);
  const [width] = useWindowSize();
  const nextButtonRef = useRef<HTMLDivElement>(null);
  const prevButtonRef = useRef<HTMLDivElement>(null);
  const currentColumnRef = useRef<number>(0);

  function go(page: 'prev' | 'next') {
    const total = children.length;
    if (slider.current) {
      switch (page) {
        case 'prev':
          currentColumnRef.current = Math.max(currentColumnRef.current-columnsPerScroll, 0);
          break;
        case 'next':
          currentColumnRef.current = Math.min(currentColumnRef.current+columnsPerScroll, total-columnsPerSlide);
          break;
        default:
          break;
      }
    }
    updateCurrentColumn();
  }

  function updateCurrentColumn() {
    if (slider.current) {
      slider.current.style.left =  `-${(container.current?.clientWidth||0)/columnsPerSlide*currentColumnRef.current}px`;
      if (currentColumnRef.current <= 0) {
        prevButtonRef.current?.classList.add('hidden');
      } else {
        prevButtonRef.current?.classList.remove('hidden');
      }
      if (currentColumnRef.current >= children.length-columnsPerSlide) {
        nextButtonRef.current?.classList.add('hidden');
      } else {
        nextButtonRef.current?.classList.remove('hidden');
      }
    }
  }

  useEffect(function() {
    if (container.current) {
      container.current.style.height = `${(slider.current?.clientHeight||0)}px`
    }
    updateCurrentColumn();
    // eslint-disable-next-line
  }, [width, columnsPerSlide, columnSpacing, children.length]);


  return(
    <div className="relative">
      <div className="relative overflow-hidden" style={{ height: slider.current?.clientHeight||0 }} ref={container}>
        <ul 
          ref={slider}
          className={`absolute top-0 flex select-none transition-all duration-300 ${className}`} 
          style={{ 
            left: `0px` 
          }} 
          >
          {children.map((item, i) =>  
            <li 
            className="block" 
            style={{ 
              width: (container.current?.clientWidth||0)/(columnsPerSlide||1), 
              paddingLeft: `${columnSpacing/2}px`,
              paddingRight: `${columnSpacing/2}px`,
            }} 
            key={i}
            >
              {item}
            </li>
          )}
        </ul>
      </div>
        <div 
          ref={prevButtonRef}
          className={`absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 select-none p-2 bg-gray-900 rounded-full`} 
          onClick={() => go('prev')}
          style={{
            left: `${columnSpacing/2}px`
          }}
        >
          <Icon icon="akar-icons:chevron-left" className="leading-4 w-8 h-8 text-white" />
        </div>
        <div 
          ref={nextButtonRef}
          className={`absolute top-1/2 transform -translate-y-1/2 translate-x-1/2 select-none p-2 bg-gray-900 rounded-full`} 
          onClick={() => go('next')}
          style={{
            right: `${columnSpacing/2}px`
          }}
          >
          <Icon icon="akar-icons:chevron-right" className="leading-4 w-8 h-8 text-white" />
        </div>
    </div>
  );
}

export default Carousel;
