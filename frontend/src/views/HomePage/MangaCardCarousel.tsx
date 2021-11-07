import React, { useState } from 'react';
import { IAppState, IManga } from 'interfaces';
import { useSelector } from 'react-redux';
import Carousel from 'views/components/Carousel';
import { MangaCardVertical } from 'views/components/MangaCard';
import { CarouselMangaSkeleton } from './Skeleton';

interface CommonMangaCardCarouselProps {
  title: string;
  data: IManga[];
  isLoading: boolean;
  isError: boolean;
  cols: number;
  overlay: (manga: IManga) => JSX.Element;
  handleFollow: (manga: IManga) => void;
}

export const CommonMangaCardCarousel = (props: CommonMangaCardCarouselProps) => {
  if (props.isLoading || props.isError) {
    return <CarouselMangaSkeleton />
  }

  return (
    <section className="container max-w-335 px-4 mx-auto">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold my-4">
        {props.title}
      </h2>
      <Carousel columnsPerSlide={props.cols} columnsPerScroll={props.cols} columnSpacing={16} >
        {props.data.map((item, i) => 
          <MangaCardVertical key={i} data={item} overlay={props.overlay(item)} handleFollow={props.handleFollow} /> 
        )}
      </Carousel>
    </section>
  );
}

interface TopMangaCardCarouselProps {
  cols: number;
  overlay: (manga: IManga) => JSX.Element;
  handleFollow: (manga: IManga) => void;
}

export const TopMangaCardCarousel = (props: TopMangaCardCarouselProps) => {
  const { common } = useSelector((store: IAppState) => store);
  const [typeTop, setTypeTop] = useState<'day' | 'week' | 'month'>('day');

  if (common.top.isLoading || common.top.isError) {
    return <CarouselMangaSkeleton />
  }

  return(
    <section className="container max-w-335 px-4 mx-auto">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-4">
        Xếp hạng truyện
      </h2>
      <div className="my-2 ml-2 text-lg space-x-4 font-bold">
        <span 
          className={`${typeTop === 'day' ? 'opacity-100' : 'opacity-70'} transition-opacity cursor-pointer`} 
          onClick={() => setTypeTop('day')}
        >
          Hôm nay
        </span>
        <span 
          className={`${typeTop === 'week' ? 'opacity-100' : 'opacity-70'} transition-opacity cursor-pointer`} 
          onClick={() => setTypeTop('week')}
        >
          Tuần này
        </span>
        <span 
          className={`${typeTop === 'month' ? 'opacity-100' : 'opacity-70'} transition-opacity cursor-pointer`} 
          onClick={() => setTypeTop('month')}
        >
            Tháng này
          </span>
      </div>
      <Carousel columnsPerSlide={props.cols} columnsPerScroll={props.cols} columnSpacing={16} >
        {common.top[typeTop].map((item, i) => <MangaCardVertical 
            key={i} 
            data={item} 
            overlay={props.overlay(item)} 
            handleFollow={props.handleFollow}
          /> 
        )}
      </Carousel>
    </section>
  );
}