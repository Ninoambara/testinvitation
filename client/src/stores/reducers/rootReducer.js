import { combineReducers } from "redux";
import jobReducer from "./jobsReducer";

const rootReducer = combineReducers({
  jobs: jobReducer,
});

export default rootReducer;
