// reducers.js
import { combineReducers } from 'redux';
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from './actions';

// Authentication reducer
const authReducer = (state = { isAuthenticated: false, user: null }, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers if needed
});

export default rootReducer;
