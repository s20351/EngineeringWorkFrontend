import React, { useEffect, useState } from 'react';
import iconX from '../../assets/x.jpg';
import { StyledDiv, StyledFieldSet, StyledButton} from './styledAddOrderHatchery';
import { useForm } from "./UseForm";
import "./styledAddFarm.css";
import Select, {SelectChangeEvent} from '@mui/material/Select'
import { deleteFarmByFarmId, getFarmsByFarmerId, postNewOrderHachery } from '../../services';
import { MenuItem } from '@mui/material';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children : any;
}

export const AddOrderHatchery: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
  const outsideRef = React.useRef(null);
  const [farm, setFarm] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false)
  const handleChange = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
    setFarm(event.target.value)
  }
  const [dataFarms, setDataFarms] = React.useState([]);
  const mappedFarms: Array<Farm> = dataFarms
  interface Farm{
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
    const fetchData = async () =>{
      await getFarmsByFarmerId()
      .then((resp) => {
        setDataFarms(resp)
        setIsLoading(true)
      })
    }
    fetchData()
    .catch(console.error)
    }, []);

    const [arrivalDate, setArrivalDate] = useState<string>("");
    const [numberMale, setNumberMale] = useState<string>("");
    const [numberFemale, setNumberFemale] = useState<string>("");

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
              labelId = "custom-select-label"
              id="custom-select"
              value = {farm}
              onChange={handleChange}
              required
              >
                {mappedFarms.map((mappedFarm) => {
                  return <MenuItem  key={mappedFarm.farmId} value={mappedFarm.farmId}>{mappedFarm.name}</MenuItem>
                })}
              </Select>
              </StyledDiv>
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
                <label htmlFor="numberMale">Ilość Indor:</label>
                <input
                  name="numberMale"
                  id="numberMale"
                  type="number"
                  value = {numberMale}
                  onChange={(event) => setNumberMale(event.target.value)}
                  required
                />
              </StyledDiv>
              <StyledDiv>
                <label htmlFor="numberFemale">Ilość Indyczka:</label>
                <input
                  name="numberFemale"
                  id="numberFemale"
                  type="number"
                  value = {numberFemale}
                  onChange={(event) => setNumberFemale(event.target.value)}
                  required
                />
              </StyledDiv>
              <StyledButton type="submit" 
              onClick={() => {postNewOrderHachery(farm, "1", arrivalDate, numberMale, numberFemale); onClose();}}
              >Dodaj</StyledButton>
            </StyledFieldSet>
          </form>
        </div>
      </div>
    </div>
  ) : null;
};