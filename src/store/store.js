import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import rootReducer from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";

// const loadState = () => {
//   try {
//     const serializeState = sessionStorage.getItem("userData");
//     if (serializeState === null) {
//       return undefined;
//     }
//     return JSON.parse(serializeState);
//   } catch (e) {
//     return undefined;
//   }
// };

const middleware = [promiseMiddleware];
const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
