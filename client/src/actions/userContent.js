import axios from "axios";
import firebase from "../config/firebase";
import { UPDATE_COURSE } from "./courses";

export const REQUEST_USER_CONTENT = "REQUEST_USER_CONTENT";
export const RESOLVE_USER_CONTENT = "RESOLVE_USER_CONTENT";
export const CREATE_USER_CONTENT = "CREATE_USER_CONTENT";
export const FETCH_USER_CONTENT = "FETCH_USER_CONTENT";

export const fetchCourseContent = courseId => async dispatch => {
  try {
    dispatch({ type: REQUEST_USER_CONTENT });
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);
    // Make request to get courses content
    const res = await axios.get(`/api/user-content/${courseId}`, {
      headers: { Authorization: idToken }
    });

    dispatch({ type: FETCH_USER_CONTENT, payload: res.data });
  } catch (error) {
    console.error(error);
  }
};

export const createUserContent = (values, courseId) => async dispatch => {
  try {
    const data = { ...values, courseId };
    dispatch({ type: REQUEST_USER_CONTENT });
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);
    // Make request to create content
    const userContentRes = await axios.post("/api/user-content/create", data, {
      headers: { Authorization: idToken }
    });

    // Add content id to course
    const courseRes = await axios.put(
      `/api/courses/${courseId}/add-content`,
      {
        userContentId: userContentRes.data._id
      },
      {
        headers: { Authorization: idToken }
      }
    );

    // Dispatch creating user content and updating course
    dispatch({ type: CREATE_USER_CONTENT, payload: userContentRes.data });
    dispatch({ type: UPDATE_COURSE, payload: courseRes.data });
  } catch (error) {
    console.error(error);
  }
};
