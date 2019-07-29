import { combineReducers } from "redux";
import authReducer from "./authReducer";
import programReducer from "./programReducer";
import courseReducer from "./courseReducer";
import contentReducer from "./contentReducer";
import sidebarReducer from "./sidebarReducer";

export default combineReducers({
  auth: authReducer,
  programs: programReducer,
  courses: courseReducer,
  content: contentReducer,
  sidebar: sidebarReducer
});
