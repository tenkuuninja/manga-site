import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IAppState } from 'interfaces'
import Dropdown from 'views/components/Dropdown';
import {
  Paper
} from '@material-ui/core';

const countries = [
  {id: 'jp', title: 'Manga',  slug: 'nhat-ban'},
  {id: 'cn', title: 'Manhua',  slug: 'trung-quoc'},
  {id: 'kr', title: 'Manhwa',  slug: 'han-quoc'},
];

const Genre = function() {
  const genre = useSelector((store: IAppState) => store.genre);
  
  let content;
  if (genre.isLoading) {
    content = ''
  } else if (genre.isError) {
    content = ''
  } else {
    content = <div className="grid w-180 mt-1 divide-x" style={{gridTemplateColumns: '100px auto'}}>
      <ul>
        {countries.map(country => <li key={country.id}>
          <Link to={`/quoc-gia-${country.slug}.html`} className="block px-4 py-2 text-center hover:text-blue-700 transition duration-100">
            {country.title}
          </Link>
        </li>)}
      </ul>
      <ul className="grid grid-flow-col grid-rows-6 my-2">
        {genre.payload.map(item => <li key={item.id}>
          <Link to={`/the-loai-${item.id}-${item.titleSlug}.html`} className="block px-4 py-2 text-center hover:text-blue-700 transition duration-100">
            {item.title}
          </Link>
        </li>)}
      </ul>
    </div>
  }

  return(
    <Dropdown
      placement="bottom-left"
      overlay={<Paper className="animate-pop-in mt-1 text-sm" variant="outlined" square >{content}</Paper>}
    >
      <div className="h-18">
        <div className="inline-flex justify-center items-center cursor-pointer h-12 my-3 px-3 hover:text-blue-700 transition duration-100">
          <span>Thể loại</span>
        </div>
      </div>
    </Dropdown>
  );
}

export default Genre;