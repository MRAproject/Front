import {
  ADD_CAR,
  REMOVE_CAR,
  GET_ALL_CARS,
  CARS_LOADING,
  GET_TIMES,
  LOGOUT
} from "../actions/types";

const initialState = {
  cars: [],
  times: [],
  loading: false,
  errorAdd: "",
  successAdd: "",
  errorRemove: "",
  successRemove: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CARS_LOADING:
      return {
        ...state,
        errorAdd: "",
        successAdd: "",
        errorRemove: "",
        successRemove: "",
        loading: true
      };
    case GET_ALL_CARS:
      const carss = action.payload.data.data.map(element => {
        const obj = {
          username: element[0],
          carNumber: element[1],
          isInside: element[2]
        };
        return obj;
      });
      return {
        ...state,
        errorAdd: "",
        successAdd: "",
        errorRemove: "",
        successRemove: "",
        cars: [...carss],
        loading: false
      };

    case GET_TIMES:
      const times = action.payload.data.data.map(element => {
        const obj = {
          username: element[0],
          carNumber: element[1],
          enter: element[2],
          exit: element[3]
        };
        return obj;
      });

      return {
        ...state,
        times: [...times.reverse()]
      };

    case ADD_CAR:
      if (action.payload.data.status === "failed") {
        return {
          ...state,
          loading: false,
          errorAdd: `${action.payload.data.message}`,
          successAdd: ""
        };
      } else {
        const newCar = {
          username: action.payload.data.username,
          carNumber: action.payload.data.carNumber,
          isInside: 0
        };
        return {
          ...state,
          cars: [...state.cars, newCar],
          loading: false,
          errorAdd: "",
          successAdd: `Car number ${
            action.payload.data.carNumber
          } Added succesfully`
        };
      }
    case REMOVE_CAR:
      const cars = state.cars.filter(car => {
        return action.payload.data["carNumber"] !== car["carNumber"];
      });
      return {
        ...state,
        cars,
        loading: false,
        errorRemove: "",
        successRemove: `Car number ${
          action.payload.data.carNumber
        } Removed succesfully`
      };

    case LOGOUT:
      return {
        ...state,
        cars: [],
        times: [],
        loading: false
      };

    default:
      return state;
  }
}
