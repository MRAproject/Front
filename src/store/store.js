import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import rootReducer from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const loadState = () => {
  try {
    const serializeState = sessionStorage.getItem("userData");
    if (serializeState === null) {
      return undefined;
    }
    const userData={
      userData:JSON.parse(serializeState),
      loading:false
    }
    return userData;
  } catch (e) {
    return undefined;
  }
};

const middleware = [promiseMiddleware];
const store = createStore(
  rootReducer,{userData:loadState()},
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
