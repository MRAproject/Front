import {
  ADD_CAR,
  REMOVE_CAR,
  GET_ALL_CARS,
  CARS_LOADING
} from "../actions/types";

const initialState = {
  cars: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CARS_LOADING:

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
        if(action.payload.data.status!=='failed'){
          const newCar={
              carNumber:action.payload.data.carNumber,
              isInside:0,
              username:action.payload.data.username    
          }
          return {
            cars:[...state.cars,newCar],
            loading: false
          };
        }
        else{
          return {
            cars:[...state.cars],
            loading: false
          };
        }     
    
    case REMOVE_CAR:

      const cars=state.cars.filter((car)=>{
        return action.payload.data.carNumber!==car.carNumber
      })
      return {
        cars,
        loading: false
      };

    default:
      return state;
  }
}
