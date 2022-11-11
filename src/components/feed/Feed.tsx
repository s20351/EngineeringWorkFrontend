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
import React, { useEffect, useMemo } from "react";
import {  getFeedDetailsByFarmerId, getFeedEventsByFarmerId } from "../../services";
import { OrderFeed } from "./AddOrderFeed";
import { StyledButton, StyledDiv, H1 } from "./styledFeed";
import { Calendar, dateFnsLocalizer} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
format(new Date(2014, 1, 1), 'yyyy-MM-dd')
import "./Feed.css";
import enUS from 'date-fns/locale/en-US'

function Feed(){
  const [isFeedOrderOpen, setOrderFeedState] = React.useState(false);
  const toggleFeedOrderState = () =>  setOrderFeedState(!isFeedOrderOpen);
  const [allEvents, setAllEvents] = React.useState([]);
  const [feed, setFeed] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false)

  useEffect(() => {
    const fetchData = async () =>{
      const dataCalendar = await getFeedEventsByFarmerId();
      setAllEvents(dataCalendar)
      const data = await getFeedDetailsByFarmerId();
      setFeed(data);
      setIsLoading(true);
    }
    fetchData()
    .catch(console.error)
    }, []);


    return (
      <StyledDiv>
      {TableFeed(feed, isLoading)}
      <StyledButton variant="contained" onClick={() => toggleFeedOrderState()}>
            Dodaj zamówienie paszy
      </StyledButton>
      <StyledDiv>
        {getCalendar(allEvents)}
      </StyledDiv>
      <StyledDiv>
      <OrderFeed
          title = {"Dodaj zamówienie paszy"}
          isOpen={isFeedOrderOpen}
          onClose={toggleFeedOrderState}
          >
      </OrderFeed>
      </StyledDiv>
      </StyledDiv>
    );
  };

  export function TableFeed(feed: any, isLoading: boolean) {
    interface ObjectsFeed {
      objectID: number;
      farmName: string;
      arrivalDate: Date,
      weight: number
    }
      
    const objects: Array<ObjectsFeed> = feed;
  
    const tableContainerSx: SxProps = {
      width: "max-content",
      maxHeight: 500,
      border: "1px solid rgba(128,128,128,0.4)",
      marginLeft: "auto",
      marginRight: "auto",
      mariginTop: 4,
      borderRadius: 4,
    };

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
              <TableCell>Data przyjazdu</TableCell>
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
                <TableCell align="center">{object.farmName}</TableCell>
                <TableCell align="center">{object.arrivalDate.toString()}</TableCell>
                <TableCell align="center">{object.weight}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> : <H1>Brak zamówień paszy do wyświetlenia</H1>
    ) : <H1>Trwa ładowanie danych o zamówieniach paszy...</H1>;
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
    <Calendar culture = {'pl'} localizer={localizer}  messages={messages} events={mappedEvents} startAccessor="start" endAccessor="end" views={['month']} style={{ height: 600, width:1100, margin: "50px"}} />
    </div>  
    )
  }
  
  export { Feed };