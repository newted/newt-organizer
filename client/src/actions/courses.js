import axios from "axios";
import firebase from "../config/firebase";
import { requestFailure } from "./shared";
import { fetchPrograms } from "./programs";

export const REQUEST_COURSES = "REQUEST_COURSES";
export const REQUEST_FAILURE_COURSES = "REQUEST_FAILURE_COURSES";
export const RESOLVE_COURSES = "RESOLVE_COURSES";
export const REMOVE_COURSES = "REMOVE_COURSES";
export const CREATE_COURSE = "CREATE_COURSE";
export const FETCH_COURSES = "FETCH_COURSES";
export const FETCH_ALL_COURSES = "FETCH_ALL_COURSES";
export const UPDATE_COURSE = "UPDATE_COURSE";
export const DELETE_COURSE = "DELETE_COURSE";

export const requestCourses = () => {
  return {
    type: REQUEST_COURSES
  };
};

export const resolveCourses = () => {
  return {
    type: RESOLVE_COURSES
  };
};

export const createCourse = (programId, values, history) => async dispatch => {
  try {
    dispatch(requestCourses());
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);

    // Make request to create course
    const res = await axios.post(`/api/programs/${programId}/course`, values, {
      headers: { Authorization: idToken }
    });

    // Dispatch data to store
    dispatch({
      type: CREATE_COURSE,
      payload: {
        course: res.data,
        programId
      }
    });

    // Redirect to the program page
    history.push(`/programs/${programId}`);
  } catch (error) {
    history.push(`/programs/${programId}`);
    dispatch(
      requestFailure(
        REQUEST_FAILURE_COURSES,
        error.message,
        "create",
        "courses"
      )
    );
  }
};

// Function to fetch courses for a given program
export const fetchCourses = programId => async dispatch => {
  try {
    dispatch(requestCourses());
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);

    // Make request to fetch courses for a given program
    const res = await axios.get(`/api/programs/${programId}`, {
      headers: { Authorization: idToken }
    });

    // Dispatch data to store
    dispatch({
      type: FETCH_COURSES,
      payload: res.data
    });
  } catch (error) {
    dispatch(
      requestFailure(REQUEST_FAILURE_COURSES, error.message, "fetch", "courses")
    );
  }
};

// Function to fetch all courses for all programs
export const fetchAllCourses = programIds => async dispatch => {
  try {
    dispatch(requestCourses());
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);

    // Make request to fetch all courses
    const res = await axios.post(
      "/api/programs/courses/all",
      { programIds },
      { headers: { Authorization: idToken } }
    );

    // Dispatch data to store
    dispatch({
      type: FETCH_ALL_COURSES,
      payload: res.data
    });
  } catch (error) {
    dispatch(
      requestFailure(REQUEST_FAILURE_COURSES, error.message, "fetch", "courses")
    );
  }
};

// Function to update course information
export const updateCourse = (
  programId,
  courseId,
  values,
  history
) => async dispatch => {
  try {
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);

    // Request to update course
    const res = await axios.put(`/api/courses/${courseId}/edit`, values, {
      headers: { Authorization: idToken }
    });

    // Dispatch data to store
    dispatch({
      type: UPDATE_COURSE,
      payload: res.data
    });

    // Redirect to course page
    history.push(`/programs/${programId}/courses/${courseId}`);
  } catch (error) {
    history.push(`/programs/${programId}/courses/${courseId}`);
    dispatch(
      requestFailure(
        REQUEST_FAILURE_COURSES,
        error.message,
        "update",
        "courses"
      )
    );
  }
};

// Function to delete course
export const deleteCourse = (
  programId,
  courseId,
  history
) => async dispatch => {
  try {
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);

    // Dispatching before request because it won't respond with data.
    dispatch({
      type: DELETE_COURSE,
      payload: {
        programId,
        courseId
      }
    });

    // Make request to delete course
    await axios.delete(
      `/api/programs/${programId}/courses/${courseId}/delete`,
      { headers: { Authorization: idToken } }
    );

    // Redirect to program page
    history.push(`/programs/${programId}`);
  } catch (error) {
    history.push(`/programs/${programId}`);
    dispatch(
      requestFailure(
        REQUEST_FAILURE_COURSES,
        error.message,
        "delete",
        "courses"
      )
    );

    // Re-fetch programs and then courses
    dispatch(fetchPrograms());
    dispatch(fetchCourses(programId));
  }
};
