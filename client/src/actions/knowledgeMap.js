import axios from "axios";
import firebase from "firebase";
import { dataArrayToObject } from "../utils/reducerHelpers";

export const REQUEST_KNOWLEDGE_SUBJECT = "REQUEST_KNOWLEDGE_SUBJECT";
export const RESOLVE_KNOWLEDGE_SUBJECT = "RESOLVE_KNOWLEDGE_SUBJECT";
export const FETCH_KNOWLEDGE_SUBJECT = "FETCH_KNOWLEDGE_SUBJECT";

export const fetchSubjectById = knowledgeSubjectId => async dispatch => {
  try {
    dispatch({ type: REQUEST_KNOWLEDGE_SUBJECT });
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);

    const res = await axios.get(
      `/api/knowledge-subject/${knowledgeSubjectId}`,
      { headers: { Authorization: idToken } }
    );

    // Convert knowledge modules from array of objects to objects with id: data
    // pairs
    res.data.modules = dataArrayToObject(res.data.modules);

    dispatch({
      type: FETCH_KNOWLEDGE_SUBJECT,
      payload: res.data
    });
  } catch (error) {
    dispatch({ type: RESOLVE_KNOWLEDGE_SUBJECT });
    console.log(error);
  }
};
