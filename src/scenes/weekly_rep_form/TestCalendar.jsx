// TestCalendar.jsx

import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Box, Typography } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";

const TestCalendar = ({ onTimeSelect }) => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
            maxWidth="550px"
            width="600%"
            height="342px"
          >
            <FullCalendar
              validRange={{
                // start: new Date().toISOString().split("T")[0],
              }}
              height="100%"
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
              }}
              views={{
                timeGridWeek: {
                  duration: { days: 7 },
                  slotDuration: "01:00:00",
                  slotLabelInterval: { hours: 1 },
                },
              }}
              slotMinTime="00:00:00"
              slotMaxTime="24:00:00"
              initialView="timeGridWeek"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              selectAllow={() => true} // Allow selection of any slot
              select={(selectInfo) => {
                const selectedSlot = {
                  start: selectInfo.start,
                  end: selectInfo.end,
                };

                onTimeSelect(selectedSlot);
              }}
              events={currentEvents}
              eventContent={eventContent}
              slotDuration="01:00:00"
              eventBackgroundColor={colors.greenAccent[500]}
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
