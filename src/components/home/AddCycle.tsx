import React from 'react';
import iconX from '../../assets/x.jpg';
import './styledAddFarm.css';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children : any;
}

export const AddCycle: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
  const outsideRef = React.useRef(null);

  const handleCloseOnOverlay = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === outsideRef.current) {
      onClose();
    }
  }

  return isOpen ? (
    <div className={'modal'}>
      <div
        ref={outsideRef}
        className={'modal__overlay'}
        onClick={handleCloseOnOverlay}
      />
      <div className={'modal__box'}>
        <button
          className={'modal__close'}
          onClick={onClose}
        >
          <img src={iconX} alt={'close'} />
        </button>
        <div className={'modal__title'}>
          {title}
        </div>
        <div className={'modal__content'}>
          { children }
        </div>
      </div>
    </div>
  ) : null;
};