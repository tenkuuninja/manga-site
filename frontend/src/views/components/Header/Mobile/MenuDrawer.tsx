import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Drawer from 'views/components/DrawerSideLeft';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState, IGenre } from 'interfaces';
import { logout } from 'stores/auth/actions';
import Avatar from 'views/components/Avatar';

const categories = [
  { title: 'Truyện mới cập nhật', url: '/truyen-moi-cap-nhat.html' },
  { title: 'Truyện tranh mới nhất', url: '/truyen-tranh-moi.html' },
  { title: 'Truyện đã hoàn thành', url: '/truyen-da-hoan-thanh.html' },
  { title: 'Xếp hang yêu thích', url: '/top-truyen-yeu-thich.html' },
]

const ranks = [
  { title: 'Truyện xem nhiều', url: '/top-truyen-tranh.html' },
  { title: 'Top truyện tháng', url: '/top-thang.html' },
  { title: 'Top truyện Tuần', url: '/top-tuan.html' },
  { title: 'Top truyện ngày', url: '/top-ngay.html' },
]

const countries = [
  { title: 'Truyện Nhật Bản', url: '/quoc-gia-nhat-ban.html' },
  { title: 'Truyện Hàn Quốc', url: '/quoc-gia-han-quoc.html' },
  { title: 'Truyện Trung Quốc', url: '/quoc-gia-trung-quoc.html' },
]

