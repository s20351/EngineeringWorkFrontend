import React, { useRef, useState } from "react";
import iconX from "../../assets/x.jpg";
import { postNewFarm } from "../../services";
import { StyledButton, StyledDiv, StyledFieldSet } from "./styledAddFarm";
import "./styledAddFarm.css";
import { useForm } from "./UseForm";

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

  const { onChange, onSubmit } = useForm(initialState);

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
                  required
                />
              </StyledDiv>
              <StyledButton type="submit" onClick={() => { postNewFarm(name); onClose();}} >Dodaj</StyledButton>
            </StyledFieldSet>
          </form>
        </div>
      </div>
    </div>
  ) : null;
};
