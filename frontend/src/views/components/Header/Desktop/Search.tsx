import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { MdSearch } from 'react-icons/md';
import { suggestPlaceholder, countryType } from 'utils/static';
import { debounce } from 'utils/helper';
import axios, { CancelToken } from 'axios';
import { fetchAutoComplete } from 'stores/common/actions';
import { IAppState, IManga } from 'interfaces';

const Search = function() {
  const { autoComplete } = useSelector((store: IAppState) => store.common);
  const dispatch = useDispatch();
  const [text, setText] = useState<string>('');
  const [isAutoComplete, setAutoComplete] = useState<boolean>(false);
  const [placeholder, setPlaceholder] = useState<string>('Nhập tên truyện...');
  const formRef = useRef<HTMLFormElement>(null);

  const search = debounce(function(text: string, cancelToken: CancelToken) {
    if (text.length > 0) {
      dispatch(fetchAutoComplete(text.replace(' ', '+'), cancelToken));
    }
  }, 800);

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
  }

  function closeAutoComplete(e: MouseEvent) {
    if (e.target !== formRef.current  && !formRef.current?.contains(e.target as Node)) {
      setAutoComplete(false);
    }
  }

  useEffect(function() {
    const myRequest = axios.CancelToken.source();
    search(text, myRequest.token);
    return myRequest.cancel;
  }, [text]);

  useEffect(function() {
    window.addEventListener('click', closeAutoComplete);
    const autoChangePlaceholder = setInterval(function() {
      // auto change placeholder
      if (text.length === 0) {
        let index = Math.floor(Math.random()*suggestPlaceholder.length);
        setPlaceholder(suggestPlaceholder[index]);
      }
    }, 5000)
    return () => {
      window.removeEventListener('click', closeAutoComplete);
      clearInterval(autoChangePlaceholder);
    }
    // eslint-disable-next-line
  }, []);

  return(
    <form 
      ref={formRef}
      className="flex-grow flex items-center relative h-12 mx-8 border border-black rounded-full"
      onSubmit={onSearch}
    >
      <input 
        className="flex-grow outline-none ml-4 mr-1" 
        placeholder={placeholder}
        onChange={(e) => setText(e.target.value)}
        onClick={() => setAutoComplete(true)}
      />
      <div className={`absolute ${isAutoComplete ? "block" : "hidden"} border border-black border-opacity-10 bg-white top-12 left-0 right-0 mt-1`}>
        <p className="text-lg font-semibold px-4 pt-4 pb-1">Kết quả tìm kiếm</p>
        <ul className="p-2">
          {autoComplete.payload.map((item: IManga, i) => <li key={i}>
            <Link to={``} className="block">
              <div className='flex overflow-hidden space-x-2 p-2'>
                <div className='flex-shrink-0 overflow-hidden rounded-lg w-12 h-12'>
                  <img className='w-full' src={item.imageUrl} alt='' />
                </div>
                <div className='flex-grow relative'>
                  <p className='truncate ... font-semibold text-base leading-5'>{item.title}</p>
                  <p className='absolute bottom-0 text-sm opacity-80'>
                    <span className="text-red-600">{countryType[item.country || 'jp'].title}</span>&nbsp;&nbsp;
                    {item.genres !== undefined && <span className="text-blue-600">
                      {item.genres[0]?.title || ''}  {item.genres[1]?.title || ''}
                    </span>}
                  </p>
                </div>
              </div>
            </Link>
          </li>)}
        </ul>
      </div>
      <button className="mx-3 text-2xl"><MdSearch /></button>
    </form>
  );
}

export default Search;
