import axios from "axios";
import config from "../config/config";

import { GET_ALL_CARS, ADD_CAR, GET_ALL_CARS_LOADING } from "./types";

export const getAllCars = username => {
  const response = axios.get(
    `${config.host}/get_all_user_cars?username=${username}`
  );
  return {
    type: GET_ALL_CARS,
    payload: response
  };
};
export const getAllCarsLoading = () => {
  return {
    type: GET_ALL_CARS_LOADING
  };
};
export const addCar = data => {
  const response = axios.post(`${config.host}/add_car`, data);
  return {
    type: ADD_CAR,
    payload: response
  };
};
