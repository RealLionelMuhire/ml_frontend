import React, { useState, useEffect, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Box, Typography } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";


const TestCalendar = ({ onTimeSelect }) => {
  const [currentEvents, setCurrentEvents] = useState([]);;
  const [reservationsData, setReservationsData] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}list-reserved-periods/`);
        const { reserved_periods: data } = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setReservationsData(data);
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchData();
  }, []);

  const isSlotReserved = (selectInfo) => {
    const start = selectInfo.start;
    const end = selectInfo.end;

    // Check if the selected slot overlaps with any reserved period
    return reservationsData.some((reservedSlot) => {
      const reservedStart = new Date(reservedSlot.startTime);
      const reservedEnd = new Date(reservedSlot.endTime);

      return (
        (start >= reservedStart && start < reservedEnd) ||
        (end > reservedStart && end <= reservedEnd) ||
        (start <= reservedStart && end >= reservedEnd)
      );
    });
  };

  const workingHours = {
    monday: ["9:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
    tuesday: ["9:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
    wednesday: ["9:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
    thursday: ["9:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
    friday: ["9:00", "10:00", "11:00"],
  };
  
  const getDayName = (dayIndex) => {
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    return days[dayIndex];
  };
  

  const generateWorkingSlots = () => {
    const workingSlots = [];

    for (const day in workingHours) {
      const dayIndex = getDayIndex(day);
      workingHours[day].forEach((hour) => {
        const startTime = hour;
        const endTime = addHour(hour);

        if (!(isInRange(startTime, "00:00", "07:00") || isInRange(startTime, "17:00", "23:59"))) {
          workingSlots.push({ daysOfWeek: [dayIndex], startTime, endTime });
        }
      });
    }

    return workingSlots;
  };



  const addHour = (time) => {
    const [hour, minute] = time.split(":");
    const newHour = parseInt(hour) + 1;
    return `${newHour}:${minute}`;
  };

  const isInRange = (time, startRange, endRange) => {
    return time >= startRange && time < endRange;
  };

  const getDayIndex = (day) => {
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    return days.indexOf(day);
  };

  const isWorkingHourAllowed = (selectInfo) => {
    const startHour = selectInfo.start.getHours();
    const endHour = selectInfo.end.getHours();
    const day = selectInfo.start.getDay();
    const workingHoursForDay = workingHours[getDayName(day)];
  
    return (
      workingHoursForDay &&
      workingHoursForDay.some(
        (hour) => startHour <= parseInt(hour) && endHour > parseInt(hour)
      )
    );
  };

  const reservedEvents = useMemo(() => {
    return reservationsData.map((reservedSlot) => ({
      start: reservedSlot.startTime,
      end: reservedSlot.endTime,
      color: colors.grey[800],
      id: reservedSlot.id,
      title: "Booked",
      // display: "background",
    }));
  }, [reservationsData]);

  const allEvents = useMemo(() => {
    return [...currentEvents, ...reservedEvents];
  }, [currentEvents, reservedEvents]);

  useEffect(() => {
    // Separate handling of current and reserved events
    const filteredCurrentEvents = allEvents.filter(
      (event) => !reservedEvents.some((reservedEvent) => event.id === reservedEvent.id)
    );

    // Avoid triggering infinite loop by checking if state needs to be updated
    if (filteredCurrentEvents.length !== currentEvents.length || !filteredCurrentEvents.every((event, index) => event.id === currentEvents[index].id)) {
      setCurrentEvents(filteredCurrentEvents);
    }
  }, [allEvents, reservedEvents, currentEvents]);

  const eventContent = ({ event }) => (
    <Typography variant="body1" style={{ color: "white" }}>
      {event.title}
    </Typography>
  );

  return (
    <div style={{ width: "500%" }}>
      <Box m="20px" alignItems="center">
        {/* <Header title="TestCalendar" subtitle="Full TestCalendar Interactive Page" /> */}

        <Box display="flex" justifyContent="space-between">
          {/* CALENDAR */}
          <Box
            flex="1 1 100%"
            ml="15px"
            maxWidth="600px"
            width="600%"
            height="342px"
          >
            <FullCalendar
              validRange={{
                start: new Date().toISOString().split("T")[0],
              }}
              height="100%"
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
              }}
              views={{
                timeGridWeek: {
                  duration: { days: 7 },
                  slotDuration: "01:00:00",
                  slotLabelInterval: { hours: 1 },
                  hiddenDays: [0, 6],
                },
              }}
              slotMinTime="08:00:00"
              slotMaxTime="18:00:00"
              businessHours={generateWorkingSlots()}
              initialView="timeGridWeek"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              selectAllow={(selectInfo) => {
                console.log("selectInfo", selectInfo);
                console.log("isSlotReserved(selectInfo)", isSlotReserved(selectInfo));
                console.log("isWorkingHourAllowed(selectInfo)", isWorkingHourAllowed(selectInfo));
                return !isSlotReserved(selectInfo) && isWorkingHourAllowed(selectInfo);
              }}
              select={(selectInfo) => {
                const isSingleSlot =
                  selectInfo.start.getTime() === selectInfo.end.getTime() - 3600000;

                if (isSingleSlot) {
                  const selectedSlot = {
                    start: selectInfo.start,
                    end: selectInfo.end,
                  };

                  onTimeSelect(selectedSlot);
                } else {
                  alert("Please select only a single slot.");
                  selectInfo.jsEvent.preventDefault();
                }
              }}
              events={allEvents}
              eventContent={eventContent}
              slotDuration="01:00:00"
              eventBackgroundColor="#378006"
              slotLabelInterval={{ hours: 1 }}
              slotLabelFormat={{
                hour: "numeric",
                minute: "2-digit",
                omitZeroMinute: false,
                meridiem: "short",
                hour12: true,
              }}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default TestCalendar;
