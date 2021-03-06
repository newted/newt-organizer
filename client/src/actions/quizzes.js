import axios from "axios";
import firebase from "../config/firebase";

export const REQUEST_PERSONAL_QUIZ = "REQUEST_PERSONAL_QUIZ";
export const RESOLVE_PERSONAL_QUIZ = "RESOLVE_PERSONAL_QUIZ";
export const FETCH_PERSONAL_QUIZ = "FETCH_PERSONAL_QUIZ";
export const CREATE_PERSONAL_QUIZ = "CREATE_PERSONAL_QUIZ";
export const UPDATE_PERSONAL_QUIZ = "UPDATE_PERSONAL_QUIZ";

export const fetchQuiz = quizId => async dispatch => {
  try {
    dispatch({ type: REQUEST_PERSONAL_QUIZ });
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);

    const res = await axios.get(`/api/quiz/${quizId}`, {
      headers: { Authorization: idToken }
    });

    // Dispatch quiz to store
    dispatch({ type: FETCH_PERSONAL_QUIZ, payload: res.data });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

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

export const completeQuiz = quiz => async dispatch => {
  try {
    dispatch({ type: REQUEST_PERSONAL_QUIZ });

    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);

    const res = await axios.put(
      `/api/quiz/${quiz._id}/update`,
      { quiz },
      {
        headers: { Authorization: idToken }
      }
    );

    dispatch({ type: UPDATE_PERSONAL_QUIZ, payload: res.data });

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
