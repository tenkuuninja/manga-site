import { useWindowSize } from 'hooks';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import st from './popup.module.css';

type place = 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'right'

interface PopupHoverProps {
  overlay: JSX.Element,
  children: any,
  placement?: place,
  spacing?: number
}

function PopupHover({overlay, children, placement='bottomLeft', spacing = 0}: PopupHoverProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [width] = useWindowSize();

  const handleMouseIn = (e: React.MouseEvent) => {
    wrapperRef.current?.classList.add(st.active)
    contentRef.current?.classList.add(st['pop-in'])
    setOpen(true);
  }
  
  const handleMouseOut = (e: React.MouseEvent) => {
    wrapperRef.current?.classList.remove(st.active)
    contentRef.current?.classList.remove(st['pop-in'])
    setOpen(false);
  }
  
  useEffect(function() {
    if (wrapperRef.current && triggerRef.current) {
      let triggerClient = triggerRef.current.getBoundingClientRect();
      let wrapperClient = wrapperRef.current.getBoundingClientRect();
      switch (placement) {
        case 'top':
          wrapperRef.current.style.top = `${triggerClient.top-wrapperClient.height}px`;
          wrapperRef.current.style.left = `${triggerClient.left+triggerClient.width/2-wrapperClient.width/2}px`;
          break;
        case 'topLeft':
          wrapperRef.current.style.top = `${triggerClient.top-wrapperClient.height}px`
          wrapperRef.current.style.left = `${triggerClient.left}px`
          break;
        case 'topRight':
          wrapperRef.current.style.top = `${triggerClient.top-wrapperClient.height}px`
          wrapperRef.current.style.left =`${triggerClient.left+triggerClient.width-wrapperClient.width}px`
          break;
        case 'bottom':
          wrapperRef.current.style.top = `${triggerClient.top+triggerClient.height}px`
          wrapperRef.current.style.left =`${triggerClient.left+triggerClient.width/2-wrapperClient.width/2}px`
          break;
        case 'bottomLeft':
          wrapperRef.current.style.top = `${triggerClient.top+triggerClient.height}px`
          wrapperRef.current.style.left = `${triggerClient.left}px`
          break;
        case 'bottomRight':
          wrapperRef.current.style.top = `${triggerClient.top+triggerClient.height}px`
          wrapperRef.current.style.left = `${triggerClient.left+triggerClient.width-wrapperClient.width}px`
          break;
        case 'left':
          wrapperRef.current.style.top = `${triggerClient.top+triggerClient.height/2-wrapperClient.height/2}px`
          wrapperRef.current.style.left = `${triggerClient.left-wrapperClient.width}px`
          break;
        case 'right':
          wrapperRef.current.style.top = `${triggerClient.top+triggerClient.height/2-wrapperClient.height/2}px`
          wrapperRef.current.style.left = `${triggerClient.left+triggerClient.width}px`
          break;
      
        default:
          break;
      }
    }
    // eslint-disable-next-line
  }, [placement, width, isOpen]);

  useEffect(function() {
    if (contentRef.current) {
      contentRef.current.style.margin = '0'
      switch (placement) {
        case 'top':
        case 'topLeft':
        case 'topRight':
          contentRef.current.style.marginBottom = `${spacing}px`
          break;
        case 'bottom':
        case 'bottomLeft':
        case 'bottomRight':
          contentRef.current.style.marginTop = `${spacing}px`
          break;
        case 'left':
          contentRef.current.style.marginRight = `${spacing}px`
          break;
        case 'right':
          contentRef.current.style.marginLeft = `${spacing}px`
          break;
      
        default:
          break;
      }
    }
    // eslint-disable-next-line
  }, [spacing, placement, width]);

  return(
    <div ref={triggerRef} onMouseOver={handleMouseIn} onMouseOut={handleMouseOut} >
      {children}
      {createPortal(
        <div ref={wrapperRef} className={`${st.content}`} >
          <div ref={contentRef} >
            {overlay}
          </div>
        </div>
      , document.body)}
    </div>
  );
}

export default PopupHover;
