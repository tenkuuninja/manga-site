import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'views/components/Dropdown';
import {
  Paper
} from '@material-ui/core';


const AdvenceSearch = function() {

  return(
    <Dropdown
      placement="bottom-right"
      overlay={<Paper className="animate-pop-in mt-1 text-sm" variant="outlined" square >
        <div className="p-4 w-64">
          <p className="pb-5 text-xl text-center font-semibold">
            Lọc truyện dựa trên mong muốn của bạn
          </p>
          <Link 
            to="/tim-kiem-nang-cao.html" 
            className="block py-3 bg-black hover:opacity-80 text-lg text-center text-white font-semibold"
          >
            Tìm kiếm nâng cao
          </Link>
        </div>
      </Paper>}
    >
    <div className="h-18 select-none">
      <Link to="/tim-kiem-nang-cao.html">
        <div className="inline-flex justify-center items-center cursor-pointer h-12 my-3 px-3 hover:text-blue-700 transition duration-100">
          <span>Tìm kiếm nâng cao</span>
        </div>
      </Link>
    </div>
  </Dropdown>
  );
}

export default AdvenceSearch;
