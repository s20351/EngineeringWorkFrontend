import React, { useRef } from 'react';
import iconX from '../../assets/x.jpg';
import './styledAddFarm.css';
import { useForm } from "./UseForm";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children : any;
}

export const AddFarm: React.FC<ModalProps> = ({ title, isOpen, onClose }) => {
  const outsideRef = React.useRef(null);

  const handleCloseOnOverlay = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === outsideRef.current) {
      onClose();
    }
  }
  const initialState = {
    name: "",
    adres: "",
  };

  const { onChange, onSubmit, values } = useForm(
    initialState
  );

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
       
        <form onSubmit={onSubmit}>
        <fieldset>

        <label>
        Nazwa: 
        </label>

          <input name='nazwa' id='nazwa' type='text'onChange={onChange} required />

        <label>
        Adres: 
        </label>

        <input name='adres' id='adres' type='text' onChange={onChange} required />
        
        <button type='submit'>Dodaj</button>
        </fieldset>
        </form>
        </div>
      </div>
    </div>
  ) : null;
};