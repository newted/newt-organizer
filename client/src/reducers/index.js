import { combineReducers } from "redux";
import authReducer from "./authReducer";
import programReducer from "./programReducer";
import courseReducer from "./courseReducer";
import learningMapReducer from "./learningMapReducer";
import knowledgeMapReducer from "./knowledgeMapReducer";
import quizReducer from "./quizReducer";
import sidebarReducer from "./sidebarReducer";

export default combineReducers({
  auth: authReducer,
  programs: programReducer,
  courses: courseReducer,
  learningMap: learningMapReducer,
  knowledgeMap: knowledgeMapReducer,
  quizzes: quizReducer,
  sidebar: sidebarReducer
});
