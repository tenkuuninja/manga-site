import { RouteProps } from 'react-router-dom';
import HomePage from 'views/HomePage';

interface RouteCustomProps extends RouteProps {
  guard?: string
}

const navigation: RouteCustomProps[] =  [
  {
    path: '/',
    exact: true,
    component: HomePage,
    guard: 'none'
  }
]

export default navigation;
