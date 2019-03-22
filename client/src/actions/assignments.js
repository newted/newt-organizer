import axios from "axios";
import firebase from "../config/firebase";
import { requestCourses, resolveCourses } from "./courses";

export const CREATE_ASSIGNMENT = "CREATE_ASSIGNMENT";
export const UPDATE_ASSIGNMENT = "UPDATE_COURSE";
export const DELETE_ASSIGNMENT = "DELETE_ASSIGNMENT";
export const MARK_ASSIGNMENT_COMPLETE = "MARK_ASSIGNMENT_COMPLETE";
export const MARK_ASSIGNMENT_IN_PROGRESS = "MARK_ASSIGNMENT_IN_PROGRESS";
export const MARK_ASSIGNMENT_INCOMPLETE = "MARK_ASSIGNMENT_INCOMPLETE";


export const createAssignment = (
  courseId,
  values,
  history
) => async dispatch => {
  try {
    dispatch(requestCourses());
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);

    const res = await axios.post(
      `/api/courses/${courseId}/assignment`,
      values,
      { headers: { Authorization: idToken } }
    );

    dispatch({
      type: CREATE_ASSIGNMENT,
      payload: res.data
    });

    history.goBack();
  } catch (error) {
    dispatch(resolveCourses());
    console.log("Error while creating assignment.", error);
  }
};

export const updateAssignment = (
  courseId,
  assignmentId,
  values,
  history
) => async dispatch => {
  try {
    dispatch(requestCourses());
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);

    const res = await axios.put(
      `/api/courses/${courseId}/assignments/${assignmentId}/edit`,
      values,
      { headers: { Authorization: idToken } }
    );

    dispatch({
      type: UPDATE_ASSIGNMENT,
      payload: res.data
    });

    history.goBack();
  } catch (error) {
    dispatch(resolveCourses());
    console.log("Error while updating assignment", error);
  }
};

export const deleteAssignment = (
  courseId,
  assignmentId
) => async dispatch => {
  try {
    dispatch(requestCourses());
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);

    const res = await axios.delete(
      `/api/courses/${courseId}/assignments/${assignmentId}`,
      { headers: { Authorization: idToken } }
    );

    dispatch({
      type: DELETE_ASSIGNMENT,
      payload: res.data
    });
  } catch (err) {
    dispatch(resolveCourses());
    console.log("Error while deleting the assignment", err);
  }
};

export const markAssignmentAsComplete = (
  courseId,
  assignmentId
) => async dispatch => {
  try {
    dispatch(requestCourses());
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);

    const res = await axios.put(
      `/api/courses/${courseId}/assignments/${assignmentId}/complete`,
      null,
      { headers: { Authorization: idToken } }
    );

    dispatch({
      type: MARK_ASSIGNMENT_COMPLETE,
      payload: res.data
    });
  } catch (err) {
    dispatch(resolveCourses());
    console.log("Error while marking assignment as complete", err);
  }
};

export const markAssignmentAsInProgress = (
  courseId,
  assignmentId
) => async dispatch => {
  try {
    dispatch(requestCourses());
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);

    const res = await axios.put(
      `/api/courses/${courseId}/assignments/${assignmentId}/progress`,
      null,
      { headers: { Authorization: idToken } }
    );

    dispatch({
      type: MARK_ASSIGNMENT_IN_PROGRESS,
      payload: res.data
    });
  } catch (error) {
    dispatch(resolveCourses());
    console.log("Error while marking assignment as in progress", error);
  }
};

export const markAssignmentAsIncomplete = (
  courseId,
  assignmentId
) => async dispatch => {
  try {
    dispatch(requestCourses());
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);

    const res = await axios.put(
      `/api/courses/${courseId}/assignments/${assignmentId}/incomplete`,
      null,
      { headers: { Authorization: idToken } }
    );

    dispatch({
      type: MARK_ASSIGNMENT_INCOMPLETE,
      payload: res.data
    });
  } catch (error) {
    dispatch(resolveCourses());
    console.log("Error while marking assignment as incomplete", error);
  }
};
