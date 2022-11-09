import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import iconX from "../../assets/x.jpg";
import { getCycleByFarmerId, postNewExport, postNewFarm } from "../../services";
import { StyledButton, StyledDiv, StyledFieldSet } from "./styledAddExport";
import { useForm } from "./UseForm";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: any;
}

interface Cycle{
    cycleId: string,
    cycleDescription: string
    }

export const AddExport: React.FC<ModalProps> = ({ title, isOpen, onClose }) => {
  const outsideRef = React.useRef(null);
  const [name, setName] = useState<string>("");
  const handleCloseOnOverlay = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    if (e.target === outsideRef.current) {
      onClose();
    }
  };

  const { onChange, onSubmit } = useForm('');
  const [cycle, setCycle] = React.useState("");
  const [dataCycles, setDataCycles] = React.useState([]);
  const mappedCycles: Array<Cycle> = dataCycles
  const [exportDate, setExportDate] = useState<string>("");
  const [numberMale, setNumberMale] = useState<string>("");
  const [numberFemale, setNumberFemale] = useState<string>("");
  const [weight, setWeight] = useState<string>("");

  useEffect(() => {
    const fetchData = async () =>{
      await getCycleByFarmerId()
      .then((resp) => {
        setDataCycles(resp)
      })
    }
    fetchData()
    .catch(console.error)
    }, []);

    const handleChange = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
        setCycle(event.target.value)
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
              <StyledDiv>
                <label htmlFor="nazwa">Nazwa cyklu:</label>
                    <Select
                        labelId = "custom-select-label"
                        id="custom-select"
                        value = {cycle}
                        onChange={handleChange}
                        >
                    {mappedCycles.map((mappedCycle) => {
                    return <MenuItem  key={mappedCycle.cycleId} value={mappedCycle.cycleId}>{mappedCycle.cycleDescription}</MenuItem>
                    })}
                </Select>
              </StyledDiv>
              <StyledDiv>
                <label htmlFor="arrivalDate">Data zdawania:</label>
                <input
                  name="exportDate"
                  id="exportDate"
                  type="date"
                  value = {exportDate}
                  onChange={(event) => setExportDate(event.target.value)}
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
              <StyledDiv>
                <label htmlFor="numberFemale">Waga:</label>
                <input
                  name="weight"
                  id="weight"
                  type="number"
                  value = {weight}
                  onChange={(event) => setWeight(event.target.value)}
                  required
                />
              </StyledDiv>
              <StyledButton type="submit" 
              onClick={() => { postNewExport(cycle, exportDate, numberMale, numberFemale, weight); onClose();}} >Dodaj</StyledButton>
            </StyledFieldSet>
          </form>
        </div>
      </div>
    </div>
  ) : null;
};
