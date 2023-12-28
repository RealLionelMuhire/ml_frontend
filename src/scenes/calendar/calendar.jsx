import { useState, useEffect } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import {
  useGetEventsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} from "../../state/api";
// import moment from "moment-timezone";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);

  const { data: eventsData } = useGetEventsQuery();
  const [createEvent] = useCreateEventMutation();
  const [updateEvent] = useUpdateEventMutation();
  const [deleteEvent] = useDeleteEventMutation();

  useEffect(() => {
    if (eventsData) {
      setCurrentEvents(eventsData);
    }
  }, [eventsData]);

  const handleDateClick = async (selected) => {
    const title = prompt("Please enter a new title for the event");

    if (title) {
      const newEvent = {
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      };

      try {
        const response = await createEvent(newEvent);
        setCurrentEvents([...currentEvents, response]);
      } catch (error) {
        console.error("Error creating event:", error);
      }
    }
  };

  const handleEventClick = async (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      try {
        await deleteEvent(selected.event.id);
        setCurrentEvents(
          currentEvents.filter((event) => event.id !== selected.event.id)
        );
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  const handleEventDrop = async (dropInfo) => {
    const { event } = dropInfo;
    console.log("event:", event);

    const eventId = event._def.publicId;

    console.log("selected event id:", eventId);
    if (eventId) {
      try {
        await updateEvent({
          eventId: eventId,
          updatedEvent: {
            title: event.title,
            start: event.start,
            end: event.end,
          },
        });
      } catch (error) {
        console.error("Error updating event:", error);
      }
    }
  };

  return (
    <Box m="20px">
      <Header title="Schedule" subtitle="Setting and Interactive Plans" />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          gridColumn="span 1"
          gridRow="span 4"
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
          overflowY="auto"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            events={currentEvents}
            eventDrop={handleEventDrop}
            timezone="Africa/Kigali"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
