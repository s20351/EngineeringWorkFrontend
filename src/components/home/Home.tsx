import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  SxProps,
  Paper,
  Link,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { StyledHomeLayout, StyledButton, H1, StyledLoadingInfo } from "./styledHome";
import { AddFarm } from "./addFarm/AddFarm";
import { AddOrderHatchery } from "./addOrderHatchery/AddOrderHatchery";
import { AddCycle } from "./addCycle/AddCycle";
import { DeleteFarm } from "./deleteFarm/DeleteFarm"
import { getHomeDetailsById } from "../../services";
import { AddExport } from "./addExport/AddExport";
import { CycleDetails } from "./cycleDetails/CycleDetails";

const Home: React.FC = () => {
  const [isAddFarmOpen, setAddFarmState] = React.useState(false);
  const [isAddCycleOpen, setAddCycleState] = React.useState(false);
  const [isAddOrderHatcheryOpen, setOrderHatcheryState] = React.useState(false);
  const [isDeleteFarmOpen, setDeleteFarmState] = React.useState(false);
  const [isExportOpen, setExportState] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false)

  const toggleAddFarm = () => setAddFarmState(!isAddFarmOpen);
  const toggleAddCycle = () => setAddCycleState(!isAddCycleOpen);
  const toggleAddOrderHatchery = () =>
    setOrderHatcheryState(!isAddOrderHatcheryOpen);
  const toggleDeleteFarm = () => setDeleteFarmState(!isDeleteFarmOpen);
  const toggleExport = () => setExportState(!isExportOpen);
  const [homeScreen, setHomeScreen] = React.useState([]);

  const [farmDetailsID, setFarmDetailsID] = React.useState('');
  const [isFarmDetailsOpen, setFarmDetailsState] = React.useState(false);
  const toggleFarmDetails = () => setFarmDetailsState(!isFarmDetailsOpen);

  const [currentNumberMale, setCurrentNumberMale] = React.useState(0);
  const [currentNumberFemale, setCurrentNumberFemale] = React.useState(0);

  const handleRowClick = (isDuringCycle: boolean, objectID : string, currentNumberMale: number, currentNumberFemale: number) => {
    if(isDuringCycle){
      setFarmDetailsID(objectID)
      setCurrentNumberMale(currentNumberMale)
      setCurrentNumberFemale(currentNumberFemale)
      toggleFarmDetails()
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHomeDetailsById();
      setHomeScreen(data);
      setIsLoading(true);
    }
    fetchData()
      .catch(console.error)
  }, []);

  return (
    <div>
      <>
        <StyledHomeLayout>
          <StyledLoadingInfo>
            {TableHome(homeScreen, isLoading)}
          </StyledLoadingInfo>
          <StyledButton variant="contained" onClick={() => toggleDeleteFarm()}>
            Usuń Fermę
          </StyledButton>
          <StyledButton variant="contained" onClick={() => toggleAddFarm()}>
            Dodaj Fermę
          </StyledButton>
          <StyledButton
            variant="contained"
            onClick={() => toggleAddOrderHatchery()}
          >
            Dodaj Pisklaki
          </StyledButton>
          <StyledButton variant="contained" onClick={() => toggleAddCycle()}>
            Dodaj Wstawienie
          </StyledButton>
          <StyledButton variant="contained" onClick={() => toggleExport()}>
            Dodaj Zdawanie
          </StyledButton>
          <AddExport
            title={"Dodaj zdawanie"}
            isOpen={isExportOpen}
            onClose={toggleExport}
          >
          </AddExport>
          <DeleteFarm
            title={"Usuń Fermę"}
            isOpen={isDeleteFarmOpen}
            onClose={toggleDeleteFarm}
          >
          </DeleteFarm>
          <AddFarm
            title={"Dodaj Fermę"}
            isOpen={isAddFarmOpen}
            onClose={toggleAddFarm}
          >
          </AddFarm>
          <AddOrderHatchery
            title={"Dodaj zamówienie z wylęgarni"}
            isOpen={isAddOrderHatcheryOpen}
            onClose={toggleAddOrderHatchery}
          >
          </AddOrderHatchery>
          <AddCycle
            title={"Dodaj wstawienie"}
            isOpen={isAddCycleOpen}
            onClose={toggleAddCycle}
          >
          </AddCycle>
          <CycleDetails
            title={"Szczegóły hodowli"}
            farmDetailsID = {farmDetailsID}
            currentNumberMale = {currentNumberMale}
            currentNumberFemale = {currentNumberFemale}
            isOpen={isFarmDetailsOpen}
            onClose={toggleFarmDetails}
          >
          </CycleDetails>
        </StyledHomeLayout>
      </>
    </div>
  );

interface ObjectsHome {
  objectID: number;
  objectName: string;
  aliveMale: number;
  aliveFemale: number;
  deadMale: number;
  deadFemale: number;
  breedingDay: number;
  daysToExport: number;
  isDuringCycle: boolean;
}

function TableHome(homeScreen: any, isLoading: boolean) {

  const tableContainerSx: SxProps = {
    width: "max-content",
    maxHeight: 500,
    border: "1px solid rgba(128,128,128,0.4)",
    marginLeft: "auto",
    marginRight: "auto",
    mariginTop: 4,
    borderRadius: 4,
  };
  
  const objects: Array<ObjectsHome> = homeScreen;

  return isLoading ? (
    objects.length > 0 ?
      <TableContainer component={Paper} sx={tableContainerSx}>
        <Table stickyHeader={false}>
          <TableHead
            sx={{
              "& th": {
                backgroundColor: "rgb(27, 77, 137)",
                fontSize: "1.2rem",
              },
            }}
          >
            <TableRow
              sx={{
                backgroundColor: "rgb(27, 77, 137)",
                borderBottom: "2px solid black",
                "& th": {
                  color: "rgb(249, 228, 91)",
                },
              }}
            >
              <TableCell>Nazwa Obiektu</TableCell>
              <TableCell>Stan Indor</TableCell>
              <TableCell>Stan Indyczka</TableCell>
              <TableCell>Zgonów Indor</TableCell>
              <TableCell>Zgonów Indyczka</TableCell>
              <TableCell>Dzień hodowli</TableCell>
              <TableCell>Dni do zdawania</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              objects.map((object) => (
                <TableRow
                  key={object.objectID}
                  style={object.isDuringCycle ? { background: '	white' } : { background: 'rgb(208,208,208)' }}
                  onClick={() => { handleRowClick(object.isDuringCycle, object.objectID.toString(), object.aliveMale, object.aliveFemale) }}>
                  <TableCell align="center">{object.objectName}</TableCell>
                  <TableCell align="center">{object.isDuringCycle ? object.aliveMale : '-'}</TableCell>
                  <TableCell align="center">{object.isDuringCycle ? object.aliveFemale : '-'}</TableCell>
                  <TableCell align="center">{object.isDuringCycle ? object.deadMale : '-'}</TableCell>
                  <TableCell align="center">{object.isDuringCycle ? object.deadFemale : '-'}</TableCell>
                  <TableCell align="center">{object.isDuringCycle ? object.breedingDay : '-'}</TableCell>
                  <TableCell align="center">{object.isDuringCycle ? (object.daysToExport == -1 ? 'brak zdawania' : object.daysToExport) : '-'}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      : <H1>Brak ferm do wyświetlenia</H1>
  ) : <H1>Trwa ładowanie danych o bieżących cyklach ....</H1>;
}
}

export { Home };
