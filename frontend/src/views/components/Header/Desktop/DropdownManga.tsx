import React from 'react';
import { IManga } from 'interfaces';
import Dropdown from 'views/components/Dropdown';

interface DropdownMangaProps {
  data: IManga[]
  isLoading: boolean
  isError: boolean
  url: string
  title: string
}

const DropdownManga = function(props: DropdownMangaProps) {
  return(
    <Dropdown
      placement="bottom-left"
      overlay={<div className="animate-pop-in bg-white border border-opacity-10 mt-1 text-sm" >{'content'}</div>}
    >
    <div className="h-18">
      <div className="inline-flex justify-center items-center cursor-pointer h-12 my-3 px-3 hover:text-blue-700 transition duration-100">
        <span>Danh mục</span>
      </div>
    </div>
  </Dropdown>
  );
}

export default DropdownManga;
