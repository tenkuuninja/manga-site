import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IAppState } from 'interfaces'
import Dropdown from 'views/components/Dropdown';
import {
  Paper
} from '@material-ui/core';

const categories = [
  { title: 'Truyện mới cập nhật', slug: 'truyen-moi-cap-nhat' },
  { title: 'Truyện tranh mới nhất', slug: 'truyen-tranh-moi' },
  { title: 'Truyện đã hoàn thành', slug: 'truyen-da-hoan-thanh' },
  { title: 'Xếp hang yêu thích', slug: 'top-truyen-yeu-thich' },
  { title: 'Truyện xem nhiều', slug: 'top-truyen-tranh' },
  { title: 'Top truyện tháng', slug: 'top-thang' },
  { title: 'Top truyện Tuần', slug: 'top-tuan' },
  { title: 'Top truyện ngày', slug: 'top-ngay' },
]

const Category = function() {
  const genre = useSelector((store: IAppState) => store.genre);
  
  let content;
  if (genre.isLoading) {
    content = ''
  } else if (genre.isError) {
    content = ''
  } else {
    content = <div className="block mt-1" >
      <ul className='grid grid-flow-col grid-rows-4 w-96 my-2'>
        {categories.map((cate, i) => <li key={i} className='block px-4 py-2 text-center hover:text-blue-700 transition duration-100'>
          <Link to={`/${cate.slug}.html`}>{cate.title}</Link>
        </li>)}
      </ul>
    </div>
  }

  return(
    <Dropdown
      placement="bottom-left"
      overlay={<Paper className="animate-pop-in mt-1 text-sm select-none" variant="outlined" square >{content}</Paper>}
    >
    <div className="h-18 select-none">
      <div className="inline-flex justify-center items-center cursor-pointer h-12 my-3 px-3 hover:text-blue-700 transition duration-100">
        <span>Danh mục</span>
      </div>
    </div>
  </Dropdown>
  );
}

export default Category;
