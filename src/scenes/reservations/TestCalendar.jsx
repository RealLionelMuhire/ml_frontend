import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Box, Typography } from "@mui/material";
import Header from "../../components/Header";

const TestCalendar = () => {
  const [currentEvents, setCurrentEvents] = useState([]);

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

  return (
    <Box m="20px" alignItems="center">
      <Header title="TestCalendar" subtitle="Full TestCalendar Interactive Page" />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px" maxWidth="600px">
          <FullCalendar
            height="51.3vh"
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
            select={(selectInfo) => {
              const isSingleSlot = selectInfo.start.getTime() === selectInfo.end.getTime() - 3600000;

              if (isSingleSlot) {
                console.log('Selected a single slot:', selectInfo.start, selectInfo.end);
              } else {
                alert('Please select only a single slot.');
                selectInfo.jsEvent.preventDefault();
              }
            }}
            eventsSet={(events) => setCurrentEvents(events)}
            slotDuration="01:00:00"
            slotLabelInterval={{ hours: 1 }}
            selectAllow={(selectInfo) => {
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
            }}
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
  );
};

export default TestCalendar;