import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import tabReducer from "./tabReducer";
import { END_SESSION } from "../actions/login";

const appReducer = combineReducers({
  user: loginReducer,
  tab: tabReducer,
});

const rootReducer = (state, action) => {
  if (action.type === END_SESSION) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
