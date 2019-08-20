import axios from "axios";
import _ from "lodash";
import firebase from "../config/firebase";

export const REQUEST_KNOWLEDGE_MAP = "REQUEST_KNOWLEDGE_MAP";
export const RESOLVE_KNOWLEDGE_MAP = "RESOLVE_KNOWLEDGE_MAP";
export const GET_KNOWLEDGE_MAPS = "GET_KNOWLEDGE_MAPS";
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

    // Reorganize the data from array of knowledge map objects to the tree structure
    const formattedData = arrayOfObjToTree(res.data);
    dispatch({ type: GET_KNOWLEDGE_MAPS, payload: formattedData });
  } catch (error) {
    dispatch({ type: RESOLVE_KNOWLEDGE_MAP });
    console.log(error);
  }
};

export function arrayOfObjToTree(kMapArray) {
  let result = {};

  kMapArray.forEach(kMap => {
    const { knowledgeSubject, knowledgeModule } = kMap;

    // If the particular subject isn't in the object, initialize it
    if (_.isEmpty(result[knowledgeSubject.name])) {
      result[knowledgeSubject.name] = {};
    }

    // Add the module under the subject
    result[knowledgeSubject.name][knowledgeModule.name] = kMap;
  });

  return result;
}
