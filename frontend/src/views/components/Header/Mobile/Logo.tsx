import React from 'react';
import { Link } from 'react-router-dom';

const Logo = function() {
  return(
    <Link to="/" className="mr-2" >
      <img src="https://via.placeholder.com/110x40" alt="logo" />
    </Link>
  );
}

export default Logo;
