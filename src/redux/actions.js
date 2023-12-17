// redux/actions.js

// Action types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

// Action creators
export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: { user },
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});
