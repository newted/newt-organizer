import { setAuthedUser } from "./authedUser";
// Demo data
import { _getCourses, _getUserContent } from "../utils/demoData";

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

  // Get demo programs and courses data
  const courses = await _getCourses();
  const userContent = await _getUserContent();

  // Add courses and user content data to store
  dispatch({
    type: GET_DEMO_COURSES,
    payload: courses
  });
  dispatch({
    type: GET_DEMO_USER_CONTENT,
    payload: userContent
  });
};
