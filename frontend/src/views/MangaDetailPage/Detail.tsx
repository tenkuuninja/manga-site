import React from 'react';
import { IAppState } from 'interfaces';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { countryType } from 'utils/static';
import { 
  Rating,
  Breadcrumbs,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { DetailSkeleton } from './Skeleton';

interface IDetailProps {
  handleFollow: () => void;
  handleIncreaseFavorite: () => void;
}

const Detail = (props: IDetailProps) => {
  const manga = useSelector((store: IAppState) => store.manga);

  const { 
    title, 
    titleSynonym, 
    description, 
    imageUrl,
    favorite, 
    isFinish, 
    country, 
    chapter, 
    author, 
    rate, 
    view, 
    isFollowing, 
    genres, 
    updatedAt 
  } = manga.data;

  const rateCount = rate === undefined ? 1 : [1,2,3,4,5].reduce((prev, curr) => {
    return prev += (rate[curr as keyof typeof rate] || 0) * curr;
  }, 0);

  if (manga.isLoading || manga.isError) {
    return (<DetailSkeleton />);
  }

  return (
    <React.Fragment>
      <section>
        <div className='lg:hidden w-52 mx-auto mb-4 -mt-32 p-2 rounded-sm bg-white'>
          <div className='overflow-hidden relative bg-no-repeat bg-center bg-cover border border-black border-opacity-20' style={{ paddingTop: '133%', backgroundImage: `url(https://img.idesign.vn/2018/10/23/id-loading-1.gif)` }}>
            <img className="absolute top-0 object-cover w-full h-full" src={imageUrl} alt=" " />
          </div>
        </div>
        <div className='space-y-1'>
        <Breadcrumbs className="mb-2 text-sm font-bold" >
          <Link to="/" className="flex items-center">
            <Icon icon="bx:bx-home" className="mr-1 text-base" />
            Trang chủ
          </Link>
          <Link to="/truyen-moi-cap-nhat.html" className="flex items-center">
            <Icon icon="bi:grid-3x3-gap-fill" className="mr-1 text-base" />
            Danh sách
          </Link>
          <p className="truncate cursor-pointer text-gray-600">
            {title}
          </p>
        </Breadcrumbs>
          <h1 className='text-4xl font-black py-1'>{title}</h1>
          {titleSynonym?.length ? <p className='text-xl font-light'>{titleSynonym.join(', ')}</p> : null}
          <div className='flex items-center space-x-2'>
            <Rating readOnly value={rate?.all || 5} />
            ({rateCount})
          </div>
          <p className='space-x-2'>
            <span className='inline-block'><Icon icon="grommet-icons:update" /></span>
            <span>Cập nhật từ {(updatedAt)}</span>
          </p>
          <p className=''><Icon icon="bi:book" /> {chapter} chương &bull; {isFinish ? 'Đã hoàn thành' : 'Đang cập nhật'}</p>
          <p className='space-x-4'>
            <span><Icon icon="bi:eye" /> {view}</span>
            <span><Icon icon="bi:heart" /> {favorite}</span>
          </p>
          {author?.length ? <p>Tác giả: {author.join(', ')}</p> : null}
          <ul className='text-sm font-medium space-x-1'>
            <li className='inline-block py-2 pr-1 text-red-500 hover:text-red-600'>
              <Link className='block' to={`/quoc-gia-${countryType[country as keyof typeof countryType || 'jp'].slug}.html`}>
                {countryType[country as keyof typeof countryType || 'jp'].title}
              </Link>
            </li>
            {genres?.map(genre => <li className='inline-block py-2 px-1 text-blue-500 hover:text-blue-600' key={genre.id}>
              <Link className='block' to={`/the-loai-${genre.id}-${genre.titleSlug}.html`}>
                {genre.title}
              </Link>
            </li>)}
          </ul>
          <p>{description}</p>
          <ul className='block font-medium pt-2'>
            <li className='inline-block px-4 py-1 bg-green-500 hover:bg-green-600 text-white rounded-2xl mr-1 mt-1'>
              <Link className='block' to={`/the-loai-.html`}> Đọc từ đầu</Link>
            </li>
            <li 
              className='inline-block px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl mr-1 mt-1 cursor-pointer' 
              onClick={props.handleFollow}
            >
              <span className='block'>{!isFollowing ? 'Theo dõi' : 'Hủy Theo dõi'}</span>
            </li>
            <li 
              className='inline-block px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded-2xl mr-1 mt-1 cursor-pointer' 
              onClick={props.handleIncreaseFavorite}
            >
              <span className='block'> Thích</span>
            </li>
          </ul>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Detail
