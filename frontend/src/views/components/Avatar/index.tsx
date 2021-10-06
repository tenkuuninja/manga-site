import React from 'react';
import { Avatar } from '@mui/material';

function toCharName(s: string) {
  s = s.trim().replace(/\s+/g, ' ')
	if (s.length === 0) return 'AA';
	s = s.split(' ').filter((item, i) => i<2).map(item => item[0]).join('').toUpperCase();
  return s;
}

// https://mui.com/components/avatars/
function stringToColor(string: string) {
  let hash = 0;
  let i;
  
  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */
  
  return color;
}

const sizeAvatar = {
  sm: 24,
  md: 42,
  lg: 56
}

interface AvatarProps {
  src: string,
  alt?: string,
  className?: string,
  letter?: boolean,
  size?: keyof typeof sizeAvatar,
  border?: boolean,
  randomColor?: boolean
}

const MyAvatar = function(props: AvatarProps) {
  let { src, alt = '', letter = true, size = 'md',  border = false, className = ''} = props

  return( 
    <Avatar 
      alt={alt} 
      src={src} 
      sx={{
        bgcolor: stringToColor(alt),
        width: sizeAvatar[size],
        height: sizeAvatar[size]
      }} 
      className={`${border && 'border border-gray-300'} font-bold ${className}`} 
    >
      {(letter || !src) && toCharName(alt || '')} 
    </Avatar>
  );
}

export default MyAvatar;
