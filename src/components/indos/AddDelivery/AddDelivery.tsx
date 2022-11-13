import React, { useEffect, useState } from "react";
import iconX from "../../../assets/x.jpg";
import { getFarmsByFarmerId, postNewDelivery } from "../../../services";
import { StyledButton, StyledDiv, StyledFieldSet } from "./styledAddDelivery";
import { useForm } from "../UseForm";
import Swal, { SweetAlertOptions } from 'sweetalert2';

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

    function alertDialogBox() {
      if (arrivalDate == "" || weight == "") {
        Swal.fire({
          title: 'Złe dane',
          text: 'Musisz uzupełnić wszystkie pola',
          icon: 'warning',
          confirmButtonColor: 'rgb(43, 103, 119)',
        });
      } else {
        Swal.fire({
          title: 'Dostawa została dodana',
          icon: 'success',
          confirmButtonColor: 'rgb(43, 103, 119)',
        });
        postNewDelivery(arrivalDate, weight); 
        onClose();
      }
    }

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
                />
              </StyledDiv>
              <StyledButton type="submit" onClick={() => { alertDialogBox(); }} >Dodaj</StyledButton>
            </StyledFieldSet>
          </form>
        </div>
      </div>
    </div>
  ) : null;
};
