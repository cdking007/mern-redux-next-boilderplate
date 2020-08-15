import { SET_USER, LOGOUT_USER, FETCH_USER } from "../types";

const initialState = {
  username: null,
  isAuthenticated: null,
  token: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_USER:
      return {
        username: payload.username,
        isAuthenticated: true,
        token: payload.token,
      };
    case LOGOUT_USER:
      return { ...initialState };
    case FETCH_USER:
      return {
        username: payload.username,
        isAuthenticated: true,
        token: payload.token,
      };
    default:
      return state;
  }
}
