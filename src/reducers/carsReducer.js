import {
  ADD_CAR,
  REMOVE_CAR,
  GET_ALL_CARS,
  CARS_LOADING
} from "../actions/types";

const initialState = {
  cars: [],
  loading: false,
  errorAdd:'',
  successAdd:'',
  errorRemove:'',
  successRemove:''
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
        errorAdd:'',
        successAdd:'',
        errorRemove:'',
        successRemove:'',
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
            ...state,
            cars:[...state.cars,newCar],
            loading: false,
            errorAdd:'',
            successAdd:`Car number ${action.payload.data.carNumber} Added succesfully`,
          };
        }
        else{
          return {
            ...state,
            cars:[...state.cars],
            loading: false,
            errorAdd:`Car  number ${action.payload.data.carNumber} already exist`,
            successAdd:'',
          };
        }     
    
    case REMOVE_CAR:

      const cars=state.cars.filter((car)=>{
        return action.payload.data.carNumber!==car.carNumber
      })
      return {
        ...state,
        cars,
        loading: false,
        errorRemove:'',
        successRemove:`Car number ${action.payload.data.carNumber} Removed succesfully`,
      };

    default:
      return state;
  }
}
