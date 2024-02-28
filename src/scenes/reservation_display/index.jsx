import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Box, ListItemText, Typography, useTheme, Button } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import {
  useUpdateReservationMutation,
  useDeleteReservationMutation,
  useGetFutureReservationsQuery,
  useGetReservationsQuery,
  useCreateReservationMutation,
} from "../../state/api";
import moment from "moment";
import { Link } from "react-router-dom";



const ReservationDisplay = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);

  const { data: allEventsData } = useGetFutureReservationsQuery();
  const { data: eventsData } = useGetReservationsQuery();
  const [createEvent] = useCreateReservationMutation();
  const [updateEvent] = useUpdateReservationMutation();
  const [deleteEvent] = useDeleteReservationMutation();

  const mapEventsForCalendar = (events) => {
    return events.map((event) => ({
      id: event.id,
      title: event.fullName,
      start: new Date(event.startTime).toISOString(),
      end: new Date(event.endTime).toISOString(),
    }));
  };
  
  useEffect(() => {
    if (allEventsData) {
      setCurrentEvents(allEventsData);

      // Check if eventsData is an array before mapping
      if (Array.isArray(eventsData)) {
        setCalendarEvents(mapEventsForCalendar(eventsData));
      }
    }
  }, [allEventsData, eventsData]);

  const handleDateClick = async (selected) => {
    const servicesToDiscuss = prompt("Please enter a new Title for the event");

    const endMinusOneSecond = new Date(selected.endStr);
    endMinusOneSecond.setSeconds(endMinusOneSecond.getSeconds() - 1);

    if (servicesToDiscuss) {
      const newEvent = {
        servicesToDiscuss,
        startTime: selected.startStr,
        endTime: endMinusOneSecond.toISOString(),
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
        `Are you sure you want to delete the event '${selected.event.servicesToDiscuss}'`
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
            servicesToDiscuss: event.servicesToDiscuss,
            startTime: event.startTime,
            endTime: event.endTime,
          },
        });
      } catch (error) {
        console.error("Error updating event:", error);
      }
    }
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Reservations" subtitle="Setting and Interactive Reservation" />
        <Box display="flex" justifyContent="end">
            <Button type="submit" color="secondary" variant="contained">
              <Link to="/client-reservations">Back to Reservation List</Link>
            </Button>
          </Box>
      </Box>

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          height="75vh"
          gridColumn="span 1"
          gridRow="span 4"
          flex="1 1 30%"
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
              Upcoming Bookings
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
                    {event.fullName}
                  </Typography>
                }
                secondary={
                  <Typography
                    color={colors.grey[100]}
                    variant="h6"
                    fontWeight="400"
                  >
                    {event.reserved_period}
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
            views={{
              dayGridMonth: {
                hiddenDays: [0, 6],
              },
              timeGridWeek: {
                duration: { days: 7 },
                slotLabelInterval: { hours: 1 },
                hiddenDays: [0, 6],
              },
            }}
            slotMinTime="08:00:00"
            slotMaxTime="18:00:00"
            eventDisplay={{
              popover: function (arg) {
                return {
                  backgroundColor: 'your_custom_background_color',
                  color: 'your_custom_font_color',
                  content: function () {
                    const div = document.createElement('div');
                    div.innerHTML = arg.event.servicesToDiscuss;
                    return div;
                  },
                };
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ReservationDisplay;
