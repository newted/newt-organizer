import axios from "axios";
import firebase from "../config/firebase";

export const REQUEST_USER_CONTENT = "REQUEST_USER_CONTENT";
export const RESOLVE_USER_CONTENT = "RESOLVE_USER_CONTENT";
export const CREATE_USER_CONTENT = "CREATE_USER_CONTENT";

export const createUserContent = values => async dispatch => {
  try {
    dispatch({ type: REQUEST_USER_CONTENT });
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);
    // Make request to create content
    const res = await axios.post("/api/user-content/create", values, {
      headers: { Authorization: idToken }
    });

    dispatch({ type: CREATE_USER_CONTENT, payload: res.data });
  } catch (error) {
    console.error(error);
  }
};
