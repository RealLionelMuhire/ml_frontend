import React, { useState } from "react";
import {
  Box,
  Button,
} from "@mui/material";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import ClientPastReservations from "./ClientPastReservations";
import ClientFutureReservations from "./ClientFutureReservations";

const ClientReservationsIndex = () => {
  const [isPastReservations, setIsPastReservations] = useState(false);

  const toggleReservationsType = () => {
    setIsPastReservations(!isPastReservations);
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title={`${isPastReservations ? "Past" : "Future"} Reservations`}
          subtitle={`List of Clients ${isPastReservations ? "Past" : "Future"} Reservations`}
        />
        <Box display="flex" justifyContent="left" mt="20px" ml="10px">
          <Button
            type="button"
            color="secondary"
            variant="contained"
            onClick={toggleReservationsType}
          >
            Go To {isPastReservations ? "Future" : "Past"} Reservations
          </Button>
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            <Link to="/reservations-display">Display in Calendar</Link>
          </Button>
        </Box>
      </Box>
      <Box>
        {isPastReservations ? <ClientPastReservations /> : <ClientFutureReservations />}
      </Box>
    </Box>
  );
};

export default ClientReservationsIndex;
