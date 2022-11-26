import React, { useContext, useEffect, useMemo } from "react";
import { getFeedEventsByFarmerId } from "../../services";
import { OrderFeed } from "./AddOrderFeed/AddOrderFeed";
import { StyledDivLabel, StyledDivButtons, StyledFieldSet, StyledButton, StyledDiv, H1 } from "./styledFeed";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
format(new Date(2014, 1, 1), 'yyyy-MM-dd')
import "./Feed.css";
import enUS from 'date-fns/locale/en-US'
import { DisplayOrders } from "./DisplayOrders/DisplayOrders";
import { FarmerContext } from "../../providers/FarmerDataProvider";

function Feed() {
  const [isFeedOrderOpen, setOrderFeedState] = React.useState(false);
  const toggleFeedOrderState = () => {
    if (isFeedOrderOpen) {
      setIsCurrentData(false)
    }
    setOrderFeedState(!isFeedOrderOpen);
  }
  const { data } = useContext(FarmerContext);
  const [isDisplayOrdersOpen, setDisplayOrdersState] = React.useState(false);
  const toggleDisplayOrderState = () => {
    if (isDisplayOrdersOpen) {
      setIsCurrentData(false)
    }
    setDisplayOrdersState(!isDisplayOrdersOpen);
  }

  const [allEvents, setAllEvents] = React.useState([]);
  const [isCurrentData, setIsCurrentData] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const dataCalendar = await getFeedEventsByFarmerId(data.id);
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
          <StyledButton variant="contained" onClick={() => toggleFeedOrderState()}>
            Dodaj zamówienie paszy
          </StyledButton>
        </StyledDivLabel>
        <StyledDivLabel>
          <StyledButton variant="contained" onClick={() => toggleDisplayOrderState()}>
            Wyświetl zamówienia
          </StyledButton>
        </StyledDivLabel>
      </StyledDivButtons>
      <StyledDivButtons>
        {getCalendar(allEvents)}
      </StyledDivButtons>
      <StyledDiv>
        <OrderFeed
          title={"Dodaj zamówienie paszy"}
          isOpen={isFeedOrderOpen}
          onClose={toggleFeedOrderState}
        >
        </OrderFeed>
        <DisplayOrders
          title={"Nadchodzące zamówienia"}
          isOpen={isDisplayOrdersOpen}
          onClose={toggleDisplayOrderState}
        >
        </DisplayOrders>
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

export { Feed };