import { combineReducers } from "redux";
import authReducer from "./authReducer";
import programReducer from "./programReducer";
import courseReducer from "./courseReducer";
import contentReducer from "./contentReducer";
import knowledgeMapReducer from "./knowledgeMapReducer";
import learningMapReducer from "./learningMapReducer";
import sidebarReducer from "./sidebarReducer";

export default combineReducers({
  auth: authReducer,
  programs: programReducer,
  courses: courseReducer,
  content: contentReducer,
  knowledgeMap: knowledgeMapReducer,
  learningMap: learningMapReducer,
  sidebar: sidebarReducer
});
