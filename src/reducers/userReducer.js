import { LOGIN,LOGIN_LOADING } from "../actions/types";

const initialState = {
  userData: {},
  loading: false
};

// export default function(state = initialState, action) {
//   switch (action.type) {
//   case GET_USER:
//     return {
//       userData: action.payload,
//       loading: false
//     };
//   default:
//   return state;
//   }
// }
export default function(state = initialState, action) {
  switch (action.type) {
  case LOGIN:
        const userData={
            username:action.payload.data.data.username,
            firstName:action.payload.data.data.firstName,
            lastName:action.payload.data.data.lastName,
            capacity:action.payload.data.data.capacity
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
  default:
  return state;
  }
}
