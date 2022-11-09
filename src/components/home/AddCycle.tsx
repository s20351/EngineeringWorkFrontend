import React, { useEffect, useState } from 'react';
import iconX from '../../assets/x.jpg';
import './styledAddFarm.css';
import { StyledDiv, StyledFieldSet, StyledButton } from './styledAddCycle';
import { useForm } from './UseForm';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { getFarmsByFarmerId, getHatcheryOrderdsByFarmId, postNewCycle } from '../../services';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: any;
}

export const AddCycle: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
  const outsideRef = React.useRef(null);

  const handleCloseOnOverlay = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === outsideRef.current) {
      onClose();
    }
  }
  interface Farm{
    farmId: string,
    name: string
    }
    
  const [farm, setFarm] = React.useState("");
  const [dataFarms, setDataFarms] = React.useState([]);
  const [orderHatcheryDateSelect, setOrderHatcheryDateSelect] = React.useState([]);
  const [orderHatcheryId, setorderHatcheryId] = React.useState("");
  const mappedFarms: Array<Farm> = dataFarms
  const [description, setDescription] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const mappedDeliveries: Array<Delivery> = orderHatcheryDateSelect

  useEffect(() => {
    const fetchData = async () =>{
      await getFarmsByFarmerId()
      .then((resp) => {
        setDataFarms(resp)
      })
    }
    fetchData()
    .catch(console.error)
    }, []);

  const { onChange, onSubmit } = useForm('');
  
  const handleFarmChange = async (event: SelectChangeEvent<string>, child: React.ReactNode) => {
    setFarm(event.target.value)
    setOrderHatcheryDateSelect(await getHatcheryOrderdsByFarmId(event.target.value))
  }

  const handleDateChange = async (event: SelectChangeEvent<string>, child: React.ReactNode) => {
    setorderHatcheryId(event.target.value)
  }

  interface Delivery{
    deliveryID: string,
    date: string
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
          <form onSubmit={onSubmit}>
            <StyledFieldSet>
              <StyledDiv>
                <label htmlFor="farmId">Ferma:</label>
                <Select
                  labelId="custom-select-label"
                  id="custom-select"
                  value={farm}
                  onChange={handleFarmChange}
                >
                  {mappedFarms.map((mappedFarm) => {
                    return <MenuItem key={mappedFarm.farmId} value={mappedFarm.farmId}>{mappedFarm.name}</MenuItem>
                  })}
                </Select>
              </StyledDiv>
              <StyledDiv>
                <label htmlFor="description">Opis:</label>
                <input
                  name="description"
                  id="description"
                  type="description"
                  value = {description}
                  onChange= {(event) => setDescription(event.target.value)}
                  required
                />
              </StyledDiv>
              <StyledDiv>
                <label htmlFor="dateIn">Data Rozpoczęcia:</label>
                <Select
                  labelId="custom-select-label"
                  id="custom-select"
                  value={orderHatcheryId}
                  onChange={handleDateChange}
                >
                  {mappedDeliveries.map((delivery) => {
                    return <MenuItem key={delivery.deliveryID} value={delivery.deliveryID}>{delivery.date}</MenuItem>
                  })}
                </Select>
              </StyledDiv>
              <StyledDiv>
                <label htmlFor="endDate">Data Zakończenia:</label>
                <input
                  name="endDate"
                  id="endDate"
                  type="date"
                  value = {endDate}
                  onChange= {(event) => setEndDate(event.target.value)}
                />
              </StyledDiv>
              <StyledButton type="submit" 
              onClick={() => {postNewCycle(farm, description, endDate, orderHatcheryId); onClose();}}>Dodaj</StyledButton>
            </StyledFieldSet>
          </form>
        </div>
      </div>
    </div>
  ) : null;
};