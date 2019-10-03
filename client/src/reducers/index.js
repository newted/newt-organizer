import { combineReducers } from "redux";
import authReducer from "./authReducer";
import courseReducer from "./courseReducer";
import learningMapReducer from "./learningMapReducer";
import knowledgeMapReducer from "./knowledgeMapReducer";
import quizReducer from "./quizReducer";
import sidebarReducer from "./sidebarReducer";
import userContentReducer from "./userContentReducer";
import { RESET_APP } from "../actions/authedUser";

const allReducers = combineReducers({
  auth: authReducer,
  courses: courseReducer,
  learningMap: learningMapReducer,
  knowledgeMap: knowledgeMapReducer,
  quizzes: quizReducer,
  sidebar: sidebarReducer,
  userContent: userContentReducer
});

const rootReducer = (state, action) => {
  if (action.type === RESET_APP) {
    // Don't reset auth (part of diff dispatch)
    const { auth } = state;
    // Only keeps auth state, rest are undefined, so when it's passed to
    // allReducers call the rest of them will be reset to defaults
    state = { auth };
  }

  return allReducers(state, action);
};

export default rootReducer;
