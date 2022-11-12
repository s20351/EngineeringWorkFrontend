import React, { useEffect } from "react";
import iconX from "../../../assets/x.jpg";
import { deleteFarmByFarmId, getFarmsByFarmerId } from "../../../services";
import { StyledButton, StyledFieldSet } from "./styledDeleteFarm";
import { useForm } from "../UseForm";
import Select, {SelectChangeEvent} from '@mui/material/Select'
import { MenuItem } from "@mui/material";
import Swal, {SweetAlertOptions} from 'sweetalert2';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: any;
}

export const DeleteFarm: React.FC<ModalProps> = ({ title, isOpen, onClose }) => {
  const outsideRef = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false)
  const handleCloseOnOverlay = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    if (e.target === outsideRef.current) {
      onClose();
    }
  };

  interface Farm{
    farmId: string,
    name: string
    }

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
  
  const { onChange, onSubmit } = useForm("");
  const [farm, setFarm] = React.useState("");
  const [dataFarms, setDataFarms] = React.useState([]);
  const mappedFarms: Array<Farm> = dataFarms

  const handleChange = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
    setFarm(event.target.value)
  }

  function alertDialogBox(){
    if(farm == ""){
      Swal.fire({
        title: 'Zła wartość w polu nazwa fermy',
        text: 'Musisz wybrać fermę do usunięcia',
        icon: 'warning',
        confirmButtonColor: 'rgb(43, 103, 119)',
      });
    }else{
      Swal.fire({
        title: 'Czy na pewno chcesz usunąć fermę?',
        icon: 'warning',
        confirmButtonColor: 'rgb(43, 103, 119)',
        showCancelButton: true,
        confirmButtonText: 'Tak, usuń'
      } as SweetAlertOptions).then((result) => {
        if (result.value) {
          deleteFarmByFarmId(farm); 
          setFarm("")
          onClose(); 
        }
      });
    }
  }

  return isOpen&&isLoading? (
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
              <label htmlFor="farmId">Nazwa fermy:</label>
              <Select
              labelId = "custom-select-label"
              id="custom-select"
              value = {farm}
              onChange={handleChange}
              >
                {mappedFarms.map((mappedFarm) => {
                  return <MenuItem  key={mappedFarm.farmId} value={mappedFarm.farmId}>{mappedFarm.name}</MenuItem>
                })}
              </Select>
              <StyledButton type="submit" onClick={() => { alertDialogBox(); }}>Usuń</StyledButton>
            </StyledFieldSet>
          </form>
        </div>
      </div>
    </div>
  ) : null;
};
