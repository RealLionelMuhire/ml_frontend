import { useState, useEffect } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Box, ListItemText, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import {
  useGetEventsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
  useGetAllEventsQuery,
} from "../../state/api";
import moment from "moment";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);

  const { data: allEventsData } = useGetAllEventsQuery();
  const { data: eventsData } = useGetEventsQuery();
  const [createEvent] = useCreateEventMutation();
  const [updateEvent] = useUpdateEventMutation();
  const [deleteEvent] = useDeleteEventMutation();

  const areDatesEqual = (date1, date2) => {
    const formattedDate1 = formatDate(date1, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const formattedDate2 = formatDate(date2, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    return formattedDate1 === formattedDate2;
  };

  useEffect(() => {
    if (allEventsData) {
      setCurrentEvents(allEventsData);
      setCalendarEvents(eventsData);
    }
  }, [allEventsData, eventsData]);

  const handleDateClick = async (selected) => {
    const title = prompt("Please enter a new title for the event");

    const endMinusOneSecond = new Date(selected.endStr);
    endMinusOneSecond.setSeconds(endMinusOneSecond.getSeconds() - 1);

    if (title) {
      const newEvent = {
        title,
        start: selected.startStr,
        end: endMinusOneSecond.toISOString(),
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
          height="75vh"
          gridColumn="span 1"
          gridRow="span 4"
          flex="1 1 25%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Upcoming Events
            </Typography>
          </Box>
          {currentEvents.map((event) => (
            <Box
              key={event.id}
              sx={{
                backgroundColor: colors.grey[700],
                margin: "10px 0",
                borderRadius: "5px",
              }}
            >
              <ListItemText
                primary={
                  <Typography
                    variant="h5"
                    fontWeight="700"
                  >
                    {event.title}
                  </Typography>
                }
                secondary={
                  <Typography
                    color={colors.grey[100]}
                    variant="h6"
                    fontWeight="400"
                  >
                    {areDatesEqual(event.start, event.end)
                      ? `${formatDate(event.start, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        })} - ${formatDate(event.end, {
                          hour: "numeric",
                          minute: "numeric",
                        })}`
                      : `${formatDate(event.start, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })} - ${formatDate(event.end, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}`}
                  </Typography>
                }
              />
            </Box>
          ))}
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
            events={calendarEvents}
            eventDrop={handleEventDrop}
            initialDate={moment().toISOString()}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
