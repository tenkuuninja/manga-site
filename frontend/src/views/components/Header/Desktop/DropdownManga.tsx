import React from 'react';
import { IManga } from 'interfaces';
import Dropdown from 'views/components/Dropdown';
import { MangaCardHorizontal } from 'views/components/MangaCard';
import { Link } from 'react-router-dom';
import { DropdownMangaSkeleton } from './Skeleton';

interface DropdownMangaProps {
  data: IManga[]
  isLoading: boolean
  isError: boolean
  url: string
  title: string
  text: string
}

const DropdownManga = function(props: DropdownMangaProps) {
  let content;
  if (props.isLoading || props.isError) {
    content = <DropdownMangaSkeleton />
  } else {
    content = <ul className="w-96 divide-y">
      {props.data.map((item, i) => i < 3 && <li key={i}>
        <MangaCardHorizontal manga={item} />
      </li>)}
      <li className="p-4">
        <Link 
          to={props.url} 
          className="block py-3 bg-black hover:opacity-80 text-lg text-center text-white font-semibold"
        >
          {props.text}
        </Link>
      </li>
    </ul>
  }
  return(
    <Dropdown
      placement="bottom-right"
      overlay={<div className="animate-pop-in bg-white border border-gray-200 mt-1 text-sm" >
        {content}
      </div>}
    >
    <div className="h-18 select-none">
      <Link to={props.url}>
        <div className="inline-flex justify-center items-center cursor-pointer h-12 my-3 px-3 hover:text-primary-600 transition duration-100">
          <span>{props.title}</span>
        </div>
      </Link>
    </div>
  </Dropdown>
  );
}

export default DropdownManga;
