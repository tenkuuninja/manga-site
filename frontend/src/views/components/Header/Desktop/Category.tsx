import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'views/components/Dropdown';

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
  
  let content = <div className="block mt-1" >
    <ul className='grid grid-flow-col grid-rows-4 w-96 my-2'>
      {categories.map((cate, i) => <li key={i} className='block px-4 py-2 text-center hover:text-primary-600 transition duration-100'>
        <Link to={`/${cate.slug}.html`}>{cate.title}</Link>
      </li>)}
    </ul>
  </div>

  return(
    <Dropdown
      placement="bottom-left"
      overlay={<div className="animate-pop-in bg-white border border-gray-200 mt-1 text-sm" >{content}</div>}
    >
    <div className="h-18 select-none">
      <div className="inline-flex justify-center items-center cursor-pointer h-12 my-3 px-3 hover:text-primary-600 transition duration-100">
        <span>Danh mục</span>
      </div>
    </div>
  </Dropdown>
  );
}

export default Category;
