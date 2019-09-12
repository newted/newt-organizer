import { combineReducers } from "redux";
import authReducer from "./authReducer";
import courseReducer from "./courseReducer";
import learningMapReducer from "./learningMapReducer";
import knowledgeMapReducer from "./knowledgeMapReducer";
import quizReducer from "./quizReducer";
import sidebarReducer from "./sidebarReducer";
import userContentReducer from "./userContentReducer";

export default combineReducers({
  auth: authReducer,
  courses: courseReducer,
  learningMap: learningMapReducer,
  knowledgeMap: knowledgeMapReducer,
  quizzes: quizReducer,
  sidebar: sidebarReducer,
  userContent: userContentReducer
});
