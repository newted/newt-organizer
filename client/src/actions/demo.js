import { setAuthedUser } from "./authedUser";
// Demo data
import { _getPrograms, _getCourses } from "../utils/demoData";

export const GET_DEMO_PROGRAMS = "GET_DEMO_PROGRAMS";
export const GET_DEMO_COURSES = "GET_DEMO_COURSES";

const getPrograms = payload => {
  return {
    type: GET_DEMO_PROGRAMS,
    payload
  };
};

const getCourses = payload => {
  return {
    type: GET_DEMO_COURSES,
    payload
  };
};

export const signInDemoUser = history => async dispatch => {
  const user = {
    _id: "demouser",
    firstName: "Demo",
    lastName: "User",
    email: "demouser@newt.com"
  };

  dispatch(setAuthedUser(user));

  history.push("/dashboard");

  const programs = await _getPrograms();
  const courses = await _getCourses();

  dispatch(getPrograms(programs));
  dispatch(getCourses(courses));
};
