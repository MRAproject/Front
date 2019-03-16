import { LOGIN,LOGIN_LOADING,LOGOUT_LOADING,LOGOUT,EDIT,EDIT_LOADING } from "../actions/types";

const initialState = {
  userData: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
  case LOGIN:

        let userData=state.userData;
        if(action.payload.data.status==='authorized'){
            userData={
              username:action.payload.data.data.username,
              firstName:action.payload.data.data.firstName,
              lastName:action.payload.data.data.lastName,
              capacity:action.payload.data.data.capacity,
              password:action.payload.data.data.password
          }
        }
        return {
          userData,
          loading: false
        };
        

  case LOGIN_LOADING:
    return {
      ...state,
      loading: true
    };
  case LOGOUT:
    sessionStorage.removeItem('userData');
    return {
      userData:{},
      loading: false
    };
  case LOGOUT_LOADING:
    return {
      ...state,
      loading: true
    };

  case EDIT:
    var userData={
      username:action.payload.data.data.username,
      firstName:action.payload.data.data.firstName,
      lastName:action.payload.data.data.lastName,
      capacity:action.payload.data.data.capacity,
      password:action.payload.data.data.password
    }
    sessionStorage.setItem('userData',JSON.stringify(userData))
    return{
      userData,
      loading: false
    }

  case EDIT_LOADING:

    return{
      ...state,
      loading:true
    }
  default:
  return state;
  }
}
