import { lazy } from 'react';
import { RouteProps } from 'react-router-dom';
const HomePageComponent = lazy(() => import('views/HomePage'));
const MangaListPageComponent = lazy(() => import('views/ListPage'));
const MangaDetailPageComponent = lazy(() => import('views/MangaDetailPage'));
const MangaChapterPageComponent = lazy(() => import('views/MangaChapterPage'));
const LoginPageComponent = lazy(() => import('views/LoginPage'));
const RegisterPageComponent = lazy(() => import('views/RegisterPage'));

interface RouteCustomProps extends RouteProps {
  guard?: string
}

const navigation: RouteCustomProps[] =  [
  {
    path: '/',
    exact: true,
    component: HomePageComponent,
    guard: 'none'
  },
  {
    path: [
      '/truyen-moi-cap-nhat.html',
      '/truyen-tranh-moi.html',
      '/truyen-da-hoan-thanh.html',
      '/top-truyen-yeu-thich.html',
      '/top-truyen-tranh.html',
      '/top-thang.html',
      '/top-tuan.html',
      '/top-ngay.html',
      '/truyen-dang-theo-doi.html',
      '/lich-su-doc-truyen.html',
      '/tim-kiem.html',
      '/tim-kiem-nang-cao.html',
      '/quoc-gia-:countrySlug([a-z-]+).html',
      '/the-loai-:genreId(\\d+)-:genreSlug([a-z-]+).html',
    ],
    exact: true,
    component: MangaListPageComponent,
    guard: 'none'
  },
  {
    path: '/truyen-tranh-:mangaId(\\d+)-:mangaSlug([a-z0-9-]+).html',
    exact: true,
    component: MangaDetailPageComponent,
    guard: 'none'
  },
  {
    path: '/doc-truyen-:mangaId(\\d+)-:chapterId(\\d+)-:mangaSlug([a-z0-9-]+)-chap-:chapterNumber([0-9]+-?[0-9]{0,2}).html',
    exact: true,
    component: MangaChapterPageComponent,
    guard: 'none'
  },
  {
    path: '/dang-nhap.html',
    exact: true,
    component: LoginPageComponent,
    guard: 'none'
  },
  {
    path: '/dang-ky-tai-khoan.html',
    exact: true,
    component: RegisterPageComponent,
    guard: 'none'
  }
]

export default navigation;
