 import { LOGIN,LOGIN_LOADING,LOGOUT,LOGOUT_LOADING,EDIT,EDIT_LOADING } from "./types";
 import config from "../config/config";
 import axios from "axios";

// export const getUser = () => {
//   const serializeState = JSON.parse(sessionStorage.getItem("userData"));
//   return {
//     type: GET_USER,
//     payload: serializeState
//   };
// };


  
export const editUserLoading = () => {
  return {
    type: EDIT_LOADING
  };
};  
export const editUser = (data) => {
  const response = axios.post(`${config.host}/edit_user`, data);
  return {
    type: EDIT,
    payload: response
  };
};

export const loginLoading = () => {
    return {
      type: LOGIN_LOADING
    };
};
  
export const login = (data) => {
  const response = axios.post(`${config.host}/login`, data);
  return {
    type: LOGIN,
    payload: response
  };
};

export const logoutLoading = () => {
  return {
    type: LOGOUT_LOADING
  };
};
export const logout = () => {
  return {
    type: LOGOUT
  };
};

