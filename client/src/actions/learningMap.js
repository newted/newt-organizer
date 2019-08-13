import axios from "axios";
import firebase from "../config/firebase";

export const REQUEST_LEARNING_MAP = "REQUEST_LEARNING_MAP";
export const RESOLVE_LEARNING_MAP = "RESOLVE_LEARNING_MAP";
export const GET_LEARNING_MAP = "GET_LEARNING_MAP";
export const UPDATE_LEARNING_MAP = "UPDATE_LEARNING_MAP";

export const getLearningMap = () => async dispatch => {
  try {
    dispatch({ type: REQUEST_LEARNING_MAP });
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);

    // If a user's learning doesn't exist, create one, otherwise send back
    // existing one
    const res = await axios.post(
      "/api/learning-map/create",
      {},
      {
        headers: { Authorization: idToken }
      }
    );

    dispatch({
      type: GET_LEARNING_MAP,
      payload: res.data
    });
  } catch (error) {
    dispatch({ type: RESOLVE_LEARNING_MAP });
    console.log(error);
  }
};

export const updateLearningMap = (learningMapId, data) => async dispatch => {
  try {
    dispatch({ type: REQUEST_LEARNING_MAP });

    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);

    // Send request to update learning and knowledge map
    const res = await axios.put(
      `/api/learning-map/${learningMapId}/update`,
      data,
      { headers: { Authorization: idToken } }
    );
    // Destructure data received
    const { learningMap, personalKnowledgeMap } = res.data;

    dispatch({ type: UPDATE_LEARNING_MAP, payload: learningMap });
  } catch (error) {
    dispatch({ type: RESOLVE_LEARNING_MAP });
    console.log(error);
  }
};
