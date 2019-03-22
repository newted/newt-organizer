import { setAuthedUser } from "./authedUser";
// Demo data
import { _getPrograms, _getCourses } from "../utils/demoData";

export const GET_DEMO_PROGRAMS = "GET_DEMO_PROGRAMS";
export const GET_DEMO_COURSES = "GET_DEMO_COURSES";

export const signInDemoUser = history => async dispatch => {
  const user = {
    _id: "demouser",
    name: {
      givenName: "Demo",
      familyName: "User"
    },
    email: "demouser@newt.com"
  };

  dispatch(setAuthedUser(user));

  history.push("/dashboard");

  const programs = await _getPrograms();
  const courses = await _getCourses();

  dispatch({
    type: GET_DEMO_PROGRAMS,
    payload: programs
  });
  dispatch({
    type: GET_DEMO_COURSES,
    payload: courses
  });
};
