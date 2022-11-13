import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { useEffect, useMemo } from "react";
format(new Date(2014, 1, 1), "yyyy-MM-dd");
import "./Breeding.css";
import enUS from "date-fns/locale/en-US";
import { StyledDivLabel, StyledDivSelect, StyledDiv, StyledFieldSet, InputLabel } from "./styledBreeding";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import {
  getFarmsByFarmerId,
  getFarmScheduleEventsByFarmId,
} from "../../services";

function Breeding() {
  const [farm, setFarm] = React.useState("");
  const [dataFarms, setDataFarms] = React.useState([]);
  const [allEvents, setAllEvents] = React.useState([]);

  const handleFarmChange = async (
    event: SelectChangeEvent<string>,
    child: React.ReactNode
  ) => {
    setFarm(event.target.value);
    setAllEvents(await getFarmScheduleEventsByFarmId(event.target.value));
  };

  interface Farm {
    farmId: string;
    name: string;
  }

  const mappedFarms: Array<Farm> = dataFarms;
  useEffect(() => {
    const fetchData = async () => {
      await getFarmsByFarmerId().then((resp) => {
        setDataFarms(resp);
      });
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <StyledFieldSet>
      <StyledDiv>
        <StyledDivLabel>
          <InputLabel htmlFor="farm">Wybierz Fermę: </InputLabel>
        </StyledDivLabel>
        <StyledDivSelect>
          <Select
            labelId="custom-select-label"
            id="custom-select"
            value={farm}
            sx={{
              position: 'sticky',
              width: '100%',
            }}
            onChange={handleFarmChange}
          >
            {mappedFarms.map((mappedFarm) => {
              return (
                <MenuItem key={mappedFarm.farmId} value={mappedFarm.farmId}>
                  {mappedFarm.name}
                </MenuItem>
              );
            })}
          </Select>
        </StyledDivSelect>
      </StyledDiv>

      <StyledDiv>{getCalendar()}</StyledDiv>
    </StyledFieldSet>
  );

  function getCalendar() {
    let mappedEvents: Array<Event> = allEvents;

    const locales = {
      "en-US": enUS,
    };

    const localizer = dateFnsLocalizer({
      format,
      parse,
      startOfWeek,
      getDay,
      locales,
    });

    const lang = {
      pl: {
        week: "Tydzień",
        day: "Dzień",
        today: "Dzisiaj",
        previous: "Poprzedni",
        next: "Następny",
        showMore: (total: any) => `+${total} zdarzenia`,
      },
    };
    interface Event {
      title: string;
      allDay: boolean;
      start: Date;
      end: Date;
    }
    const { messages } = useMemo(
      () => ({
        messages: lang["pl"],
      }),
      ["pl"]
    );

    return (
      <div className="App">
        <Calendar
          culture={"pl"}
          localizer={localizer}
          messages={messages}
          events={mappedEvents}
          startAccessor="start"
          endAccessor="end"
          views={["month"]}
          style={{ height: 600, width: 1100, margin: "50px" }}
        />
      </div>
    );
  }
}
export { Breeding };
