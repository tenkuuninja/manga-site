import React from 'react';

export const SingleCommentBoxSkeleton = () => {
  return(
    <div className='flex my-8 animate-pulse'>
      <div className='mr-4'>
        <span className='block rounded-full w-10 h-10 bg-skeleton'></span>
      </div>
      <div className='flex-grow'>
        <div className='rounded h-4 mb-3 bg-skeleton-dark w-48'></div>
        <div className='rounded h-3 my-1 bg-skeleton w-full'></div>
        <div className='rounded h-3 my-1 bg-skeleton w-full'></div>
        <div className='rounded h-3 my-1 bg-skeleton w-full'></div>
        <div className='rounded h-3 my-1 bg-skeleton w-44'></div>
        <div className='rounded h-3 mt-3 bg-skeleton w-64'></div>
      </div>
    </div>
  );
}

export const CommentBoxSkeleton = () => {
  let items = [];
  for (let i = 0; i<5; i++) {
    items.push(<SingleCommentBoxSkeleton key={i} />)
  }
  return(
    <div className=''>
      {items}
    </div>
  );
}

export const FormWriteCommentSkeleton = () => {
  return(
    <div className='flex my-8 animate-pulse'>
      <div className='mr-4'>
        <span className='block rounded-full w-10 h-10 bg-skeleton'></span>
      </div>
      <div className='flex-grow'>
        <div className='grid grid-cols-2 gap-2'>
          <div className='px-4 rounded h-8 bg-skeleton'></div>
          <div className='px-4 rounded h-8 bg-skeleton'></div>
        </div>
        <div className='rounded h-24 px-2 bg-skeleton w-full mt-2'></div>
      </div>
    </div>

  );
}


