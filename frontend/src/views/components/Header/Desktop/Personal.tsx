import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IAppState } from 'interfaces';
import Dropdown from 'views/components/Dropdown';
import Avatar from 'views/components/Avatar';
import { Paper } from '@material-ui/core';
import { logout } from 'stores/auth/actions';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';


const menu = [
  [
    { title: 'Truyện đang theo dõi', url: '', icon: '' },
    { title: 'Lịch sử đọc truyện', url: '', icon: '' },
    { title: 'Tìm kiếm nâng cao', url: '', icon: '' },
    
  ],
  [
    { title: 'Quản lý tài khoản', url: '', icon: '' },
    { title: 'Thông báo', url: '', icon: '' },
    { title: 'Cài đặt', url: '', icon: '' }
  ]
];

const Personal = function() {
  const { auth } = useSelector((store: IAppState) => store);
  const dispatch = useDispatch();

  if (auth.isLoading) {
    return(
      <div className="ml-2 text-sm font-bold">
        <AiOutlineLoading3Quarters className="inline-block animate-spin" />
        <span className="ml-2" >Processing</span>
      </div>
    );
  }

  if (!auth.isLoggedIn) {
    return(
      <React.Fragment>
        <div className="ml-2 text-sm font-bold">
          <Link to="/dang-nhap.html" className="inline-flex items-center h-10 px-3 border border-black hover:bg-gray-100 transition duration-100">
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
      overlay={<Paper className="animate-pop-in mt-1 text-sm" variant="outlined" square >
        <div className="w-60 shadow divide-y z-30 select-none">
          <Link to="/" className="flex items-center p-4">
            <Avatar size="lg" src="" alt="Viet Hoang" />
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
              <Link to={item.url} className="block px-4 py-2 hover:text-blue-700 transition duration-100">
                {item.title}
              </Link>
            </li>)}
          </ul>)}
          <div className="block p-4 cursor-pointer hover:text-blue-700 transition duration-100" onClick={() => dispatch(logout())}>
            Đăng xuất
          </div>
        </div>
      </Paper>}
    >
      <div className="h-18 select-none">
        <div className="inline-flex justify-center items-center cursor-pointer h-12 my-3 px-3 hover:text-blue-700 transition duration-100">
          <Avatar size="sm" src="" alt="Viet Hoang" />
        </div>
      </div>
    </Dropdown>
  );
}

export default Personal;