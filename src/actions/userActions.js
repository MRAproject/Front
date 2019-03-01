 import { LOGIN,LOGIN_LOADING } from "./types";
 import config from "../config/config";
 import axios from "axios";

// export const getUser = () => {
//   const serializeState = JSON.parse(sessionStorage.getItem("userData"));
//   return {
//     type: GET_USER,
//     payload: serializeState
//   };
// };



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

