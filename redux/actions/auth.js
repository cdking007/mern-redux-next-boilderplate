import { SET_USER, LOGOUT_USER, FETCH_USER } from "../types/index";
import axios from "axios";
import catchErrors from "../../utils/catchErrors";
import { doALert } from "./index";
import { baseUrl } from "../../utils/baseUrl";
import cookies from "js-cookie";
import router from "next/router";

export const doLogin = (username2, password) => async (dispatch) => {
  try {
    const resp = await axios.post(`${baseUrl}/auth/login`, {
      username: username2,
      password,
    });
    const username = resp.data.user.username;
    const token = resp.data.token;
    cookies.set("token", token);
    dispatch(setUser(username, token));
    dispatch(doALert("Login successfully", "success"));
  } catch (error) {
    catchErrors(error, (err) => {
      if (err.message) {
        dispatch(doALert(err.message, "danger"));
      } else {
        dispatch(doALert(err.toString(), "danger"));
      }
    });
  }
};

export const doRegister = (email, username, password) => async (dispatch) => {
  try {
    const resp = await axios.post(`${baseUrl}/auth/signup`, {
      email: email,
      username: username,
      password: password,
    });
    dispatch(doALert("Account registered successfully", "success"));
    router.push("/auth/login");
  } catch (error) {
    catchErrors(error, (err) => {
      if (err.message) {
        dispatch(doALert(err.message, "danger"));
      } else {
        dispatch(doALert(err.toString(), "danger"));
      }
    });
  }
};

export const doLogout = (token) => async (dispatch) => {
  try {
    const resp = await axios.post(
      `${baseUrl}/auth/logout`,
      {},
      { headers: { Authorization: token } }
    );
    cookies.remove("token");
    dispatch(setLogout());
    dispatch(doALert("Logout successfully", "success"));
    router.push("/auth/login");
  } catch (error) {
    catchErrors(error, (err) => {
      if (err.message) {
        dispatch(doALert(err.message, "danger"));
      } else {
        dispatch(doALert(err.toString(), "danger"));
      }
    });
  }
};

export const fetchAccount = (token) => async (dispatch) => {
  try {
    const resp = await axios.get(`${baseUrl}/account`, {
      headers: { Authorization: token },
    });
    dispatch(setUser(resp.data.user.username, token));
  } catch (error) {
    catchErrors(error, (err) => {
      if (err.message) {
        cookies.remove("token");
        dispatch(doALert(err.message, "danger"));
        router.push("/auht/login");
      } else {
        dispatch(doALert(err.toString(), "danger"));
      }
    });
  }
};

export const setLogout = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const setUser = (username, token) => {
  return {
    type: SET_USER,
    payload: {
      username,
      token,
    },
  };
};
