import React from 'react';
import { IAppState, IGenre } from 'interfaces';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import st from './footer.module.css';

const str = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem fugiat tempore, ipsa, modi facilis porro quasi neque nemo rerum pariatur suscipit quae consectetur!';

const categories = [
  { text: 'Truyện mới cập nhật', url: '/truyen-moi-cap-nhat.html' },
  { text: 'Truyện tranh mới nhất', url: '/truyen-tranh-moi.html' },
  { text: 'Truyện đã hoàn thành', url: '/truyen-da-hoan-thanh.html' },
  { text: 'Truyện xem nhiều', url: '/top-truyen-tranh.html' },
]

const follow = [
  { text: <a href="https://fb.com/tenkuuninja" target="_blank"><Icon icon="cib:facebook-f" /> Facebook</a>, url: '#' },
  { text: <><Icon icon="cib:telegram-plane" /> Telegram</>, url: '#' },
  { text: <><Icon icon="cib:tumblr" /> Tumblr</>, url: '#' },
  { text: <><Icon icon="simple-icons:onlyfans" /> Onlyfans</>, url: '#' },
];


const Footer = () => {
  const genres = useSelector((store: IAppState) => store.genres);
  const genreRan: IGenre[] = [];
  if (genres.data.length) {
    for (let i = 0; i<4; i++) {
      genreRan.push(genres.data[Math.floor(Math.random()*genres.data.length)])
    }
  }

  return(
    <div className="border-t border-dashed border-black border-opacity-20">
      <div className={`${st.wrapper} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-335 mx-auto p-4`}>
        <div>
          <h3 className="text-2xl leading-6 font-semibold mb-4">Giới thiệu</h3>
          <p className="text-justify">{str}</p>
        </div>
        <div>
          <h3 className="text-2xl leading-6 font-semibold mb-4">Danh mục</h3>
          {categories.map((item, i) => <Link className="block mt-1 hover:underline" to={item.url} key={i} >
            {item.text}
          </Link> )}
        </div>
        <div className="hidden sm:block">
          <h3 className="text-2xl leading-6 font-semibold mb-4">Thể loại</h3>
          {genreRan.map((item, i) => i<4 && <Link className="block mt-1 hover:underline" to={`/the-loai-${item.id}-${item.titleSlug}.html`} key={i} >
            {item.title}
          </Link> )}
        </div>
        <div>
          <h3 className="text-2xl leading-6 font-semibold mb-4">Theo dõi</h3>
          {follow.map((item, i) => <p className="flex items-center mt-1 hover:underline cursor-pointer" key={i} >
            {item.text}
          </p> )}
        </div>
      </div>
    </div>
  );
}

export default Footer;
