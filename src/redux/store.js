// store.js
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import authReducer from './reducers';

// Create the Redux store using configureStore
const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers if needed
  },
  middleware: [thunk],
});

export default store;
