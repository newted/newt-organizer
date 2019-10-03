import { setAuthedUser } from "./authedUser";
// Demo data
import {
  _getCourses,
  _getUserContent,
  _getLearningMap,
  _getKnowledgeMap
} from "../utils/demoData";
import { REQUEST_COURSES } from "./courses";
import { REQUEST_USER_CONTENT } from "./userContent";
import { REQUEST_LEARNING_MAP, GET_LEARNING_MAP } from "./learningMap";
import { REQUEST_KNOWLEDGE_MAP, GET_KNOWLEDGE_MAPS } from "./knowledgeMap";

export const GET_DEMO_COURSES = "GET_DEMO_COURSES";
export const GET_DEMO_USER_CONTENT = "GET_DEMO_USER_CONTENT";

// Function to mimic sign-in flow for demo user
export const signInDemoUser = history => async dispatch => {
  // User data
  const user = {
    _id: "demouser",
    firstName: "Demo",
    lastName: "User",
    dateCreated: new Date(),
    email: "demouser@newt.com"
  };

  // Add user data to store
  dispatch(setAuthedUser(user));

  // Redirect to dashbaord
  history.push("/dashboard");

  dispatch({ type: REQUEST_COURSES });
  dispatch({ type: REQUEST_USER_CONTENT });
  dispatch({ type: REQUEST_LEARNING_MAP });
  dispatch({ type: REQUEST_KNOWLEDGE_MAP });

  // Get demo programs and courses data
  const courses = await _getCourses();
  const userContent = await _getUserContent();
  const learningMap = await _getLearningMap();
  const knowledgeMap = await _getKnowledgeMap();

  // Add courses and user content data to store
  dispatch({
    type: GET_DEMO_COURSES,
    payload: courses
  });
  dispatch({
    type: GET_DEMO_USER_CONTENT,
    payload: userContent
  });
  dispatch({
    type: GET_LEARNING_MAP,
    payload: learningMap
  });
  dispatch({
    type: GET_KNOWLEDGE_MAPS,
    payload: knowledgeMap
  });
};
