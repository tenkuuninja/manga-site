import React, { useEffect, useRef } from 'react';
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

  const handleMouseIn = (e: React.MouseEvent) => {
    wrapperRef.current?.classList.add(st.active)
    contentRef.current?.classList.add(st['pop-in'])
  }
  
  const handleMouseOut = (e: React.MouseEvent) => {
    wrapperRef.current?.classList.remove(st.active)
    contentRef.current?.classList.remove(st['pop-in'])
  }
  
  useEffect(function() {
    if (wrapperRef.current) {
      switch (placement) {
        case 'top':
          wrapperRef.current.style.top = `${(triggerRef.current?.offsetTop||0)-(wrapperRef.current?.offsetHeight||0)}px`;
          wrapperRef.current.style.left = `${(triggerRef.current?.offsetLeft||0)+(triggerRef.current?.offsetWidth||0)/2-(wrapperRef.current?.offsetWidth||0)/2}px`;
          break;
        case 'topLeft':
          wrapperRef.current.style.top = `${(triggerRef.current?.offsetTop||0)-(wrapperRef.current?.offsetHeight||0)}px`
          wrapperRef.current.style.left = `${(triggerRef.current?.offsetLeft||0)}px`
          break;
        case 'topRight':
          wrapperRef.current.style.top = `${(triggerRef.current?.offsetTop||0)-(wrapperRef.current?.offsetHeight||0)}px`
          wrapperRef.current.style.left =`${(triggerRef.current?.offsetLeft||0)+(triggerRef.current?.offsetWidth||0)-(wrapperRef.current?.offsetWidth||0)}px`
          break;
        case 'bottom':
          wrapperRef.current.style.top = `${(triggerRef.current?.offsetTop||0)+(triggerRef.current?.offsetHeight||0)}px`
          wrapperRef.current.style.left =`${(triggerRef.current?.offsetLeft||0)+(triggerRef.current?.offsetWidth||0)/2-(wrapperRef.current?.offsetWidth||0)/2}px`
          break;
        case 'bottomLeft':
          wrapperRef.current.style.top = `${(triggerRef.current?.offsetTop||0)+(triggerRef.current?.offsetHeight||0)}px`
          wrapperRef.current.style.left = `${(triggerRef.current?.offsetLeft||0)}px`
          break;
        case 'bottomRight':
          wrapperRef.current.style.top = `${(triggerRef.current?.offsetTop||0)+(triggerRef.current?.offsetHeight||0)}px`
          wrapperRef.current.style.left = `${(triggerRef.current?.offsetLeft||0)+(triggerRef.current?.offsetWidth||0)-(wrapperRef.current?.offsetWidth||0)}px`
          break;
        case 'left':
          wrapperRef.current.style.top = `${(triggerRef.current?.offsetTop||0)+(triggerRef.current?.offsetHeight||0)/2-(wrapperRef.current?.offsetHeight||0)/2}px`
          wrapperRef.current.style.left = `${(triggerRef.current?.offsetLeft||0)-(wrapperRef.current?.offsetWidth||0)}px`
          break;
        case 'right':
          wrapperRef.current.style.top = `${(triggerRef.current?.offsetTop||0)+(triggerRef.current?.offsetHeight||0)/2-(wrapperRef.current?.offsetHeight||0)/2}px`
          wrapperRef.current.style.left = `${(triggerRef.current?.offsetLeft||0)+(triggerRef.current?.offsetWidth||0)}px`
          break;
      
        default:
          break;
      }
    }
    // eslint-disable-next-line
  }, [placement]);

  useEffect(function() {
    if (contentRef.current) {
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
  }, [spacing]);

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
