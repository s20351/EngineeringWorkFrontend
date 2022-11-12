import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { useEffect, useState } from "react";
import iconX from "../../../assets/x.jpg";
import { getCycleByFarmerId, postNewExport } from "../../../services";
import { StyledButton, StyledDiv, StyledFieldSet } from "./styledAddExport";
import { useForm } from "../UseForm";
import Swal, { SweetAlertOptions } from 'sweetalert2';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: any;
}

interface Cycle {
  cycleId: string,
  cycleDescription: string,
  endCycleDate: string
  startCycleDate: string
}

export const AddExport: React.FC<ModalProps> = ({ title, isOpen, onClose }) => {
  const outsideRef = React.useRef(null);
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
  const [isLoading, setIsLoading] = React.useState(false)
  const [cycleEndDate, setcycleEndDate] = React.useState("");
  const [cycleStartDate, setcycleStartDate] = React.useState("");

  function clearData() {
    setCycle("");
    setExportDate("");
    setNumberMale("");
    setNumberFemale("");
    setWeight("");
  }

  useEffect(() => {
    const fetchData = async () => {
      await getCycleByFarmerId()
        .then((resp) => {
          setDataCycles(resp)
          setIsLoading(true)
        })
    }
    fetchData()
      .catch(console.error)
  }, []);

  const handleChange = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
    setCycle(event.target.value)
    let cycle = mappedCycles.find(x => x.cycleId == event.target.value)!
    setcycleEndDate(cycle.endCycleDate)
    setcycleStartDate(cycle.startCycleDate)
  }

  function alertDialogBox() {
    const endCycleDate = new Date(cycleEndDate)
    const startCycleDate = new Date (cycleStartDate);
    const chosenExportDate = new Date(exportDate)

    if (cycle == "" || exportDate == "" || numberMale == "" || numberFemale == "") {
      Swal.fire({
        title: 'Złe dane',
        text: 'Musisz uzupełnić wszystkie pola',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
      });
    } else if (startCycleDate > chosenExportDate) {
      Swal.fire({
        title: 'Złe dane',
        text: 'Data zdawania nie może być wcześniej niż początek cyklu...',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
      });
    }else if (endCycleDate < chosenExportDate) {
      Swal.fire({
        title: 'Złe dane',
        text: 'Data zdawania nie może być później niż koniec cyklu...',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
      });
    } else {
      Swal.fire({
        title: 'Zdawanie zostało dodane',
        icon: 'success',
        confirmButtonColor: '#3085d6',
      } as SweetAlertOptions).then((result) => {
        if (result.value) {
          postNewExport(cycle, exportDate, numberMale, numberFemale, weight);
          onClose();
          clearData();
        }
      });
    }
  }

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
                <label htmlFor="nazwa">Nazwa cyklu:</label>
                <Select
                  labelId="custom-select-label"
                  id="custom-select"
                  sx={{
                    position: 'sticky',
                    width: '54%',
                    height: '2rem',
                  }}
                  value={cycle}
                  onChange={handleChange}
                >
                  {mappedCycles.map((mappedCycle) => {
                    return <MenuItem key={mappedCycle.cycleId} value={mappedCycle.cycleId}>{mappedCycle.cycleDescription}</MenuItem>
                  })}
                </Select>
              </StyledDiv>
              <StyledDiv>
                <label htmlFor="arrivalDate">Data zdawania:</label>
                <input
                  name="exportDate"
                  id="exportDate"
                  type="date"
                  value={exportDate}
                  onChange={(event) => setExportDate(event.target.value)}
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
              <StyledDiv>
                <label htmlFor="numberFemale">Waga:</label>
                <input
                  name="weight"
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={(event) => setWeight(event.target.value)}
                />
              </StyledDiv>
              <StyledButton type="submit"
                onClick={() => { alertDialogBox() }} >Dodaj</StyledButton>
            </StyledFieldSet>
          </form>
        </div>
      </div>
    </div>
  ) : null;
};
