import { Icon } from '@iconify/react';
import { IAppState } from 'interfaces';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import Select from 'react-select';
import qs from 'query-string';

interface IOption {
  label: string;
  value: string;
}

const countrySelect = [
  { label: 'Tất cả', value: '' },
  { label: 'Nhật Bản', value: 'jp' },
  { label: 'Hàn Quốc', value: 'kr' },
  { label: 'Tàu khựa', value: 'cn' },
]
const chapterSelect = [
  { label: 'Tất cả', value: '0' },
  { label: 'Trên 50 chương', value: '50' },
  { label: 'Trên 100 chương', value: '100' },
  { label: 'Trên 200 chương', value: '200' },
  { label: 'Trên 300 chương', value: '300' },
  { label: 'Trên 400 chương', value: '400' },
  { label: 'Trên 500 chương', value: '500' },
]
const finishSelect = [
  { label: 'Tất cả', value: '' },
  { label: 'Chưa hoàn thành', value: '0' },
  { label: 'Đã hoàn thành', value: '1' },
]
const sortSelect = [
  { label: 'Cập nhật', value: '0' },
  { label: 'Ngày đăng', value: '1' },
  { label: 'Lượt xem', value: '2' },
  { label: 'Lượt yêu thích', value: '3' },
]

const icons = [
  { name: '', className: 'border border-transparent rounded-full' },
  { name: 'akar-icons:plus', className: 'border border-green-500 text-green-500 rounded-full' },
  { name: 'akar-icons:minus', className: 'border border-red-500 text-red-500 rounded-full' },
]

const FilterForm = () => {
  const { genres } = useSelector((store: IAppState) => store);
  const location = useLocation();
  const history = useHistory();
  const [isOpen, setOpen] = useState<boolean>(true);
  const [genreIndex, setGenreIndex] = useState<{ [k: number]: number }>({});
  const [countrySelected, setCountrySelected] = useState<IOption>(countrySelect[0]);
  const [chapterSelected, setChapterSelected] = useState<IOption>(chapterSelect[0]);
  const [finishSelected, setFinishSelected] = useState<IOption>(finishSelect[0]);
  const [sortSelected, setSortSelected] = useState<IOption>(sortSelect[0]);
  const search = qs.parse(location.search);

  
  function handleChooseGenre(genreId: number = 0) {
    setGenreIndex(e => ({ ...e, [genreId]: (e[genreId]+1)%3 }));
  }

  function handleSearch() {
    let searchObj: any = {}
    let genre = Object.entries(genreIndex).filter(item => item[1] === 1).map(item => item[0]);
    let notgenre = Object.entries(genreIndex).filter(item => item[1] === 2).map(item => item[0]);
    if (genre.length > 0) searchObj.g = genre.join(',');
    if (notgenre.length > 0) searchObj.ng = notgenre.join(',');
    if (countrySelected.value !== '') searchObj.c = countrySelected.value;
    if (chapterSelected.value !== '0') searchObj.mc = chapterSelected.value;
    if (finishSelected.value !== '') searchObj.f = finishSelected.value;
    if (sortSelected.value !== '0') searchObj.s = sortSelected.value;
    let search = qs.stringify(searchObj);
    console.log(search)
    history.push(location.pathname+'?'+search);
  }

  useEffect(function() {
    let { g = '', ng = '' } = search;
    setGenreIndex(
      genres.data.reduce((acc: { [k: number]: number }, cur) => { 
        acc[cur.id||0] = 0;
        if (typeof g === 'string' && /^\d+(,\d+)*$/g.test(g)) {
          if (g.split(',').includes(`${cur?.id}`)) acc[cur.id||0] = 1;
        }
        if (typeof ng === 'string' && /^\d+(,\d+)*$/g.test(ng)) {
          if (ng.split(',').includes(`${cur?.id}`)) acc[cur.id||0] = 2;
        }
        return acc;
      }, {})
    );
    // eslint-disable-next-line
  }, [genres.data.length]);

  useEffect(function() {
    if (search.g || search.ng || search.c || search.mc || search.f || search.s) {
      setOpen(false);
    }
    // eslint-disable-next-line
  }, []);

  if (genres.isLoading) return <></>;

  return (
    <div className="my-6">
      <div className="mx-auto text-white text-center font-semibold " >
        <span 
          className={`inline-block mx-auto py-2 px-4 ${isOpen ? "bg-red-500 hover:bg-red-600" : "bg-primary-500 hover:bg-primary-600"} transition cursor-pointer`}
          onClick={() => setOpen(v => !v)}
        >
          {isOpen ? 'Ẩn' : 'Hiện'} form tìm kiếm
        </span>
      </div>
      <div className={`space-y-6 ${isOpen ? '' : 'hidden'}`}>
        <div>
          <h3 className="text-lg font-bold mb-1">Thể loại</h3>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1">
            {genres.data.map((genre, i) => <li key={i} onClick={() => handleChooseGenre(genre?.id)}>
              <div className={`inline-block px-2 transition cursor-pointer select-none ${icons?.[genreIndex?.[genre?.id||0]||0].className}`}>
                <Icon className="" icon={icons?.[genreIndex?.[genre?.id||0]||0].name} />
                <span className="ml-1 leading-4">{genre.title}</span>
              </div>
            </li>)}
          </ul>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20">
          <div>
            <p className="text-lg font-bold mb-1">Quốc gia</p>
            <Select
              options={countrySelect}
              value={countrySelected}
              getOptionLabel={(e) => e.label}
              getOptionValue={(e) => e.value}
              onChange={(e) => setCountrySelected(e as IOption)}
              />
          </div>
          <div>
            <p className="text-lg font-bold mb-1">Số chương</p>
            <Select
              options={chapterSelect}
              value={chapterSelected}
              getOptionLabel={(e) => e.label}
              onChange={(e) => setChapterSelected(e as IOption)}
              />
          </div>
          <div>
            <p className="text-lg font-bold mb-1">Trạng thái</p>
            <Select
              options={finishSelect}
              value={finishSelected}
              getOptionLabel={(e) => e.label}
              onChange={(e) => setFinishSelected(e as IOption)}
              />
          </div>
          <div>
            <p className="text-lg font-bold mb-1">Sắp xếp theo</p>
            <Select
              options={sortSelect}
              value={sortSelected}
              getOptionLabel={(e) => e.label}
              onChange={(e) => setSortSelected(e as IOption)}
              />
          </div>
        </div>
        <div className="mx-auto text-white text-center font-semibold " >
          <span className="inline-block mx-auto py-2 px-6 bg-primary-500 hover:bg-primary-600 transition cursor-pointer" onClick={handleSearch}>
            Tìm kiếm
          </span>
        </div>
      </div>
    </div>
  );
}

export default FilterForm;

