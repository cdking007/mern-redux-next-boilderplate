import { SET_ALERT, REMOVE_ALERT } from "../types";
import { v4 as uuidv4 } from "uuid";

export const doALert = (message, alertType) => (dispatch) => {
  const id = uuidv4();
  dispatch(setAlert(message, alertType, id));

  setTimeout(() => {
    dispatch(removeAlert(id));
  }, 500);
};

export function setAlert(message, alertType, id) {
  return {
    type: SET_ALERT,
    payload: {
      id,
      message,
      alertType,
    },
  };
}

export function removeAlert(alertId) {
  return {
    type: REMOVE_ALERT,
    payload: alertId,
  };
}
