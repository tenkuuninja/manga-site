import React from 'react';

export const DetailSkeleton = () => {
  return (
    <div className="animate-pulse">
      <section>
      
      </section>
      <section className='clear-both'>
        <div className='rounded h-3 bg-skeleton w-64'></div>
        <div className='rounded h-10 my-5 bg-skeleton w-4/5'></div>
        <div className='rounded h-4 my-3 bg-skeleton w-40'></div>
        <div className='rounded h-4 my-3 bg-skeleton w-44'></div>
        <div className='rounded h-4 my-3 bg-skeleton w-40'></div>
        <div className='rounded h-4 my-3 bg-skeleton w-32'></div>
        <div className='rounded h-4 my-5 bg-skeleton w-3/5'></div>
        <div className='space-y-2'>
          <div className='rounded h-4 bg-skeleton w-full'></div>
          <div className='rounded h-4 bg-skeleton w-full'></div>
          <div className='rounded h-4 bg-skeleton w-full'></div>
          <div className='rounded h-4 bg-skeleton w-40'></div>
        </div>
        <div className='space-x-2 mt-5'>
          <span className='inline-block rounded-2xl h-7 w-28 bg-skeleton'></span>
          <span className='inline-block rounded-2xl h-7 w-24 bg-skeleton'></span>
          <span className='inline-block rounded-2xl h-7 w-16 bg-skeleton'></span>
        </div>
      </section>
    </div>
  );
}

export const ChapterListSkeleton = () => {
  let items = [];
  for (let i=0; i<10; i++) {
    items.push(<li className='block w-full clear-both overflow-hidden py-4' key={i}>
      <span className='float-left h-4 w-full bg-skeleton'></span>
      {/* <span className='float-right h-4 w-36 bg-skeleton'></span> */}
    </li>);
  }
  return(
    <div className="animate-pulse">
      <div className='rounded h-7 my-5 bg-skeleton w-64'></div>
      <ul className='divide-y clear-both overflow-hidden'>
        {items}
      </ul>
    </div>
  );
}

export const AsideStickySkeleton = () => {
  return (
    <div className="sticky top-5 animate-pulse">
      <div className="relative mx-auto my-5 w-60 h-80 bg-skeleton"></div>  
    </div>
  );
}
