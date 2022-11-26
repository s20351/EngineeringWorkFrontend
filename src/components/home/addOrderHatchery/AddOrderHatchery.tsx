import React, { useContext, useEffect, useState } from 'react';
import iconX from '../../../assets/x.jpg';
import { StyledDiv, StyledFieldSet, StyledButton } from './styledAddOrderHatchery';
import { useForm } from "../UseForm";
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { getFarmsByFarmerId, postNewOrderHachery } from '../../../services';
import { MenuItem } from '@mui/material';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { FarmerContext } from '../../../providers/FarmerDataProvider';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: any;
}

export const AddOrderHatchery: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
  const { data } = useContext(FarmerContext);
  const outsideRef = React.useRef(null);
  const [farm, setFarm] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false)
  const handleChange = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
    setFarm(event.target.value)
  }
  const [dataFarms, setDataFarms] = React.useState([]);
  const mappedFarms: Array<Farm> = dataFarms
  interface Farm {
    farmId: string,
    name: string
  }

  const handleCloseOnOverlay = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === outsideRef.current) {
      onClose();
    }
  }

  const { onChange, onSubmit } = useForm('');

  useEffect(() => {
    const fetchData = async () => {
      await getFarmsByFarmerId(data.id)
        .then((resp) => {
          setDataFarms(resp)
          setIsLoading(true)
        })
    }
    fetchData()
      .catch(console.error)
  }, [isOpen]);

  const [arrivalDate, setArrivalDate] = useState<string>("");
  const [numberMale, setNumberMale] = useState<string>("");
  const [numberFemale, setNumberFemale] = useState<string>("");

  function clearData() {
    setFarm("");
    setArrivalDate("");
    setNumberFemale("");
    setNumberMale("");
  }

  function alertDialogBox() {
    if (farm == "" || arrivalDate == "" || numberMale == "" || numberFemale == "") {
      Swal.fire({
        title: 'Złe dane',
        text: 'Musisz uzupełnić wszystkie pola',
        icon: 'warning',
        confirmButtonColor: 'rgb(43, 103, 119)',
      });
    } else if (parseInt(numberMale) < 0 || parseInt(numberFemale) < 0) {
      Swal.fire({
        title: 'Złe dane',
        text: 'Liczba zamówiona liczba pisklaków nie może być ujemna',
        icon: 'warning',
        confirmButtonColor: 'rgb(43, 103, 119)',
      });
    } else {
      Swal.fire({
        title: 'Zamówienie zostało dodane',
        icon: 'success',
        confirmButtonColor: 'rgb(43, 103, 119)',
      } as SweetAlertOptions).then((result) => {
        if (result.value) {
          postNewOrderHachery(farm, "1", arrivalDate, numberMale, numberFemale);
          clearData()
          onClose();
        }
      });
    }
  }

  return isOpen && isLoading ? (
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
        <div className={"modal__content"}>
          <form onSubmit={onSubmit}>
            <StyledFieldSet>
              <StyledDiv>
                <label htmlFor="farmId">Ferma:</label>
                <Select
                  labelId="custom-select-label"
                  sx={{
                    position: 'sticky',
                    width: '46%',
                    height: '2rem',
                  }}
                  id="custom-select"
                  value={farm}
                  onChange={handleChange}
                >
                  {mappedFarms.map((mappedFarm) => {
                    return <MenuItem key={mappedFarm.farmId} value={mappedFarm.farmId}>{mappedFarm.name}</MenuItem>
                  })}
                </Select>
              </StyledDiv>
              <StyledDiv>
                <label htmlFor="arrivalDate">Data przyjazdu:</label>
                <input
                  name="arrivalDate"
                  id="arrivalDate"
                  type="date"
                  value={arrivalDate}
                  onChange={(event) => setArrivalDate(event.target.value)}
                />
              </StyledDiv>
              <StyledDiv>
                <label htmlFor="numberMale">Ilość Indor:</label>
                <input
                  name="numberMale"
                  id="numberMale"
                  type="number"
                  value={numberMale}
                  onChange={(event) => setNumberMale(event.target.value)}
                />
              </StyledDiv>
              <StyledDiv>
                <label htmlFor="numberFemale">Ilość Indyczka:</label>
                <input
                  name="numberFemale"
                  id="numberFemale"
                  type="number"
                  value={numberFemale}
                  onChange={(event) => setNumberFemale(event.target.value)}
                />
              </StyledDiv>
              <StyledButton type="submit"
                onClick={() => { alertDialogBox(); }}
              >Dodaj</StyledButton>
            </StyledFieldSet>
          </form>
        </div>
      </div>
    </div>
  ) : null;
};