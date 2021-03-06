import React, { useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState, IManga } from 'interfaces';
import { debounce } from 'utils/helper';
import { fetchAutoComplete } from 'stores/common/actions';
import { AutoCompleteSkeleton } from '../Desktop/Skeleton';
import { countryType } from 'utils/static';

const Search = function() {
  const { autoComplete } = useSelector((store: IAppState) => store.common);
  const dispatch = useDispatch();
  const history = useHistory();
  const [isOpenSearch, setOpenSearch] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  const searchRef = useRef(debounce(function(text: string) {
    if (text.length > 0) {
      dispatch(fetchAutoComplete(text.replace(' ', '+')));
    }
  }, 300));

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    redirectToSearchPage();
  }
  
  function redirectToSearchPage() {
    if (text.length > 0) {
      setOpenSearch(false);
      history.push('/tim-kiem.html?q='+text.replace(' ', '+'));
    }
  }

  function handleSearchTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    let { value } = e.target;
    setText(value);
    searchRef.current(value);
  }

  let autoCompleteContent;

  if (autoComplete.isLoading || autoComplete.isError) {
    autoCompleteContent = <AutoCompleteSkeleton />
  } else {
    autoCompleteContent = <ul className="p-2 overflow-y-auto h-screen pb-24">
      {autoComplete.data.map((item: IManga, i) => <li key={i}>
        <Link to={`/truyen-tranh-${item.id}-${item.titleSlug}.html`} className="block">
          <div className='flex overflow-hidden space-x-2 p-2'>
            <div className='flex-shrink-0 overflow-hidden rounded-lg w-12 h-12'>
              <img className='w-full' src={item.imageUrl} alt='' />
            </div>
            <div className='flex-grow relative'>
              <p className='truncate ... font-semibold text-base leading-5'>{item.title}</p>
              <p className='absolute bottom-0 text-sm opacity-80'>
                <span className="text-red-600">{countryType[item.country || 'jp'].title}</span>&nbsp;&nbsp;
                {item.genres !== undefined && <span className="text-primary-600">
                  {item.genres[0]?.title || ''}  {item.genres[1]?.title || ''}
                </span>}
              </p>
            </div>
          </div>
        </Link>
      </li>)}
    </ul>
  }

  return(
    <div>
      <div className="h-14 select-none" onClick={() => setOpenSearch(true)}>
        <div className="inline-flex justify-center items-center cursor-pointer h-10 my-2 px-3">
          <Icon icon="ic:round-search" className="text-2xl" />
        </div>
      </div>
      <form 
        className={`${isOpenSearch ? "flex" : "hidden"} items-center h-14 fixed top-0 inset-x-0 bg-white z-10`}
        onSubmit={onSearch}
      >
        <div className="mx-3 text-2xl" onClick={() => setOpenSearch(false)}>
          <Icon icon="ic:round-close" className="text-2xl" />
        </div>
        <input 
          className="flex-grow outline-none text-base mx-1" 
          placeholder="Nh???p t??n truy???n..." 
          onChange={handleSearchTextChange}
          onKeyPress={(e) => {
            if (e.code === "Enter") {
              redirectToSearchPage();
            }
          }}
        />
        <div className={`absolute border border-black border-opacity-10 h-screen pb-14 bg-white top-14 inset-x-0 z-50`}>
          {text.length > 0 && <p className="text-lg font-semibold px-4 pt-4">K???t qu??? t??m ki???m</p>}
          {text.length > 0 && autoCompleteContent}
        </div>
        <button type="submit" className="mx-3 text-2xl">
          <Icon icon="ic:round-search" className="text-2xl" />
        </button>
      </form>
    </div>
  );
}

export default Search;
