import axios from "axios";
import firebase from "firebase";

export const FETCH_NEW_COURSES = "FETCH_NEW_COURSES";
export const CREATE_NEW_COURSE = "CREATE_NEW_COURSE";

// With dispatch because it's called in class component
export const fetchCourses = () => async dispatch => {
  // Get current user token
  const idToken = await firebase.auth().currentUser.getIdToken(true);
  // Make request to fetch courses
  const res = await axios.get("/api/courses", {
    headers: { Authorization: idToken }
  });

  dispatch({ type: FETCH_NEW_COURSES, payload: res.data });

  return res.data;
};

// No dispatch because it's used in functional component (hooks)
export async function createCourse(values) {
  // Get current user token
  const idToken = await firebase.auth().currentUser.getIdToken(true);
  // Make request to create course
  const res = await axios.post("/api/courses/create", values, {
    headers: { Authorization: idToken }
  });
  return res.data;
}
