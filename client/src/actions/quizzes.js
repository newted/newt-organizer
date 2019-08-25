import axios from "axios";
import firebase from "../config/firebase";

export const REQUEST_PERSONAL_QUIZ = "REQUEST_PERSONAL_QUIZ";
export const RESOLVE_PERSONAL_QUIZ = "RESOLVE_PERSONAL_QUIZ";
export const CREATE_PERSONAL_QUIZ = "CREATE_PERSONAL_QUIZ";

export const createPersonalQuiz = data => async dispatch => {
  try {
    dispatch({ type: REQUEST_PERSONAL_QUIZ });
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);

    // Create personal quiz
    const res = await axios.post("/api/quiz/create", data, {
      headers: { Authorization: idToken }
    });

    // Dispatch quiz to store
    dispatch({ type: CREATE_PERSONAL_QUIZ, payload: res.data });

    // Return data (so it can be used to update an assignment)
    return res.data;
  } catch (error) {
    dispatch({ type: RESOLVE_PERSONAL_QUIZ });
    console.log(error);
  }
};
