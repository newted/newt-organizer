import axios from "axios";
import firebase from "../config/firebase";

export const REQUEST_KNOWLEDGE_MAP = "REQUEST_KNOWLEDGE_MAP";
export const RESOLVE_KNOWLEDGE_MAP = "RESOLVE_KNOWLEDGE_MAP";
export const UPDATE_KNOWLEDGE_MAP = "UPDATE_KNOWLEDGE_MAP";

export const getKnowledgeMaps = knowledgeMapIds => async dispatch => {
  try {
    dispatch({ type: REQUEST_KNOWLEDGE_MAP });
    // Get current user token
    const idToken = await firebase.auth().currentUser.getIdToken(true);

    const res = await axios.post(
      "/api/learning-map/knowledge-map",
      { knowledgeMapIds },
      {
        headers: { Authorization: idToken }
      }
    );

    console.log(res.data);
  } catch (error) {}
};
