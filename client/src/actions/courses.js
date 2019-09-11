import axios from "axios";
import firebase from "firebase";

export const REQUEST_COURSES = "REQUEST_COURSES";
export const REQUEST_FAILURE_COURSES = "REQUEST_FAILURE_COURSES";
export const RESOLVE_COURSES = "RESOLVE_COURSES";
export const FETCH_COURSES = "FETCH_COURSES";
export const CREATE_COURSE = "CREATE_COURSE";
export const UPDATE_COURSE = "UPDATE_COURSE";
export const DELETE_COURSE = "DELETE_COURSE";

export const fetchCourses = () => async dispatch => {
  dispatch({ type: REQUEST_COURSES });
  // Get current user token
  const idToken = await firebase.auth().currentUser.getIdToken(true);
  // Make request to fetch courses
  const res = await axios.get("/api/courses", {
    headers: { Authorization: idToken }
  });
  dispatch({ type: FETCH_COURSES, payload: res.data });

  return res.data;
};

export const createCourse = values => async dispatch => {
  try {
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);
    // Make request to create course
    const res = await axios.post("/api/courses/create", values, {
      headers: { Authorization: idToken }
    });

    dispatch({ type: CREATE_COURSE, payload: res.data });
  } catch (error) {
    dispatch({ type: REQUEST_FAILURE_COURSES, payload: error.message });
  }
};

export const updateCourse = (courseId, values) => async dispatch => {
  try {
    dispatch({ type: REQUEST_COURSES });
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);
    // Make request to update course
    const res = await axios.put(`/api/courses/${courseId}/update`, values, {
      headers: { Authorization: idToken }
    });

    dispatch({ type: UPDATE_COURSE, payload: res.data });
  } catch (error) {
    dispatch({ type: REQUEST_FAILURE_COURSES, payload: error.message });
  }
};

export const deleteCourse = courseId => async dispatch => {
  try {
    dispatch({ type: REQUEST_COURSES });
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);
    // Make request to delete course
    await axios.delete(`/api/courses/${courseId}`, {
      headers: { Authorization: idToken }
    });

    dispatch({ type: DELETE_COURSE, payload: courseId });
  } catch (error) {
    dispatch({ type: REQUEST_FAILURE_COURSES, payload: error.message });
  }
};

export const resolveCourses = () => dispatch => {
  dispatch({ type: RESOLVE_COURSES });
};
