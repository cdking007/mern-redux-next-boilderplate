import { SET_ALERT, REMOVE_ALERT, CLEAR_ALERT } from "../types";

/**
 * {
 *  id:1,
 *  msg:"this is msg",
 *  alertType:"success"
 * }
 */

const intialState = [];

export default function (state = intialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      const filteredState = state.filter((state) => state.id !== payload);
      return [...filteredState];
    case CLEAR_ALERT:
      return [];
    default:
      return state;
  }
}
