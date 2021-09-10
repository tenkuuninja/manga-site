import React from 'react';
import RcTrigger from 'rc-trigger';
import {
  Paper
} from '@material-ui/core';

const Category = function() {
  return(
    <RcTrigger
      popupPlacement="bottomLeft"
      action={['hover']}
      builtinPlacements={{
        bottomLeft: {
          points: ['tl', 'bl'],
        },
      }}
      popup={<Paper className="animate-pop-in mt-1" variant="outlined" square >abc</Paper>}
    >
      <div className="h-18">
        <div className="inline-flex justify-center items-center cursor-pointer h-12 my-3 px-3">
          <span>Thể loại</span>
        </div>
      </div>
    </RcTrigger>
  );
}

export default Category;