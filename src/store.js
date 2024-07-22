import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './api'; // rootReducer is combining all slices
import { usersApi } from './api/usersApi';
import { clientsApi } from './api/clientsApi';
import { servicesApi } from './api/servicesApi';
import { userProfileApi } from './api/userProfileApi';
import { dashboardApi } from './api/dashboardApi';
import { eventsApi } from './api/eventsApi';
import { alertsApi } from './api/alertsApi';
import { reportsApi } from './api/reportsApi';
import { reservationsApi } from './api/reservationsApi';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      usersApi.middleware,
      clientsApi.middleware,
      servicesApi.middleware,
      userProfileApi.middleware,
      dashboardApi.middleware,
      eventsApi.middleware,
      alertsApi.middleware,
      reportsApi.middleware,
      reservationsApi.middleware
    ),
});
