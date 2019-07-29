import axios from "axios";
import firebase from "../config/firebase";

export const REQUEST_CONTENT = "REQUEST_CONTENT";
export const RESOLVE_CONTENT = "RESOLVE_CONTENT";
export const FETCH_CONTENT = "FETCH_CONTENT";

export const fetchContentById = contentId => async dispatch => {
  try {
    dispatch({ type: REQUEST_CONTENT });
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);

    const res = await axios.get(`/api/content/item/${contentId}`, {
      headers: { Authorization: idToken }
    });

    dispatch({
      type: FETCH_CONTENT,
      payload: res.data
    });
  } catch (error) {
    dispatch({ type: RESOLVE_CONTENT });
    console.log(error);
  }
};
