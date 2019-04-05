import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading";
import authReducer from "./authReducer";
import programReducer from "./programReducer";
import courseReducer from "./courseReducer";
import sidebarReducer from "./sidebarReducer";

export default combineReducers({
  auth: authReducer,
  loadingBar: loadingBarReducer,
  programs: programReducer,
  courses: courseReducer,
  sidebar: sidebarReducer
});
