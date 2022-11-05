import React, { useEffect } from "react";
import iconX from "../../assets/x.jpg";
import { deleteFarmByFarmId, getFarmsByFarmerId } from "../../services";
import { StyledButton, StyledFieldSet } from "./styledDeleteFarm";
import { useForm } from "./UseForm";
import Select, {SelectChangeEvent} from '@mui/material/Select'
import { MenuItem } from "@mui/material";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: any;
}

export const DeleteFarm: React.FC<ModalProps> = ({ title, isOpen, onClose }) => {
  const outsideRef = React.useRef(null);
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
              <StyledButton type="submit" onClick={() => {deleteFarmByFarmId(farm); onClose();}}>Usuń</StyledButton>
            </StyledFieldSet>
          </form>
        </div>
      </div>
    </div>
  ) : null;
};
