import axios from "axios";
import config from "../config/config";

import { GET_ALL_CARS, ADD_CAR, CARS_LOADING, REMOVE_CAR, GET_ALL_TIMES} from "./types";

export const getAllCars = username => {
  const response = axios.get(
    `${config.host}/get_all_user_cars?username=${username}`
  );
  return {
    type: GET_ALL_CARS,
    payload: response
  };
};

export const carsLoading = () => {
  return {
    type: CARS_LOADING
  };
};

export const get_all_times=(username)=>{
  const response = axios.get(`${config.host}/get_all_times?username=${username}`);
      
  return {
      type: GET_ALL_TIMES,
      payload: response
  };
}
export const addCar = data => {

    const response = axios.post(`${config.host}/add_car`, data);
    return {
        type: ADD_CAR,
        payload: response
    };
    
};

export const removeCar = data => {

  const response = axios.post(`${config.host}/remove_car`, data);

  return {
    type: REMOVE_CAR,
    payload: response
  };
};

