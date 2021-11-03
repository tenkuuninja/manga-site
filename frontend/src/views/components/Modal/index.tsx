import React from 'react';

interface ModalProps {
  isOpen?: boolean
  children?: any
  handleOutsideClick?: () => void
}

const ModalDefault: ModalProps = {
  isOpen: false,
  children: <></>,
  handleOutsideClick: () => {}
}

const Modal = (props: ModalProps = ModalDefault) => {
  const { isOpen, children, handleOutsideClick } = props;
  return (
    <React.Fragment>
      <div className={`fixed inset-0 bg-black opacity-0 transition-opacity pointer-events-none ${isOpen ? 'opacity-80 pointer-events-auto' : ''}`} onClick={handleOutsideClick}></div>
      <div className={`fixed scrollbar-hidden animate-pop-in top-1/2 left-1/2 opacity-0 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none max-h-full overflow-y-auto ${isOpen ? 'opacity-100 pointer-events-auto' : ''}`}>
        {children}
      </div>
    </React.Fragment>
  );
}

export default Modal;
