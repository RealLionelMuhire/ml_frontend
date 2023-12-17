// redux/reducers.js
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from './actions';

// Initial state
const initialState = {
  isAuthenticated: false,
  user: null,
};

// Reducer function
const authReducer = (state = initialState, action) => {
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

export default authReducer;
