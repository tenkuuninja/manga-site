import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IAppState } from 'interfaces';
import Dropdown from 'views/components/Dropdown';
import Avatar from 'views/components/Avatar';
import { logout } from 'stores/auth/actions';
import { Icon } from '@iconify/react';


const menu = [
  [
    { title: 'Truyện đang theo dõi', url: '/truyen-dang-theo-doi.html', icon: '' },
    { title: 'Lịch sử đọc truyện', url: '/lich-su-doc-truyen.html', icon: '' },
    { title: 'Tìm kiếm nâng cao', url: '/tim-kiem-nang-cao.html', icon: '' },
    
  ],
  [
    { title: 'Quản lý tài khoản', url: '/tai-khoan/quan-ly-ho-so.html', icon: '' },
    { title: 'Thông báo', url: '/tai-khoan/quan-ly-thong-bao.html', icon: '' },
    // { title: 'Cài đặt', url: '', icon: '' },
  ]
];

const Personal = function() {
  const { auth } = useSelector((store: IAppState) => store);
  const dispatch = useDispatch();

  if (auth.isLoading) {
    return(
      <div className="ml-2 text-sm font-bold">
        <Icon icon="eos-icons:bubble-loading" />
        <span className="ml-2" >Processing</span>
      </div>
    );
  }

  if (!auth.isLoggedIn) {
    return(
      <React.Fragment>
        <div className="ml-2 text-sm font-bold">
          <Link to="/dang-nhap.html" className="inline-flex items-center h-10 px-3 border border-black hover:bg-gray-100 transition">
            Đăng nhập
          </Link>
        </div>
        <div className="ml-2 text-sm font-bold">
          <Link to="/dang-ky-tai-khoan.html" className="inline-flex items-center h-10 border px-5 border-black bg-black text-white">
            Đăng ký
          </Link>
        </div>
      </React.Fragment>
    );
  }

  return(
    <Dropdown
      placement="bottom-right"
      overlay={<div className="animate-pop-in bg-white border border-gray-200 mt-1 text-sm" >
        <div className="w-60 shadow divide-y z-30 select-none">
          <Link to="/tai-khoan/quan-ly-ho-so.html" className="flex items-center p-4">
            <Avatar size="lg" src={auth.user?.avatar || ''} alt={auth.user?.username} />
            <div className="flex-grow pl-2 overflow-hidden">
              <span className="truncate-lines line-clamp-1 text-lg font-bold">
                {auth.user?.username}
              </span>
              <span className="text-xs" style={{ color: auth.user?.role?.color }}>
                {auth.user?.role?.name}
              </span>
            </div>
          </Link>
          {menu.map((typeItem, i) => <ul key={i} className="py-2">
            {typeItem.map((item, j) => <li key={j} >
              <Link to={item.url} className="block px-4 py-2 hover:text-primary-600 transition duration-100">
                {item.title}
              </Link>
            </li>)}
          </ul>)}
          <div className="block p-4 cursor-pointer hover:text-primary-600 transition" onClick={() => dispatch(logout())}>
            Đăng xuất
          </div>
        </div>
      </div>}
    >
      <div className="h-18 select-none">
        <div className="inline-flex justify-center items-center cursor-pointer h-12 my-3 px-3 hover:text-primary-600 transition">
          <Avatar src={auth.user?.avatar || ''} alt={auth.user?.username} />
        </div>
      </div>
    </Dropdown>
  );
}

export default Personal;