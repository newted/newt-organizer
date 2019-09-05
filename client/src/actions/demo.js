import { setAuthedUser } from "./authedUser";
// Demo data
import { _getPrograms, _getCourses } from "../utils/demoData";

export const GET_DEMO_PROGRAMS = "GET_DEMO_PROGRAMS";
export const GET_DEMO_COURSES = "GET_DEMO_COURSES";

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
  const programs = await _getPrograms();
  const courses = await _getCourses();

  // Add programs and courses data to store
  dispatch({
    type: GET_DEMO_PROGRAMS,
    payload: programs
  });
  dispatch({
    type: GET_DEMO_COURSES,
    payload: courses
  });
};
