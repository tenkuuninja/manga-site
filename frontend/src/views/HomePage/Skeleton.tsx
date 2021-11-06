import { useCols } from 'hooks';
import React from 'react';
import { VerticalCardSkeleton } from 'views/components/MangaCard';

export const CarouselMangaSkeleton = () => {
  let items: JSX.Element[] = []
  const cols = useCols();
  for (let i = 0; i<cols; i++) {
    items.push(<VerticalCardSkeleton key={i} />)
  }

  return(
    <section className="animate-pulse container max-w-335 px-4 mx-auto">
      <div className="bg-skeleton w-80 h-8"></div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-x-3 gap-y-6 py-4">
        {items}
      </div>
    </section>
  );
}

export const CarouselGenreSkeleton = () => {
  let items: JSX.Element[] = []
  const cols = useCols();
  for (let i = 0; i<cols-1; i++) {
    items.push(
      <div className="text-center font-bold space-y-2" key={i}>
        <div className="bg-skeleton h-12"></div>
        <div className="bg-skeleton h-12"></div>
      </div>
    )
  }

  return(
    <section className="animate-pulse container max-w-335 px-4 mx-auto">
      <div className="bg-skeleton w-80 h-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-6 py-4">
        {items}
      </div>
    </section>
  );
}
