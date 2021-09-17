import React from 'react';
import { HorizontalCardSkeleton } from 'views/components/MangaCard';

export const GenreSkeleton = function() {
  let countrys = [];
  let genres = [];
  for (let i=0; i<4; i++) 
    countrys.push(<li key={i} className='px-3 py-2'><span className='block rounded bg-skeleton h-3'></span></li>)
  for (let i=0; i<32; i++) 
    genres.push(<li key={i} className='px-3 py-2'><span className='block rounded bg-skeleton h-3'></span></li>)
  return(
    <div className="animate-pulse grid w-180 mt-1 divide-x" style={{gridTemplateColumns: '100px auto'}}>
      <ul className='grid grid-flow-col grid-rows-6 space-y-1'>
        {countrys}
      </ul>
      <ul className='grid grid-flow-col grid-rows-6 space-y-1'>
        {genres}
      </ul>
    </div>
  );
}

export function DropdownMangaSkeleton() {
	let listHorizontalCardSkeleton = []
	for (let i=0;i<5;i++) {
		listHorizontalCardSkeleton.push(<li className="p-4" key={i}><HorizontalCardSkeleton /></li>)
	}
	return (
		<ul className='animate-pulse w-96 divide-y'>
			{listHorizontalCardSkeleton}
		</ul>
	);
}

export function AutoCompleteSkeleton() {
	let listChildSkeleton = []
	for (let i=0;i<10;i++) {
		listChildSkeleton.push(<li className="p-2" key={i}>
      <div className='flex overflow-hidden space-x-2 p-2'>
        <div className="flex-shrink-0 bg-gray-400 rounded-lg w-12 h-12"></div>
        <div className='flex-grow relative'>
          <div className="h-4 bg-gray-400 rounded mb-1"></div>
          <div className="absolute bottom-0">
            <div className="inline-block h-3 w-14 bg-skeleton rounded mr-2"></div>
            <div className="inline-block h-3 w-12 bg-skeleton rounded mr-2"></div>
            <div className="inline-block h-3 w-16 bg-skeleton rounded"></div>
          </div>
        </div>
      </div>
    </li>)
	}
	return (
		<ul className='animate-pulse p-2 divide-y'>
			{listChildSkeleton}
		</ul>
	);
}
