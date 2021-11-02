import React, { useEffect } from 'react';
import { Icon } from '@iconify/react';
import { IAppState } from 'interfaces';
import { useSelector } from 'react-redux';
import { Link, Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';
import Notification from './Notification';
import Avatar from 'views/components/Avatar';

const menu = [
  { title: 'Quản lý hồ sơ', url:'/quan-ly-ho-so.html', icon: 'bx:bxs-user', component: EditProfile },
  { title: 'Đổi mật khẩu', url:'/doi-mat-khau.html', icon: 'bx:bxs-key', component: ChangePassword },
  { title: 'Thông báo', url:'/quan-ly-thong-bao.html', icon: 'bx:bxs-bell', component: Notification },
]

const ProfileManagePage = function() {
  const { isLoggedIn, isLoading, user } = useSelector((store: IAppState) => store.auth);
  const { path } = useRouteMatch();
  const { pathname } = useLocation();
  const history = useHistory();

  useEffect(function() {
    if (!isLoading && !isLoggedIn) {
      history.push('/');
    }
  }, [isLoading, isLoggedIn, history]);

  return (
    <div className={`md:flex container mx-auto my-4`}>
      <div className="p-4 md:w-60">
        <Avatar 
          src={user?.avatar||''} 
          alt={user?.username||'G'} 
          size="xxl" 
          className="mx-auto"
        />
        <p className="text-center text-xl font-semibold my-2">
          {user?.username}
        </p>
        <ul className="mt-4 md:h-64">
          {menu.map((item, i) => <li key={i} className={pathname === (path+item.url) ? 'text-blue-500' : ''}>
            <Link to={path+item.url} className="flex items-center px-4 py-2">
              <Icon icon={item.icon} className="mr-1 text-lg" />
              {item.title}
            </Link>
          </li>)}
        </ul>
      </div>
      <div className="flex-grow p-4">
        <Switch>
          {menu.map((item, i) => <Route exact path={path+item.url} key={i} component={item.component} />)}
          <Redirect to="/tai-khoan/quan-ly-ho-so.html"/>
        </Switch>
      </div>
    </div>
  );
}

export default ProfileManagePage;

