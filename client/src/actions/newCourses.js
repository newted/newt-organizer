import axios from "axios";
import firebase from "firebase";

export const REQUEST_NEW_COURSES = "REQUEST_NEW_COURSES";
export const REQUEST_FAILURE_NEW_COURSES = "REQUEST_FAILURE_NEW_COURSES";
export const RESOLVE_NEW_COURSES = "RESOLVE_NEW_COURSES";
export const FETCH_NEW_COURSES = "FETCH_NEW_COURSES";
export const CREATE_NEW_COURSE = "CREATE_NEW_COURSE";
export const UPDATE_NEW_COURSE = "UPDATE_NEW_COURSE";
export const DELETE_NEW_COURSE = "DELETE_NEW_COURSE";

// With dispatch because it's called in class component
export const fetchCourses = () => async dispatch => {
  try {
    dispatch({ type: REQUEST_NEW_COURSES });
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);
    // Make request to fetch courses
    const res = await axios.get("/api/courses", {
      headers: { Authorization: idToken }
    });

    dispatch({ type: FETCH_NEW_COURSES, payload: res.data });

    return res.data;
  } catch (error) {
    dispatch({ type: RESOLVE_NEW_COURSES });
    console.error(error);
  }
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

export const updateCourse = (courseId, values) => async dispatch => {
  try {
    dispatch({ type: REQUEST_NEW_COURSES });
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);
    // Make request to update course
    const res = await axios.put(`/api/courses/${courseId}/update`, values, {
      headers: { Authorization: idToken }
    });

    dispatch({ type: UPDATE_NEW_COURSE, payload: res.data });
    return res.data;
  } catch (error) {
    dispatch({ type: REQUEST_FAILURE_NEW_COURSES, payload: error.message });
  }
};

export async function deleteCourse(courseId) {
  // Get current user token
  const idToken = await firebase.auth().currentUser.getIdToken(true);
  // Make request to delete course
  await axios.delete(`/api/courses/${courseId}`, {
    headers: { Authorization: idToken }
  });
}
