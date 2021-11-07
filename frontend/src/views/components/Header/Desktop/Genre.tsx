import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IAppState } from 'interfaces'
import Dropdown from 'views/components/Dropdown';
import { GenreSkeleton } from './Skeleton';

const countries = [
  {id: 'jp', title: 'Manga',  slug: 'nhat-ban'},
  {id: 'cn', title: 'Manhua',  slug: 'trung-quoc'},
  {id: 'kr', title: 'Manhwa',  slug: 'han-quoc'},
];

const Genre = function() {
  const genres = useSelector((store: IAppState) => store.genres);
  
  let content;
  if (genres.isLoading) {
    content = <GenreSkeleton />
  } else if (genres.isError) {
    content = <GenreSkeleton />
  } else {
    content = <div className="grid w-180 mt-1 divide-x" style={{gridTemplateColumns: '100px auto'}}>
      <ul>
        {countries.map(country => <li key={country.id}>
          <Link to={`/quoc-gia-${country.slug}.html`} className="block px-4 py-2 text-center hover:text-primary-600 transition duration-100">
            {country.title}
          </Link>
        </li>)}
      </ul>
      <ul className="grid grid-flow-col grid-rows-6 my-2">
        {genres.data.map(item => <li key={item.id}>
          <Link to={`/the-loai-${item.id}-${item.titleSlug}.html`} className="block px-4 py-2 text-center hover:text-primary-600 transition duration-100">
            {item.title}
          </Link>
        </li>)}
      </ul>
    </div>
  }

  return(
    <Dropdown
      placement="bottom-left"
      overlay={<div className="animate-pop-in bg-white border border-gray-200 mt-1 text-sm" >{content}</div>}
    >
      <div className="h-18 select-none">
        <div className="inline-flex justify-center items-center cursor-pointer h-12 my-3 px-3 hover:text-primary-600 transition duration-100">
          <span>Thể loại</span>
        </div>
      </div>
    </Dropdown>
  );
}

export default Genre;
