import React from 'react';
import { IManga } from 'interfaces';
import Dropdown from 'views/components/Dropdown';
import { data } from 'autoprefixer';
import { MangaCardHorizontal } from 'views/components/MangaCard';
import { Link } from 'react-router-dom';

interface DropdownMangaProps {
  data: IManga[]
  isLoading: boolean
  isError: boolean
  url: string
  title: string
  text: string
}

const DropdownManga = function(props: DropdownMangaProps) {
  return(
    <Dropdown
      placement="bottom-right"
      overlay={<div className="animate-pop-in bg-white border border-black border-opacity-10 mt-1 text-sm" >
        <ul className="w-96 divide-y">
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
      </div>}
    >
    <div className="h-18">
      <Link to={props.url}>
        <div className="inline-flex justify-center items-center cursor-pointer h-12 my-3 px-3 hover:text-blue-700 transition duration-100">
          <span>{props.title}</span>
        </div>
      </Link>
    </div>
  </Dropdown>
  );
}

export default DropdownManga;
