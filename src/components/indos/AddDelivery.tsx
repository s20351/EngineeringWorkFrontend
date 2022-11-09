import React, { useEffect, useState } from "react";
import iconX from "../../assets/x.jpg";
import { getFarmsByFarmerId, postNewDelivery } from "../../services";
import { StyledButton, StyledDiv, StyledFieldSet } from "./styledAddDelivery";
import { useForm } from "./UseForm";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: any;
}

export const DeliveryIndos: React.FC<ModalProps> = ({ title, isOpen, onClose }) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const outsideRef = React.useRef(null);
  const handleCloseOnOverlay = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    if (e.target === outsideRef.current) {
      onClose();
    }
  };
  const [arrivalDate, setArrivalDate] = useState<string>("");
  const [weight, setWeight] = useState<string>("");

  useEffect(() => {
    const fetchData = async () =>{
      await getFarmsByFarmerId()
      .then((resp) => {
        setIsLoading(true)
      })
    }
    fetchData()
    .catch(console.error)
    }, []);

  const { onChange, onSubmit } = useForm('');

  return isOpen && isLoading ? (
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
              <label htmlFor="arrivalDate">Data przyjazdu:</label>
                <input
                  name="arrivalDate"
                  id="arrivalDate"
                  type="date"
                  value = {arrivalDate}
                  onChange={(event) => setArrivalDate(event.target.value)}
                  required
                />
              </StyledDiv>
              <StyledDiv>
                <label htmlFor="weight">Waga:</label>
                <input
                  name="weight"
                  id="weight"
                  type="number"
                  value = {weight}
                  onChange={(event) => setWeight(event.target.value)}
                  required
                />
              </StyledDiv>
              <StyledButton type="submit" onClick={() => { postNewDelivery(arrivalDate, weight); onClose();}} >Dodaj</StyledButton>
            </StyledFieldSet>
          </form>
        </div>
      </div>
    </div>
  ) : null;
};
