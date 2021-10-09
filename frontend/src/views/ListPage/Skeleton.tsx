import React from 'react';
import { VerticalCardSkeleton } from 'views/components/MangaCard';

export const ListVerticalCardSkeleton = () => {
  let items: JSX.Element[] = []
  for (let i = 0; i<30; i++) {
    items.push(<VerticalCardSkeleton />)
  }

  return(
    <div className="animate-pulse grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-x-3 gap-y-6 py-4">
      {items}
    </div>
  );
}
