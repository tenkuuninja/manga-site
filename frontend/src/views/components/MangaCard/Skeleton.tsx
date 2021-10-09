import React from 'react';

export function HorizontalCardSkeleton() {
  return(
    <div className="flex overflow-hidden space-x-2">
      <div className="flex-shrink-0 bg-gray-400 rounded-lg w-20 h-20"></div>
      <div className="flex-grow relative">
        <div className="h-4 bg-gray-400 rounded mb-1"></div>
        <div className="h-4 bg-gray-400 rounded"></div>
        <div className="absolute bottom-0 h-3 w-1/2 bg-gray-400 rounded"></div>
      </div>
    </div>
  );
}

export function VerticalCardSkeleton() {
  return(
    <div className="">
      <div className="bg-skeleton rounded-tl rounded-tr" style={{ paddingTop: '133%' }}></div>
      <div className="mt-2">
        <div className="h-5 bg-gray-400 rounded mb-1"></div>
        <div className="h-5 bg-gray-400 rounded"></div>
      </div>
    </div>
  );
}
