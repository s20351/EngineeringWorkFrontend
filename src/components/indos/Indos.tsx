import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  SxProps,
  Paper
} from "@mui/material";
import {  getDeliveries, getDeliveryEvents, getFeedEventsByFarmerId } from "../../services";
import React, { useEffect, useMemo } from "react";
import {  } from "../../services";
import { DeliveryIndos } from "./AddDelivery";
import { StyledButton, StyledDiv, H1 } from "./styledIndos";
import { Calendar, dateFnsLocalizer} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
format(new Date(2014, 1, 1), 'yyyy-MM-dd')
import "./Indos.css";
import enUS from 'date-fns/locale/en-US'

function Indos(){
  const [isIndosOrderOpen, setOrderIndosState] = React.useState(false);
  const toggleIndosOrderState = () =>  setOrderIndosState(!isIndosOrderOpen);
  const [allEvents, setAllEvents] = React.useState([]);
  const [deliveries, setDeliveries] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false)

  useEffect(() => {
    const fetchData = async () =>{
      const dataCalendar = await getDeliveryEvents();
      setAllEvents(dataCalendar)
      const deliveriesData = await getDeliveries();
      setDeliveries(deliveriesData);
      setIsLoading(true);
    }
    fetchData()
    .catch(console.error)
    }, []);


    return (
      <StyledDiv>
      {TableIndos(deliveries, isLoading)}
      <StyledButton variant="contained" onClick={() => toggleIndosOrderState()}>
            Dodaj zamówienie od obcego hodowcy
      </StyledButton>
      <StyledDiv>
        {getCalendar(allEvents)}
      </StyledDiv>
      <StyledDiv>
      <DeliveryIndos
          title = {"Dodaj zamówienie od obcego hodowcy"}
          isOpen={isIndosOrderOpen}
          onClose={toggleIndosOrderState}
          >
      </DeliveryIndos>
      </StyledDiv>
      </StyledDiv>
    );
  };

  export function TableIndos(deliveries: any, isLoading: boolean) {
    interface Delivery {
      date: Date;
      name: string;
      surname: string,
      weight: number
    }
      
    const objects: Array<Delivery> = deliveries;
  
    const tableContainerSx: SxProps = {
      width: "max-content",
      maxHeight: 500,
      border: "1px solid rgba(128,128,128,0.4)",
      marginLeft: "auto",
      marginRight: "auto",
      mariginTop: 4,
      borderRadius: 4,
    };

    return isLoading? (
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
              <TableCell>Data dostawy</TableCell>
              <TableCell>Imię hodowcy</TableCell>
              <TableCell>Nazwisko hodowcy</TableCell>
              <TableCell>Waga</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              "& tr:nth-of-type(2n+1)": {
                backgroundColor: "grey.100",
              },
            }}
          >
          {
          objects.map((object)=> (
              <TableRow>
                <TableCell align="center">{object.date.toString()}</TableCell>
                <TableCell align="center">{object.name}</TableCell>
                <TableCell align="center">{object.surname}</TableCell>
                <TableCell align="center">{object.weight}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> : <H1>Brak dostaw do wyświetlenia</H1>
    ): <H1>Trwa ładowanie danych o dostawach...</H1>;
  }

 function getCalendar(allEvents: any){
    let mappedEvents: Array<Event>  = allEvents

        const locales = {
          'en-US': enUS,
        }
        
        const localizer = dateFnsLocalizer({
          format,
          parse,
          startOfWeek,
          getDay,
          locales,
        });
        
        const lang = {
        pl: {
          week: 'Tydzień',
          day: 'Dzień',
          today: 'Dzisiaj',
          previous: 'Poprzedni',
          next: 'Następny',
          showMore: (total: any) => `+${total} zdarzenia`
        }}

        interface Event{
          title: string
          allDay: boolean
          start: Date
          end: Date
        }

        const { messages } = useMemo(
          () => ({
            messages: lang['pl'],
          }),
          ['pl']
        )
        
    return(
    <div className="App">
    <Calendar culture = {'pl'} localizer={localizer}  messages={messages} events={mappedEvents} startAccessor="start" endAccessor="end" views={['month']} style={{ height: 600, width:1200, margin: "50px"}} />
    </div>  
    )
  }
  
  export { Indos };