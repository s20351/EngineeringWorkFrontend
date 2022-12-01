import { getDeliveryEvents } from "../../services";
import React, { useEffect, useMemo } from "react";
import { } from "../../services";
import { DeliveryIndos } from "./AddDelivery/AddDelivery";
import { StyledDivLabel, StyledDivButtons, StyledFieldSet, StyledButton, StyledDiv, H1 } from "./styledIndos";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
format(new Date(2014, 1, 1), 'yyyy-MM-dd')
import "./Indos.css";
import enUS from 'date-fns/locale/en-US'
import { DisplayDeliveries } from "./DisplayDeliveries/DisplayDeliveries";

function Indos() {
  const [isIndosOrderOpen, setOrderIndosState] = React.useState(false);
  const [allEvents, setAllEvents] = React.useState([]);
  const [isCurrentData, setIsCurrentData] = React.useState(false);

  const [isDisplayOrdersOpen, setDisplayOrdersState] = React.useState(false);
  const toggleDisplayOrderState = () => {
      setIsCurrentData(false)
    setDisplayOrdersState(!isDisplayOrdersOpen);
  }

  const toggleIndosOrderState = () => {
      setIsCurrentData(false)
    setOrderIndosState(!isIndosOrderOpen);
  }

  useEffect(() => {
    const fetchData = async () => {
      const dataCalendar = await getDeliveryEvents();
      setAllEvents(dataCalendar)
      setIsCurrentData(true);
    }
    fetchData()
      .catch(console.error)
  }, [isCurrentData]);


  return (
    <StyledFieldSet>
      <StyledDivButtons>
        <StyledDivLabel>
          <StyledButton variant="contained" onClick={() => toggleIndosOrderState()}>
          Dodaj zamówienie od obcego hodowcy
          </StyledButton>
        </StyledDivLabel>
        <StyledDivLabel>
          <StyledButton variant="contained" onClick={() => toggleDisplayOrderState()}>
            Wyświetl dostawy
          </StyledButton>
        </StyledDivLabel>
      </StyledDivButtons>
      <StyledDivButtons>
        {getCalendar(allEvents)}
      </StyledDivButtons>
      <StyledDiv>
        <DeliveryIndos
          title={"Dodaj zamówienie od obcego hodowcy"}
          isOpen={isIndosOrderOpen}
          onClose={toggleIndosOrderState}
        >
        </DeliveryIndos>
        <DisplayDeliveries
          title={"Nadchodzące dostawy"}
          isOpen={isDisplayOrdersOpen}
          onClose={toggleDisplayOrderState}
        >
        </DisplayDeliveries>
      </StyledDiv>
    </StyledFieldSet>
  );
};

function getCalendar(allEvents: any) {
  let mappedEvents: Array<Event> = allEvents

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
    }
  }

  interface Event {
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

  return (
    <div className="App">
      <Calendar culture={'pl'} localizer={localizer} messages={messages} events={mappedEvents} startAccessor="start" endAccessor="end" views={['month']} style={{ height: 600, width: 1100, margin: "50px" }} />
    </div>
  )
}

export { Indos };