function MenuContent(props: { isDrawerOpen: boolean }) {
  const { auth, genre } = useSelector((store: IAppState) => store);
  const dispatch = useDispatch();
  const [isOpenCategory, setOpenCategory] = useState<boolean>(false);
  const [isOpenRank, setOpenRank] = useState<boolean>(false);
  const [isOpenCountry, setOpenCountry] = useState<boolean>(false);
  const [isOpenGenre, setOpenGenre] = useState<boolean>(false);

  const isOpenMainMenu = isOpenCategory||isOpenRank||isOpenCountry||isOpenGenre;

  const menu = [
    {
      title: 'Tài khoản',
      auth: true,
      child: [
        { title: 'Quản lý tài khoản', url: '' },
        { title: 'Truyện đang theo dõi', url: '/truyen-dang-theo-doi.html' },
        { title: 'Lịch sử đọc truyện', url: '/lich-su-doc-truyen.html' },
        { title: 'Thông báo', url: '' },
      ]
    }, 
    {
      title: 'Đọc truyện',
      auth: false,
      child: [
        { title: 'Danh mục', action: () => setOpenCategory(true) },
        { title: 'Xếp hạng', action: () => setOpenRank(true)},
        { title: 'Quốc gia', action: () => setOpenCountry(true)},
        { title: 'Thể loại', action: () => setOpenGenre(true)},
        { title: 'Tìm kiến nâng cao', url: '/tim-kiem-nang-cao.html'},
      ]
    },
    {
      title: 'Khác',
      auth: false,
      child: [
        { title: 'Cài đặt', url: '' }
      ]
    }
  ]

  useEffect(function() {
    setOpenCategory(false);
    setOpenRank(false);
    setOpenCountry(false);
    setOpenGenre(false);
  }, [props.isDrawerOpen]);

  let headMenu;
  if (auth.isLoading || auth.isError) {
    headMenu = '';
  } else if (!auth.isLoggedIn) {
    headMenu = <div className="flex py-6 justify-center">
      <div className="text-sm font-bold">
        <Link to="/dang-nhap.html" className="inline-flex items-center h-10 px-3 border border-black hover:bg-gray-100 transition duration-100">
          Đăng nhập
        </Link>
      </div>
      <div className="ml-4 text-sm font-bold">
        <Link to="/dang-ky-tai-khoan.html" className="inline-flex items-center h-10 border px-5 border-black bg-black text-white">
          Đăng ký
        </Link>
      </div>
    </div>;
  } else {
    headMenu = <Link to="/" className="flex items-center p-4">
      <Avatar size="lg" src="" alt="Viet Hoang" />
      <div className="flex-grow pl-2 overflow-hidden">
        <span className="truncate-lines line-clamp-1 text-lg font-bold">
          {auth.user?.username}
        </span>
        <span className="text-sm" style={{ color: auth.user?.role?.color }}>
          {auth.user?.role?.name}
        </span>
      </div>
    </Link>
  }

  return(
    <nav className="relative overflow-hidden select-none" style={{clip: 'rect(auto, auto, auto, auto)'}}>
      <div className={`divide-y overflow-y-auto h-screen ${isOpenMainMenu && "transform -translate-x-full"}`}>
        {headMenu}
        {menu.map((blockList, i) =>  (auth.isLoggedIn && blockList.auth) || !blockList.auth ? <div className="py-2" key={i}>
          <h2 className="text-sm font-bold text-gray-600 pt-2 px-4">{blockList.title}</h2>
          <ul>
            {blockList.child.map((item: { title: string, url?: string, action?: any}, j: number) => <li key={j}>
              {item.url !== undefined && <Link to={item.url} className="block px-4 py-2">
                {item.title}
              </Link>}
              {item.action !== undefined && <div className="block px-4 py-2 cursor-pointer" onClick={item.action}>
                <span>{item.title}</span>
                <span className="float-right pt-1"><Icon icon="ri:arrow-right-s-line" className="text-lg" /></span>
              </div>}
            </li>)}
          </ul>
        </div> : null)}
        {auth.isLoggedIn && <div className="block p-4 cursor-pointer" onClick={() => dispatch(logout())}>
          Đăng xuất
        </div>}
      </div>
      <div className={`transform ${isOpenCategory ? "translate-x-0" : "translate-x-full"} transition absolute top-0 left-0 overflow-y-auto w-72 h-screen min-h-screen bg-white`}>
        <div className="flex justify-start items-center w-full p-4 bg-gray-100 cursor-pointer" onClick={() => setOpenCategory(false)}>
          <Icon icon="ri:arrow-left-s-line" className="text-lg" />
          <span className="ml-4">Menu</span>
        </div>
        <ul>
          {categories.map((item, i) => <li key={i}>
            <Link to={item.url} className="block px-4 py-2">
              {item.title}
            </Link>
          </li>)}
        </ul>
      </div>
      <div className={`transform ${isOpenRank ? "translate-x-0" : "translate-x-full"} transition absolute top-0 left-0 overflow-y-auto w-72 h-screen min-h-screen bg-white`}>
        <div className="flex justify-start items-center w-full p-4 bg-gray-100 cursor-pointer" onClick={() => setOpenRank(false)}>
          <Icon icon="ri:arrow-left-s-line" className="text-lg" />
          <span className="ml-4">Menu</span>
        </div>
        <ul>
          {ranks.map((item, i) => <li key={i}>
            <Link to={item.url} className="block px-4 py-2">
              {item.title}
            </Link>
          </li>)}
        </ul>
      </div>
      <div className={`transform ${isOpenCountry ? "translate-x-0" : "translate-x-full"} transition absolute top-0 left-0 overflow-y-auto w-72 h-screen min-h-screen bg-white`}>
        <div className="flex justify-start items-center w-full p-4 bg-gray-100 cursor-pointer" onClick={() => setOpenCountry(false)}>
          <Icon icon="ri:arrow-left-s-line" className="text-lg" />
          <span className="ml-4">Menu</span>
        </div>
        <ul>
          {countries.map((item, i) => <li key={i}>
            <Link to={item.url} className="block px-4 py-2">
              {item.title}
            </Link>
          </li>)}
        </ul>
      </div>
      <div className={`transform ${isOpenGenre ? "translate-x-0" : "translate-x-full"} transition absolute top-0 left-0 overflow-y-auto w-72 h-screen min-h-screen bg-white`}>
        <div className="flex justify-start items-center w-full p-4 bg-gray-100 cursor-pointer" onClick={() => setOpenGenre(false)}>
          <Icon icon="ri:arrow-left-s-line" className="text-lg" />
          <span className="ml-4">Menu</span>
        </div>
        <ul>
          {genre.data.map((item: IGenre, i) => <li key={i}>
            <Link to={`/the-loai-${item.id}-${item.titleSlug}.html`} className="block px-4 py-2">
              {item.title}
            </Link>
          </li>)}
        </ul>
      </div>
    </nav>
  );
}

function MenuDrawer() {
  return(
    <Drawer
      className="bg-white"
      overlay={(isOpen) => <MenuContent isDrawerOpen={isOpen} />}
    >
      <div className="h-14 select-none">
        <div className="inline-flex justify-center items-center cursor-pointer h-10 my-2 px-3">
          <Icon icon="ic:round-dehaze" className="text-2xl" />
        </div>
      </div>
    </Drawer>
  );
}

export default MenuDrawer;
