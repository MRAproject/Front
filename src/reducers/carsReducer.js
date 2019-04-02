import {
  ADD_CAR,
  REMOVE_CAR,
  GET_ALL_CARS,
  CARS_LOADING,
  GET_ALL_TIMES,
  LOGOUT
} from "../actions/types";

const initialState = {
  cars: [],
  times:[],
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
        errorAdd:'',
        successAdd:'',
        errorRemove:'',
        successRemove:'',
        loading: true
      };
    case GET_ALL_CARS:
      return {
        ...state,
        errorAdd:'',
        successAdd:'',
        errorRemove:'',
        successRemove:'',
        cars: action.payload.data.data,
        loading: false
      };

    case GET_ALL_TIMES:
      return{
        ...state,
        times:[...action.payload.data.data],
      }
      
    case ADD_CAR:
        if(action.payload.status){
          const newCar=[action.payload.data.username,action.payload.data.carNumber,0]
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
        return action.payload.data['carNumber']!==car[1]
      })
      return {
        ...state,
        cars,
        loading: false,
        errorRemove:'',
        successRemove:`Car number ${action.payload.data.carNumber} Removed succesfully`,
      };

    case LOGOUT:
    return {
      ...state,
      cars:[],
      times:[],
      loading: false
    };

    default:
      return state;
  }
}
