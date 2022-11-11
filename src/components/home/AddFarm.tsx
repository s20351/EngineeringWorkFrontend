import React, { useRef, useState } from "react";
import iconX from "../../assets/x.jpg";
import { postNewFarm } from "../../services";
import { StyledButton, StyledDiv, StyledFieldSet } from "./styledAddFarm";
import "./styledAddFarm.css";
import { useForm } from "./UseForm";
import Swal from 'sweetalert2';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: any;
}

export const AddFarm: React.FC<ModalProps> = ({ title, isOpen, onClose }) => {
  const outsideRef = React.useRef(null);
  const [name, setName] = useState<string>("");
  const handleCloseOnOverlay = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    if (e.target === outsideRef.current) {
      onClose();
    }
  };
  const initialState = {
    name: "",
  };

  function alertDialogBox() {
    if (name == "") {
      Swal.fire({
        title: 'Zła wartość w polu nazwa',
        text: 'Musisz uzupełnić nazwę fermy ',
        icon: 'warning',
        confirmButtonColor: 'rgb(43, 103, 119)',
      });
    } else {
      Swal.fire({
        title: 'Ferma została dodana',
        icon: 'success',
        confirmButtonColor: 'rgb(43, 103, 119)',
      });
      postNewFarm(name);
      onClose();
    }
  }

  const { onSubmit } = useForm(initialState);

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
                <label htmlFor="nazwa">Nazwa:</label>
                <input
                  name="nazwa"
                  id="nazwa"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
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
