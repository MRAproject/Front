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
              username:action.payload.data.body[0],
              password:action.payload.data.body[1],
              firstName:action.payload.data.body[2],
              lastName:action.payload.data.body[3],
              capacity:action.payload.data.body[4],
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
    const{username,firstName,lastName,capacity,password}=action.payload.data.data;
    var userData={
      username,
      firstName,
      lastName,
      capacity,
      password
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
