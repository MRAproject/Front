import { LOGIN,LOGIN_LOADING,LOGOUT_LOADING,LOGOUT } from "../actions/types";

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
              capacity:action.payload.data.data.capacity
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
  default:
  return state;
  }
}
