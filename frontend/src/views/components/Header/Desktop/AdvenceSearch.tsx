import React from 'react';
import { Link } from 'react-router-dom';

const AdvenceSearch = function() {

  return(
    <div className="h-18 select-none">
      <Link to="/tim-kiem-nang-cao.html">
        <div className="inline-flex justify-center items-center cursor-pointer h-12 my-3 px-3 hover:text-primary-600 transition duration-100">
          <span>Tìm kiếm nâng cao</span>
        </div>
      </Link>
    </div>
  );
}

export default AdvenceSearch;
