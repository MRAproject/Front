import {
  ADD_CAR,
  REMOVE_CAR,
  GET_ALL_CARS,
  GET_ALL_CARS_LOADING
} from "../actions/types";

const initialState = {
  cars: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CARS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ALL_CARS:
      return {
        cars: action.payload.data.data,
        loading: false
      };
    case ADD_CAR:
      return {
        ...state,
        loading: false
      };
    case REMOVE_CAR:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
