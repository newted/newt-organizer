import axios from "axios";
import firebase from "../config/firebase";
import { updateAssignment } from "./assignments";

export const REQUEST_PERSONAL_QUIZ = "REQUEST_PERSONAL_QUIZ";
export const RESOLVE_PERSONAL_QUIZ = "RESOLVE_PERSONAL_QUIZ";
export const CREATE_PERSONAL_QUIZ = "CREATE_PERSONAL_QUIZ";

export const createPersonalQuiz = ({
  contentId,
  assignmentId
}) => async dispatch => {
  try {
    dispatch({ type: REQUEST_PERSONAL_QUIZ });
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);

    // Create personal quiz
    const res = await axios.post(
      "/api/quiz/create",
      { contentId, assignmentId },
      { headers: { Authorization: idToken } }
    );

    console.log(res.data);
    dispatch({ type: CREATE_PERSONAL_QUIZ, payload: res.data });
  } catch (error) {
    dispatch({ type: RESOLVE_PERSONAL_QUIZ });
    console.log(error);
  }
};
