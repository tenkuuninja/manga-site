import React from 'react';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { red, pink, deepPurple, indigo, blue, cyan, teal, green, deepOrange, brown, grey, blueGrey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  xs: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: theme.spacing(1.5)
  },
  sm: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    fontSize: theme.spacing(2)
  },
  md: {},
  lg: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    fontSize: theme.spacing(3)
  },
  xl: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    fontSize: theme.spacing(4)
  },
  black: {
    color: theme.palette.getContrastText('#000'),
    backgroundColor: '#000',
  },
  red: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
  },
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  indigo: {
    color: theme.palette.getContrastText(indigo[500]),
    backgroundColor: indigo[500],
  },
  green: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
  },
  blue: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
  },
  cyan: {
    color: theme.palette.getContrastText(cyan[500]),
    backgroundColor: cyan[500],
  },
  teal: {
    color: theme.palette.getContrastText(teal[500]),
    backgroundColor: teal[500],
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  brown: {
    color: theme.palette.getContrastText(brown[500]),
    backgroundColor: brown[500],
  },
  grey: {
    color: theme.palette.getContrastText(grey[500]),
    backgroundColor: grey[500],
  },
  blueGrey: {
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: blueGrey[500],
  },
}));

const colors = ['black', 'red', 'pink', 'purple', 'indigo', 'blue', 'cyan', 'teal', 'green', 'orange', 'brown', 'grey', 'blueGrey'] as const;
type color = typeof colors[number];
type size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface AvatarProps {
  src: string,
  alt?: string,
  className?: string,
  letter?: boolean,
  color?: color,
  size?: size,
  border?: boolean,
  randomColor?: boolean
}

function toCharName(s: string) {
  s = s.trim().replace(/\s+/g, ' ')
	if (s.length === 0) return 'AA';
	s = s.split(' ').filter((item, i) => i<2).map(item => item[0]).join('').toUpperCase();
  return s;
}

const MyAvatar = function(props: AvatarProps) {
  const classes = useStyles();
  let { src, alt = '', letter = true, color = 'black', size = 'md', border = false, randomColor = false, className = ''} = props
  if (randomColor) {
    color = colors[Math.floor(Math.random()*(colors.length-1))]
  }
  
  return( 
    <Avatar alt={alt} src={src} className={`${classes[size]} ${classes[color]} ${border && 'border border-gray-300'} font-bold ${className}`} >
      {(letter || !src) && toCharName(alt || '')} 
    </Avatar>
  );
}

export default MyAvatar;
