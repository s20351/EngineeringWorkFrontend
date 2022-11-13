import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { useEffect, useMemo } from 'react';
format(new Date(2014, 1, 1), 'yyyy-MM-dd')
import "./Farmers.css";
import enUS from 'date-fns/locale/en-US'
import { StyledDivLabel, StyledDivSelect, StyledDiv, StyledFieldSet, InputLabel } from './styledFarmers';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';
import { getFarmers, getFarmerScheduleEventsByFarmerId } from '../../services';

function Farmers() {
  const [farmer, setFarmer] = React.useState("");
  const [dataFarms, setDataFarms] = React.useState([]);
  const [allEvents, setAllEvents] = React.useState([]);

  const handleFarmChange = async (event: SelectChangeEvent<string>, child: React.ReactNode) => {
    setFarmer(event.target.value)
    setAllEvents(await getFarmerScheduleEventsByFarmerId(event.target.value))
  }

  interface Farmer {
    farmerId: string,
    farmerName: string
  }

  const mappedFarms: Array<Farmer> = dataFarms
  useEffect(() => {
    const fetchData = async () => {
      await getFarmers()
        .then((resp) => {
          setDataFarms(resp)
        })
    }
    fetchData()
      .catch(console.error)
  }, []);

  return (
    <StyledFieldSet>
      <StyledDiv>
        <StyledDivLabel>
        <InputLabel htmlFor="farm">Wybierz Hodowcę: </InputLabel>
        </StyledDivLabel>
        <StyledDivSelect>
        <Select
          labelId="custom-select-label"
          id="custom-select"
          value={farmer}
          sx={{
            position: 'sticky',
            width: '100%',
          }}
          onChange={handleFarmChange}
        >
          {mappedFarms.map((mappedFarm) => {
            return <MenuItem key={mappedFarm.farmerId} value={mappedFarm.farmerId}>{mappedFarm.farmerName}</MenuItem>
          })}
        </Select>
        </StyledDivSelect>
      </StyledDiv>

      <StyledDiv>
        {getCalendar()}
      </StyledDiv>
    </StyledFieldSet>
  );


  function getCalendar() {

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
};
export { Farmers };
