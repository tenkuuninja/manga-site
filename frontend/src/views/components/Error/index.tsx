import React from 'react';
import { useHistory } from 'react-router';

const Error = () => {
  const history = useHistory();
  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center space-y-4">
        <p className="text-8xl font-extrabold text-gray-700">OOPS!</p>
        <p className="text-3xl font-semibold text-gray-500">Có gì đó không ổn</p>
        <p className="inline-block text-xl text-blue-500 border border-blue-400 rounded py-1 px-4 cursor-pointer" onClick={() => history.go(0)}>Tải lại trang</p>
      </div>
    </div>
  );
}

export default Error;
