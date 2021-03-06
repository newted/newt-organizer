import axios from "axios";
import firebase from "../config/firebase";
import { requestCourses, resolveCourses } from "./courses";
import { requestFailure } from "./shared";

export const CREATE_ASSIGNMENT = "CREATE_ASSIGNMENT";
export const UPDATE_ASSIGNMENT = "UPDATE_COURSE";
export const DELETE_ASSIGNMENT = "DELETE_ASSIGNMENT";
export const MARK_ASSIGNMENT_COMPLETE = "MARK_ASSIGNMENT_COMPLETE";
export const MARK_ASSIGNMENT_IN_PROGRESS = "MARK_ASSIGNMENT_IN_PROGRESS";
export const MARK_ASSIGNMENT_INCOMPLETE = "MARK_ASSIGNMENT_INCOMPLETE";
export const REQUEST_ASSIGNMENT_FAILURE = "REQUEST_ASSIGNMENT_FAILURE";

// Function to create an assignment on database.
export const createAssignment = (
  courseId,
  values,
  history
) => async dispatch => {
  try {
    dispatch(requestCourses());
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);

    // Make request to create assignment with authorization header
    const res = await axios.post(
      `/api/courses/${courseId}/assignment`,
      values,
      { headers: { Authorization: idToken } }
    );

    // Dispatch data to store
    dispatch({
      type: CREATE_ASSIGNMENT,
      payload: res.data
    });

    // Redirect to previous page
    history.goBack();
  } catch (error) {
    history.goBack();
    dispatch(
      requestFailure(
        REQUEST_ASSIGNMENT_FAILURE,
        error.message,
        "create",
        "assignments"
      )
    );
  }
};

// Function to create a YouTube-based assignment on database (should merge with
// general createAssignment later).
export const createYoutubeAssignment = (
  courseId,
  values,
  otherInfo,
  history
) => async dispatch => {
  try {
    dispatch(requestCourses());
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);

    let data = {
      values,
      otherInfo
    };

    // Make request to create assignment with authorization header
    const res = await axios.post(
      `/api/courses/${courseId}/youtubeAssignment`,
      data,
      { headers: { Authorization: idToken } }
    );

    // Dispatch data to store
    dispatch({
      type: CREATE_ASSIGNMENT,
      payload: res.data
    });

    // Redirect to previous page
    history.goBack();
  } catch (error) {
    history.goBack();
    dispatch(
      requestFailure(
        REQUEST_ASSIGNMENT_FAILURE,
        error.message,
        "create",
        "assignments"
      )
    );
  }
};

// Function to update an assignment on database.
export const updateAssignment = (
  courseId,
  assignmentId,
  values,
  history
) => async dispatch => {
  try {
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);

    // Make request to update assignment with auth header
    const res = await axios.put(
      `/api/courses/${courseId}/assignments/${assignmentId}/edit`,
      values,
      { headers: { Authorization: idToken } }
    );

    // Dispatch data to store
    dispatch({
      type: UPDATE_ASSIGNMENT,
      payload: res.data
    });

    if (history) {
      // Redirect to previous page
      history.goBack();
    }
  } catch (error) {
    history.goBack();
    dispatch(
      requestFailure(
        REQUEST_ASSIGNMENT_FAILURE,
        error.message,
        "update",
        "assignments"
      )
    );
  }
};

// Function to delete an assignment on database
export const deleteAssignment = (courseId, assignmentId) => async dispatch => {
  try {
    dispatch(requestCourses());
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);

    // Make request to delete assignment
    const res = await axios.delete(
      `/api/courses/${courseId}/assignments/${assignmentId}`,
      { headers: { Authorization: idToken } }
    );

    // Dispatch data to store
    dispatch({
      type: DELETE_ASSIGNMENT,
      payload: res.data
    });
  } catch (error) {
    dispatch(resolveCourses());
    console.log("Error while deleting the assignment", error);
  }
};

// Function to mark an assignment as "Complete"
export const markAssignmentAsComplete = (
  courseId,
  assignmentId
) => async dispatch => {
  try {
    dispatch(requestCourses());
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);

    // Make request to mark assignment as complete
    const res = await axios.put(
      `/api/courses/${courseId}/assignments/${assignmentId}/complete`,
      null,
      { headers: { Authorization: idToken } }
    );

    // Dispatch data to store
    dispatch({
      type: MARK_ASSIGNMENT_COMPLETE,
      payload: res.data
    });
  } catch (error) {
    dispatch(resolveCourses());
    console.log("Error while marking assignment as complete", error);
  }
};

// Function to mark an assignment as "In Progress"
export const markAssignmentAsInProgress = (
  courseId,
  assignmentId
) => async dispatch => {
  try {
    dispatch(requestCourses());
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);

    // Make request to mark assignment as in progress
    const res = await axios.put(
      `/api/courses/${courseId}/assignments/${assignmentId}/progress`,
      null,
      { headers: { Authorization: idToken } }
    );

    // Dispatch data to store
    dispatch({
      type: MARK_ASSIGNMENT_IN_PROGRESS,
      payload: res.data
    });
  } catch (error) {
    dispatch(resolveCourses());
    console.log("Error while marking assignment as in progress", error);
  }
};

// Function to mark an assignment as "Incomplete"
export const markAssignmentAsIncomplete = (
  courseId,
  assignmentId
) => async dispatch => {
  try {
    dispatch(requestCourses());
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);

    // Make request to mark assignment as incomplete
    const res = await axios.put(
      `/api/courses/${courseId}/assignments/${assignmentId}/incomplete`,
      null,
      { headers: { Authorization: idToken } }
    );

    // Dispatch data to store
    dispatch({
      type: MARK_ASSIGNMENT_INCOMPLETE,
      payload: res.data
    });
  } catch (error) {
    dispatch(resolveCourses());
    console.log("Error while marking assignment as incomplete", error);
  }
};

export const addQuizToAssignment = (
  courseId,
  assignmentId,
  data
) => async dispatch => {
  try {
    dispatch(requestCourses());
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);

    // Make request to mark assignment as incomplete
    const res = await axios.put(
      `/api/courses/${courseId}/assignments/${assignmentId}/add-quiz`,
      data,
      { headers: { Authorization: idToken } }
    );

    // Dispatch data to store
    dispatch({
      type: UPDATE_ASSIGNMENT,
      payload: res.data
    });
  } catch (error) {
    dispatch(resolveCourses());
    console.log("Error while adding quiz to assignment", error);
  }
};

// Request to update quiz info in assignment (really need to de-couple courses
// and assignments so I don't have to make custom requests for everything
export const updateAssignmentQuiz = (
  courseId,
  assignmentId,
  dateCompleted
) => async dispatch => {
  try {
    dispatch(requestCourses());
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);

    const res = await axios.put(
      `/api/courses/${courseId}/assignments/${assignmentId}/update-quiz`,
      { dateCompleted },
      { headers: { Authorization: idToken } }
    );

    dispatch({ type: UPDATE_ASSIGNMENT, payload: res.data });
  } catch (error) {
    dispatch(resolveCourses());
    console.error(error);
  }
};

// This is a very basic Youtube URL parser which only does full links. A more
// robust one will require regex to handle more types of URLs.
// See: https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
export async function getYoutubeVideoInfo(videoUrl) {
  let videoId = videoUrl.split("v=")[1];
  videoId = videoId.split("&")[0];

  try {
    // Make request to server, which will make YouTube API request.
    const res = await axios.get(`/api/youtube/videoInfo/${videoId}`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
}
