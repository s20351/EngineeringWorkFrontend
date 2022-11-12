import React, { useRef, useState } from "react";
import iconX from "../../../assets/x.jpg";
import { postDeathsByFarmId, postNewFarm } from "../../../services";
import { StyledButton, StyledDiv, StyledFieldSet } from "./styledCycleDetails";
import "./styledCycleDetails";
import { useForm } from "../UseForm";
import Swal from 'sweetalert2';

interface ModalProps {
  title: string;
  farmDetailsID: string;
  currentNumberMale: number;
  currentNumberFemale: number;
  isOpen: boolean;
  onClose: () => void;
  children: any;
}

export const CycleDetails: React.FC<ModalProps> = ({ title, farmDetailsID, currentNumberMale, currentNumberFemale, isOpen, onClose }) => {
  const outsideRef = React.useRef(null);
  const [deathsMale, setDeathsMale] = useState<string>("0");
  const [deathsFemale, setDeathsFemale] = useState<string>("0");
  const handleCloseOnOverlay = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    if (e.target === outsideRef.current) {
      onClose();
    }
  };

  function alertDialogBox() {
    if (deathsMale == "" || deathsFemale == "") {
      Swal.fire({
        title: 'Złe dane',
        text: 'Musisz uzupełnić wszystkie pola',
        icon: 'warning',
        confirmButtonColor: 'rgb(43, 103, 119)',
      });
    }else if (parseInt(deathsMale) < 0 || parseInt(deathsFemale) < 0) {
      Swal.fire({
        title: 'Złe dane',
        text: 'Liczba zgonów nie może być ujemna',
        icon: 'warning',
        confirmButtonColor: 'rgb(43, 103, 119)',
      });
    } else if ((currentNumberMale - parseInt(deathsMale)) < 0|| currentNumberFemale - parseInt(deathsFemale) < 0) {
      Swal.fire({
        title: 'Złe dane',
        text: 'Stan drobiu nie może być ujemny, zbyt duża liczba zgonów',
        icon: 'warning',
        confirmButtonColor: 'rgb(43, 103, 119)',
      });
    }  else {
      Swal.fire({
        title: 'Zgony zostały dodane',
        icon: 'success',
        confirmButtonColor: 'rgb(43, 103, 119)',
      });
      postDeathsByFarmId(farmDetailsID, deathsMale, deathsFemale)
      onClose();
      setDeathsMale("0")
      setDeathsFemale("0")
    }
  }

  const { onSubmit } = useForm('');

  return isOpen ? (
    <div className={"modal"}>
      <div
        ref={outsideRef}
        className={"modal__overlay"}
        onClick={handleCloseOnOverlay}
      />
      <div className={"modal__box"}>
        <button className={"modal__close"} onClick={onClose}>
          <img src={iconX} alt={"close"} />
        </button>
        <div className={"modal__title"}>{title}</div>

        <div className={"modal__content"}>
          <form onSubmit={onSubmit}>
            <StyledFieldSet>
              <StyledDiv>
                <label htmlFor="deathsMale">Ilość zgonów indor:</label>
                <input
                  name="deathsMale"
                  id="deathsMale"
                  type="number"
                  value={deathsMale}
                  onChange={(event) => setDeathsMale(event.target.value)}
                />
              </StyledDiv>
              <StyledDiv>
                <label htmlFor="deathsFemale">Ilość zgonów indyczka:</label>
                <input
                  name="deathsFemale"
                  id="deathsFemale"
                  type="number"
                  value={deathsFemale}
                  onChange={(event) => setDeathsFemale(event.target.value)}
                />
              </StyledDiv>
              <StyledButton type="submit" onClick={() => { alertDialogBox() }} >Dodaj</StyledButton>
            </StyledFieldSet>
          </form>
        </div>
      </div>
    </div>
  ) : null;
};
