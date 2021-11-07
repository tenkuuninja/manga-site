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
      <div className={`fixed inset-0 bg-black transition-opacity pointer-events-none ${isOpen ? 'opacity-80 pointer-events-auto' : 'opacity-0'}`} onClick={handleOutsideClick}></div>
      <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scrollbar-hidden overflow-y-auto max-h-full pointer-events-none ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 invisible'}`}>
        <div className="animate-pop-in ">
          {children}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Modal;
